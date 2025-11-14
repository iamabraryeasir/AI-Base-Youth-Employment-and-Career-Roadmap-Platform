import { IRoadmapPhase } from "@/database/roadmap.model";
import { aiClient } from "@/lib/ai/open-ai-groq";

export interface RoadmapGenerationInput {
  currentSkills: string[];
  targetRole: string;
  timeframe: number;
  availableLearningTime?: string;
}

export interface GeneratedRoadmap {
  phases: IRoadmapPhase[];
  jobApplicationPhase: number;
  jobApplicationMonth: number;
}

export async function generateRoadmapWithAI(
  input: RoadmapGenerationInput
): Promise<GeneratedRoadmap> {
  try {
    const phaseCount = Math.max(3, Math.ceil(input.timeframe / 2));

    const systemPrompt = `You MUST return ONLY valid JSON. No markdown, no explanation, no formatting. Every string value must use double quotes. All arrays must be complete.`;

    const userPrompt = `Role: ${input.targetRole}, Timeframe: ${
      input.timeframe
    } months, Skills: ${input.currentSkills.join(", ")}

Generate exactly ${phaseCount} phases. For each phase provide: phaseNumber, title, duration (e.g. "4 weeks"), description (1 sentence), 3 topics as array, 3 technologies as array, 2 projects as array with title, description, and difficulty ("Beginner"|"Intermediate"|"Advanced").

Return this exact JSON format with no other text:
{"phases":[{"phaseNumber":1,"title":"Phase 1","duration":"4 weeks","description":"Learn basics","topics":["topic1","topic2","topic3"],"technologies":["tech1","tech2","tech3"],"projects":[{"title":"project1","description":"build x","difficulty":"Beginner"},{"title":"project2","description":"build y","difficulty":"Beginner"}]}],"jobApplicationPhase":${Math.max(
      2,
      phaseCount - 1
    )},"jobApplicationMonth":${Math.max(2, input.timeframe - 2)}}`;

    const response = await aiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const anyResp: any = response;
    const rawContent =
      anyResp?.choices?.[0]?.message?.content ||
      anyResp?.choices?.[0]?.text ||
      "{}";

    // Extract JSON from response
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    const jsonString =
      start !== -1 && end !== -1
        ? rawContent.slice(start, end + 1)
        : rawContent;

    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      // Try to fix common JSON issues
      let fixedJson = jsonString
        .replace(/[\r\n]+/g, " ") // Remove newlines
        .replace(/,\s*}/g, "}") // Remove trailing commas before }
        .replace(/,\s*]/g, "]") // Remove trailing commas before ]
        .replace(/:\s*"([^"]*)"(?=[,}\]])/g, (match: string, value: string) => {
          // Escape unescaped quotes in string values
          const escaped = value.replace(/\\"/g, '"').replace(/"/g, '\\"');
          return `: "${escaped}"`;
        });

      try {
        parsed = JSON.parse(fixedJson);
      } catch (secondError) {
        // Last resort: try to extract valid data from malformed JSON
        console.error(
          "JSON parsing failed, attempting reconstruction:",
          parseError
        );

        // Try to extract phases array
        const phasesMatch = jsonString.match(
          /"phases"\s*:\s*\[([\s\S]*?)\],\s*"jobApplication/
        );
        const jobPhaseMatch = jsonString.match(
          /"jobApplicationPhase"\s*:\s*(\d+)/
        );
        const jobMonthMatch = jsonString.match(
          /"jobApplicationMonth"\s*:\s*(\d+)/
        );

        // Return fallback structure with whatever data we can extract
        parsed = {
          phases: [],
          jobApplicationPhase: jobPhaseMatch ? parseInt(jobPhaseMatch[1]) : 2,
          jobApplicationMonth: jobMonthMatch ? parseInt(jobMonthMatch[1]) : 3,
        };

        console.error(
          "Using fallback roadmap structure due to JSON parsing failure"
        );
      }
    }

    // Validate and sanitize difficulty levels
    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    const sanitizedPhases = (parsed.phases || []).map((phase: any) => ({
      ...phase,
      projects: (phase.projects || []).map((project: any) => ({
        ...project,
        difficulty: validDifficulties.includes(project.difficulty)
          ? project.difficulty
          : "Intermediate",
      })),
    }));

    return {
      phases: sanitizedPhases,
      jobApplicationPhase: parsed.jobApplicationPhase || 2,
      jobApplicationMonth: parsed.jobApplicationMonth || 3,
    };
  } catch (error) {
    console.error("Error generating roadmap with AI:", error);
    throw error;
  }
}

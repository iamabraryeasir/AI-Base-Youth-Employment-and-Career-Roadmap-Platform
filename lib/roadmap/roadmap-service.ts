import { Roadmap } from "@/database/roadmap.model";
import { Profile } from "@/database/profile.model";
import { GeneratedRoadmap } from "./generate-roadmap";

interface RoadmapCreateInput {
  userId: string;
  currentSkills: string[];
  targetRole: string;
  timeframe: number;
  availableLearningTime: string;
  roadmapData: GeneratedRoadmap;
}

export async function createOrUpdateRoadmap(
  input: RoadmapCreateInput
): Promise<any> {
  const {
    userId,
    currentSkills,
    targetRole,
    timeframe,
    availableLearningTime,
    roadmapData,
  } = input;

  // Calculate estimated completion date
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setMonth(
    estimatedCompletionDate.getMonth() + timeframe
  );

  // Create or update roadmap
  let roadmap = await Roadmap.findOne({ userId });

  if (roadmap) {
    // Update existing roadmap
    roadmap.currentSkills = currentSkills;
    roadmap.targetRole = targetRole;
    roadmap.timeframe = timeframe;
    roadmap.availableLearningTime = availableLearningTime;
    roadmap.phases = roadmapData.phases;
    roadmap.jobApplicationPhase = roadmapData.jobApplicationPhase;
    roadmap.jobApplicationMonth = roadmapData.jobApplicationMonth;
    roadmap.estimatedCompletionDate = estimatedCompletionDate;
    roadmap.regeneratedAt = new Date();
    await roadmap.save();
  } else {
    // Create new roadmap
    roadmap = new Roadmap({
      userId,
      currentSkills,
      targetRole,
      timeframe,
      availableLearningTime,
      phases: roadmapData.phases,
      jobApplicationPhase: roadmapData.jobApplicationPhase,
      jobApplicationMonth: roadmapData.jobApplicationMonth,
      estimatedCompletionDate,
    });
    await roadmap.save();
  }

  // Update profile with roadmap reference
  const profile = await Profile.findOne({ userId });
  if (profile) {
    profile.roadmapId = roadmap._id;
    await profile.save();
  }

  return roadmap;
}

export async function fetchUserRoadmap(userId: string): Promise<any> {
  return await Roadmap.findOne({ userId });
}

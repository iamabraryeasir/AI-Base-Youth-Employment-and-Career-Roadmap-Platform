import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { IRoadmap, IRoadmapPhase } from "@/database/roadmap.model";

// Register fonts for better typography
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto-Regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  document: {
    fontFamily: "Roboto",
  },
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 3,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 12,
    marginTop: 10,
  },
  overviewGrid: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  overviewCard: {
    flex: 1,
    border: "1px solid #ddd",
    padding: 12,
    borderRadius: 4,
  },
  overviewLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  phaseCard: {
    marginBottom: 20,
    border: "1px solid #ddd",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  phaseHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
  },
  phaseDescription: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 10,
    lineHeight: 1.5,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 5,
  },
  tag: {
    fontSize: 9,
    backgroundColor: "#e7f3ff",
    color: "#007bff",
    padding: "4 8",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  projectList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  project: {
    marginBottom: 8,
    fontSize: 10,
  },
  projectTitle: {
    fontWeight: "bold",
    color: "#333333",
  },
  projectDescription: {
    color: "#666666",
    marginTop: 2,
  },
  projectDifficulty: {
    fontSize: 9,
    marginTop: 3,
    fontWeight: "bold",
  },
  footerNote: {
    marginTop: 40,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    fontSize: 10,
    color: "#999999",
    textAlign: "center",
  },
});

interface RoadmapPDFProps {
  roadmap: IRoadmap & { _id: string };
}

export const RoadmapPDF: React.FC<RoadmapPDFProps> = ({ roadmap }) => {
  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Career Roadmap</Text>
          <Text style={styles.subtitle}>
            Your personalized learning path to {roadmap.targetRole}
          </Text>
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Target Role</Text>
              <Text style={styles.overviewValue}>{roadmap.targetRole}</Text>
            </View>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Duration</Text>
              <Text style={styles.overviewValue}>
                {roadmap.timeframe} months
              </Text>
            </View>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Completion Date</Text>
              <Text style={styles.overviewValue}>
                {formatDate(roadmap.estimatedCompletionDate)}
              </Text>
            </View>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Start Applying</Text>
              <Text style={styles.overviewValue}>
                Month {roadmap.jobApplicationMonth}
              </Text>
            </View>
          </View>
        </View>

        {/* Current Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Skills</Text>
          <View style={styles.tagContainer}>
            {(roadmap.currentSkills || []).map((skill) => (
              <Text key={skill} style={styles.tag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Learning Path Phases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Path</Text>

          {(roadmap.phases || []).map((phase: IRoadmapPhase) => (
            <View key={phase.phaseNumber} style={styles.phaseCard}>
              <Text style={styles.phaseHeader}>
                Phase {phase.phaseNumber}: {phase.title}
              </Text>
              <Text style={styles.subtitle}>{phase.duration}</Text>
              <Text style={styles.phaseDescription}>{phase.description}</Text>

              {/* Topics */}
              <Text
                style={{ fontSize: 11, fontWeight: "bold", marginBottom: 5 }}
              >
                Topics:
              </Text>
              <View style={styles.tagContainer}>
                {(phase.topics || []).map((topic) => (
                  <Text key={topic} style={styles.tag}>
                    {topic}
                  </Text>
                ))}
              </View>

              {/* Technologies */}
              <Text
                style={{ fontSize: 11, fontWeight: "bold", marginBottom: 5 }}
              >
                Technologies:
              </Text>
              <View style={styles.tagContainer}>
                {(phase.technologies || []).map((tech) => (
                  <Text
                    key={tech}
                    style={{ ...styles.tag, backgroundColor: "#f0e7ff" }}
                  >
                    {tech}
                  </Text>
                ))}
              </View>

              {/* Projects */}
              {(phase.projects || []).length > 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    Projects:
                  </Text>
                  <View style={styles.projectList}>
                    {(phase.projects || []).map((project, idx) => (
                      <View key={idx} style={styles.project}>
                        <Text style={styles.projectTitle}>
                          {idx + 1}. {project.title}
                        </Text>
                        <Text style={styles.projectDescription}>
                          {project.description}
                        </Text>
                        <Text style={styles.projectDifficulty}>
                          Difficulty: {project.difficulty}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {phase.phaseNumber === roadmap.jobApplicationPhase && (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "#fff3cd",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    💼 Start applying for jobs/internships in this phase!
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerNote}>
          <Text>Generated on {formatDate(new Date())}</Text>
          <Text>AI-Based Youth Employment and Career Roadmap Platform</Text>
        </View>
      </Page>
    </Document>
  );
};

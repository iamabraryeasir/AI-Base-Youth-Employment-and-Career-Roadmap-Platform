import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { IProfile } from "@/database/profile.model";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  // Header Section - Minimal & Clean
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    color: "#2563eb",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  experience: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: 400,
  },
  // Section Container
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  // Content Styling
  contentRow: {
    marginBottom: 12,
    flexDirection: "row",
  },
  contentColumn: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 3,
    fontWeight: 500,
  },
  itemDescription: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 6,
  },
  // Skills & Tags
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    color: "#1e40af",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 2,
    fontSize: 8,
    fontWeight: 600,
  },
  // List Items
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 12,
    fontSize: 9,
    color: "#2563eb",
    marginRight: 8,
    marginTop: 0,
  },
  listText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.4,
    flex: 1,
  },
});

interface CVPreviewProps {
  profile: IProfile & { _id: string };
  professionalSummary?: string;
  improvementTips?: string[];
}

export function CVPreview({
  profile,
  professionalSummary,
  improvementTips,
}: CVPreviewProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.title}>{profile.careerTrack}</Text>
          <Text style={styles.experience}>{profile.experienceLevel}</Text>
        </View>

        {/* Skills Section */}
        {profile.extractedSkills && profile.extractedSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <View style={styles.tagContainer}>
              {profile.extractedSkills.map((skill, idx) => (
                <Text key={idx} style={styles.tag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Tools & Technologies Section */}
        {profile.extractedTools && profile.extractedTools.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Tools & Technologies</Text>
            <View style={styles.tagContainer}>
              {profile.extractedTools.map((tool, idx) => (
                <Text key={idx} style={styles.tag}>
                  {tool}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education Section */}
        {profile.education && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Education</Text>
            <View style={styles.contentColumn}>
              <Text style={styles.itemTitle}>{profile.education}</Text>
            </View>
          </View>
        )}

        {/* Experience & Projects Section */}
        {profile.experienceAndProjectOverview && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Experience & Projects</Text>
            <Text style={styles.itemDescription}>
              {profile.experienceAndProjectOverview}
            </Text>
          </View>
        )}

        {/* Additional Information Section */}
        {profile.CVText && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Additional Information</Text>
            <Text style={styles.itemDescription}>{profile.CVText}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

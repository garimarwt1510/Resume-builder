// filename: frontend/src/utils/pdfGenerator.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

// react-pdf styling is plain JS objects (no CSS cascade), so we build one
// flexible stylesheet and switch a couple of layout flags based on the
// resume's chosen template (sidebar layout for "modern"/"creative",
// single-column for the rest).
const buildStyles = (accent) =>
  StyleSheet.create({
    page: { padding: 36, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
    row: { flexDirection: "row" },
    sidebar: { width: "32%", backgroundColor: accent, color: "#fff", padding: 16, marginRight: 16 },
    main: { flex: 1 },
    name: { fontSize: 20, fontWeight: 700, marginBottom: 2 },
    role: { fontSize: 12, color: accent, marginBottom: 8, fontWeight: 700 },
    contactLine: { fontSize: 9, color: "#555", marginBottom: 10 },
    sectionTitle: {
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 700,
      color: accent,
      borderBottomWidth: 1,
      borderBottomColor: accent,
      paddingBottom: 3,
      marginBottom: 6,
      marginTop: 10,
    },
    entryHead: { flexDirection: "row", justifyContent: "space-between", fontWeight: 700, fontSize: 10 },
    entrySub: { fontSize: 9, color: "#555", marginBottom: 3 },
    bullet: { fontSize: 9, marginBottom: 2, marginLeft: 8 },
    summary: { fontSize: 9.5, lineHeight: 1.5, color: "#333" },
    tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    tag: { fontSize: 8.5, backgroundColor: "#f0f0f0", borderRadius: 8, paddingVertical: 2, paddingHorizontal: 6, marginRight: 4, marginBottom: 4 },
    sideText: { fontSize: 9, marginBottom: 4, color: "#fff" },
  });

const Bullets = ({ items = [], styles }) =>
  items.map((b, i) => <Text key={i} style={styles.bullet}>• {b}</Text>);

/**
 * The actual PDF document definition, built with @react-pdf/renderer
 * primitives (Document/Page/View/Text) — this is what gets rasterized
 * into the downloaded PDF file.
 */
const ResumePDFDocument = ({ resume }) => {
  const accent = resume.accentColor || "#0F3D2E";
  const styles = buildStyles(accent);
  const p = resume.personalInfo || {};
  const useSidebar = resume.template === "modern" || resume.template === "creative";

  const MainContent = () => (
    <View style={styles.main}>
      {!useSidebar && (
        <>
          <Text style={styles.name}>{p.fullName || "Your Name"}</Text>
          <Text style={styles.role}>{p.jobTitle}</Text>
          <Text style={styles.contactLine}>
            {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).join("  |  ")}
          </Text>
        </>
      )}

      {p.summary && (
        <View>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{p.summary}</Text>
        </View>
      )}

      {resume.experience?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((e, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.entryHead}>
                <Text>{e.role} · {e.company}</Text>
                <Text>{e.startDate} - {e.current ? "Present" : e.endDate}</Text>
              </View>
              {e.location && <Text style={styles.entrySub}>{e.location}</Text>}
              <Bullets items={e.bullets} styles={styles} />
            </View>
          ))}
        </View>
      )}

      {resume.projects?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.projects.map((pr, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.entryHead}>{pr.title}</Text>
              {pr.techStack?.length > 0 && <Text style={styles.entrySub}>{pr.techStack.join(" · ")}</Text>}
              {pr.description && <Text style={styles.summary}>{pr.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {resume.education?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((e, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.entryHead}>
                <Text>{e.degree} in {e.fieldOfStudy}</Text>
                <Text>{e.startDate} - {e.endDate}</Text>
              </View>
              <Text style={styles.entrySub}>{e.school}{e.grade ? ` · ${e.grade}` : ""}</Text>
            </View>
          ))}
        </View>
      )}

      {resume.certificates?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Certificates</Text>
          {resume.certificates.map((c, i) => (
            <Text key={i} style={styles.entrySub}>{c.name} — {c.issuer} ({c.date})</Text>
          ))}
        </View>
      )}

      {resume.achievements?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Bullets items={resume.achievements} styles={styles} />
        </View>
      )}

      {!useSidebar && resume.skills?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tagRow}>
            {resume.skills.map((s, i) => <Text key={i} style={styles.tag}>{s}</Text>)}
          </View>
        </View>
      )}

      {resume.references?.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>References</Text>
          {resume.references.map((r, i) => (
            <Text key={i} style={styles.entrySub}>{r.name} — {r.relationship}{r.company ? `, ${r.company}` : ""}</Text>
          ))}
        </View>
      )}

      {resume.customSections?.map((c, i) => (
        <View key={i}>
          <Text style={styles.sectionTitle}>{c.title}</Text>
          <Text style={styles.summary}>{c.content}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {useSidebar ? (
          <View style={styles.row}>
            <View style={styles.sidebar}>
              <Text style={[styles.name, { color: "#fff" }]}>{p.fullName || "Your Name"}</Text>
              <Text style={[styles.role, { color: "#fff" }]}>{p.jobTitle}</Text>
              {[p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean).map((c, i) => (
                <Text key={i} style={styles.sideText}>{c}</Text>
              ))}
              {resume.skills?.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: "#fff", borderBottomColor: "#fff" }]}>Skills</Text>
                  {resume.skills.map((s, i) => <Text key={i} style={styles.sideText}>{s}</Text>)}
                </>
              )}
              {resume.languages?.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: "#fff", borderBottomColor: "#fff" }]}>Languages</Text>
                  {resume.languages.map((l, i) => <Text key={i} style={styles.sideText}>{l.name} — {l.proficiency}</Text>)}
                </>
              )}
            </View>
            <MainContent />
          </View>
        ) : (
          <MainContent />
        )}
      </Page>
    </Document>
  );
};

/**
 * Renders the resume to a PDF Blob and triggers a browser download.
 */
export const downloadResumePDF = async (resume) => {
  const blob = await pdf(<ResumePDFDocument resume={resume} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(resume.title || "resume").replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export default ResumePDFDocument;

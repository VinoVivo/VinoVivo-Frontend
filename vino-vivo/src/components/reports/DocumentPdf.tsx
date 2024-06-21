import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface ReportDocumentProps {
  data: any[]; 
  title: string;
  columns: { title: string; key: string }[];
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "center",
    height: 24,
    fontStyle: "italic",
  },
  col: {
    width: "20%",
    borderRightColor: "#000",
    borderRightWidth: 1,
  },
  value: {
    width: "80%",
    borderRightColor: "#000",
    borderRightWidth: 1,
  },
});

const MyDocument: React.FC<ReportDocumentProps> = ({ data, title, columns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            {columns?.map((column, index) => (
              <View key={index} style={styles.col}>
                <Text style={styles.header}>{column.title}</Text>
              </View>
            ))}
          </View>
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              {columns?.map((column, colIndex) => (
                <View key={colIndex} style={styles.value}>
                  <Text>{item[column.key]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;

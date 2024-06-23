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
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f2f2f2",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: "center",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
  },
});

const MyDocument: React.FC<ReportDocumentProps> = ({ data, title, columns }) => {
  const numColumns = columns.length;
  const columnWidth = `${100 / numColumns}%`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns?.map((column, index) => (
                <View key={index} style={[styles.tableColHeader, { width: columnWidth }]}>
                  <Text style={styles.tableCellHeader}>{column.title}</Text>
                </View>
              ))}
            </View>
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                {columns?.map((column, colIndex) => (
                  <View key={colIndex} style={[styles.tableCol, { width: columnWidth }]}>
                    <Text style={styles.tableCell}>{item[column.key]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.pageNumber}>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;

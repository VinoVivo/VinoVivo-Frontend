import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ProductSaleData } from '@/types/reports/reports.types';
interface MyDocumentProps {
    data: ProductSaleData[];
}
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    table: {
        marginVertical: 10,
        width: "auto",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        padding: 5,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
});

const MyDocument : React.FC<MyDocumentProps>= ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Productos Más Vendidos</Text>
            <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Nombre del Producto</Text>
                </View>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Precio del Producto</Text>
                </View>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Fecha de la Venta</Text>
                </View>
                <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Cantidad Vendida</Text>
                </View>
            </View>
            {data.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.productName}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.productPrice}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.saleDate}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.quantitySold}</Text>
                </View>
                </View>
            ))}
            </View>
        </View>
        </Page>
    </Document>
);

export default MyDocument;

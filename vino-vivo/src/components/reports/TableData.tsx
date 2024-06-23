import React from "react";

interface TablePreviewProps {
    data: any[];
    title:string;
    columns: { title: string; key: string }[];
}

const TablePreview: React.FC<TablePreviewProps> = ({ data, title, columns }) => {
    return (
        <div>
            <p>{title}</p>
        <table className="border-sm h-80">            
            <thead>
                
                <tr>
                    {columns.map((column, index) => (
                    <th key={index}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>{row[column.key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default TablePreview;

export const fetchReportData = async (reportType: string, year: string, typeId: string): Promise<any[]> => {
    const response = await fetch(`/api/reports/${reportType}/${year}/${typeId}`);
    if (!response.ok) {
        throw new Error(`Error fetching ${reportType} data`);
    }
    return response.json();
};

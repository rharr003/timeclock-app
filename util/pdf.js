import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export const generatePDF = async (group, total) => {
  try {
    // Group entries by type
    const groupedEntries = group.entries.reduce((acc, entry) => {
      (acc[entry.type] = acc[entry.type] || []).push(entry);
      return acc;
    }, {});

    // Create HTML content
    const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }
              .total { font-size: 18px; margin-bottom: 20px; text-align: center; }
              .section { margin-bottom: 20px; }
              .section-title { font-size: 20px; font-weight: bold; margin-bottom: 10px; text-decoration: underline; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
              th { background-color: #f2f2f2; }
              tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <div class="header">Timesheet Report</div>
            <div class="total">Total Hours: ${total} hours</div>
            ${Object.keys(groupedEntries)
              .map(
                (type) => `
              <div class="section">
                <div class="section-title">${type}</div>
                <table>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Description</th>
                    <th>Hours</th>
                  </tr>
                  ${groupedEntries[type]
                    .map((entry) => {
                      const startDate = new Date(entry.start);
                      const endDate = new Date(entry.end);
                      const hoursWorked = (
                        (endDate - startDate) /
                        (1000 * 60 * 60)
                      ).toFixed(2);
                      return `
                      <tr>
                        <td>${entry.date}</td>
                        <td>${startDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}</td>
                        <td>${endDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}</td>
                        <td>${entry.description}</td>
                        <td>${hoursWorked}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </table>
              </div>
            `
              )
              .join("")}
          </body>
        </html>
      `;

    // Generate the PDF
    const response = await Print.printToFileAsync({
      html: htmlContent,
    });
    const pdfName = `${response.uri.slice(
      0,
      response.uri.lastIndexOf("/") + 1
    )}Timesheet_Report_${group.dateRange
      .replace(/ /g, "_")
      .replace(",", "")}.pdf`;
    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });
    // Share the PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfName);
    } else {
      Alert.alert("Error", "Sharing is not available on this device.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "An error occurred while generating the PDF.");
  }
};

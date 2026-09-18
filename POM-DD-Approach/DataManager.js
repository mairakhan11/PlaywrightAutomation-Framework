const ExcelJS = require('exceljs');

class DataManager {

    constructor(filePath, sheetName) {
        this.filePath = filePath;
        this.sheetName = sheetName;
    }

    async getLoginData() {

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.filePath);

        const worksheet = workbook.getWorksheet(this.sheetName);

        const data = {};

        worksheet.eachRow((row) => {
            const key = row.getCell(1).value;
            const cellValue = row.getCell(2).value;
            const value = cellValue && typeof cellValue === 'object'
                ? cellValue.text
                : cellValue;

            data[key] = value;
        });

        return data;
    }
}

module.exports = { DataManager };

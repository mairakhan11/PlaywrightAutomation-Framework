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

        worksheet.eachRow((row, rowNumber) => {

            if (rowNumber === 1) return;

            const key = row.getCell(1).value;
            const value = row.getCell(2).value;

            data[key] = value;
        });

        return data;
    }
}

module.exports = { DataManager };

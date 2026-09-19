const ExcelJS = require('exceljs');

class DataManager {
    constructor(filePath, sheetName) {
        this.filePath = filePath;
        this.sheetName = sheetName;
    }

    normalizeValue(value) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') {
            return value.text ?? value.hyperlink ?? '';
        }
        return String(value).trim();
    }

    async getLoginData() {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.filePath);

        const worksheet = workbook.getWorksheet(this.sheetName);
        const data = {};

        worksheet.eachRow((row) => {
            const key = this.normalizeValue(row.getCell(1).value);
            if (!key) return;

            const value = this.normalizeValue(row.getCell(2).value);
            data[key] = value;
        });

        return data;
    }
}

module.exports = { DataManager };

import ExcelJS from 'exceljs';

export class DataManager {
  private readonly filePath: string;
  private readonly sheetName: string;

  constructor(filePath: string, sheetName: string) {
    this.filePath = filePath;
    this.sheetName = sheetName;
  }

  private normalizeValue(value: ExcelJS.CellValue): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && 'text' in value) return value.text ?? '';
    if (typeof value === 'object' && 'hyperlink' in value) return String(value.hyperlink ?? '');
    return String(value).trim();
  }

  async getData(): Promise<Record<string, string>> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.filePath);
    const worksheet = workbook.getWorksheet(this.sheetName);

    if (!worksheet) {
      throw new Error(`Worksheet '${this.sheetName}' was not found`);
    }

    const data: Record<string, string> = {};
    worksheet.eachRow((row) => {
      const key = this.normalizeValue(row.getCell(1).value);
      if (!key) return;
      data[key] = this.normalizeValue(row.getCell(2).value);
    });

    return data;
  }

  async getColumnValues(columnName: string): Promise<string[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.filePath);
    const worksheet = workbook.getWorksheet(this.sheetName);

    if (!worksheet) {
      throw new Error(`Worksheet '${this.sheetName}' was not found`);
    }

    let columnNumber = 0;
    worksheet.getRow(1).eachCell((cell, index) => {
      if (this.normalizeValue(cell.value).toLowerCase() === columnName.toLowerCase()) {
        columnNumber = index;
      }
    });

    if (!columnNumber) {
      throw new Error(`Column '${columnName}' was not found in worksheet '${this.sheetName}'`);
    }

    const values: string[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const value = this.normalizeValue(row.getCell(columnNumber).value);
      if (value) values.push(value);
    });

    return values;
  }

  async getLoginData(): Promise<Record<string, string>> {
    return this.getData();
  }
}

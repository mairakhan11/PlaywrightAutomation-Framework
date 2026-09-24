import ExcelJS from 'exceljs';

export class DataManager {
  constructor(
    private readonly filePath: string,
    private readonly sheetName: string
  ) {}

  private normalizeValue(value: ExcelJS.CellValue): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && 'text' in value) return value.text ?? '';
    if (typeof value === 'object' && 'hyperlink' in value) return String(value.hyperlink ?? '');
    return String(value).trim();
  }

  async getLoginData(): Promise<Record<string, string>> {
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
}

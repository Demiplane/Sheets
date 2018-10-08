import * as Model from './SheetModel';

export interface SheetApi {
  createSheet(sheet: Model.Sheet): Promise<string>;
  getAllSheets(): Promise<Model.Sheet[]>;
  updateSheet(sheet: Model.Sheet): Promise<void>;
  deleteSheet(sheetIdentifier: string): Promise<void>;
}

export class MockSheetApi implements SheetApi {
  private timeout = 500;

  private sheets: Model.Sheet[] = [];

  getAllSheets() {
    return new Promise<Model.Sheet[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([...this.sheets]);
      }, this.timeout);
    });
  }

  createSheet(sheet: Model.Sheet): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        var newSheet = Object.assign({}, { identifier: this.uuidv4() }, sheet);
        this.sheets = [...this.sheets, newSheet];
        resolve(newSheet.name);
      }, this.timeout);
    });
  }

  updateSheet(sheet: Model.Sheet): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(s => s.name !== sheet.name), sheet];
        resolve();
      }, this.timeout);
    });
  }

  deleteSheet(sheetIdentifier: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(sheet => sheet.name !== sheetIdentifier)];
        resolve();
      }, this.timeout);
    });
  }

  private uuidv4() {
    /* tslint:disable */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    /* tslint:enable */
  }
}

export default SheetApi;
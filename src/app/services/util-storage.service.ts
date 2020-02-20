export class UtilStorage {
  static getSettable(value: any): string {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }

  static getGettable(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}

import * as Model from './SheetModel';

export interface SheetApi {
  createSheet(sheet: Model.Sheet): Promise<string>;
  getAllSheets(): Promise<Model.Sheet[]>;
  updateSheet(sheet: Model.Sheet): Promise<void>;
  deleteSheet(sheetIdentifier: string): Promise<void>;
}

export class MockSheetApi implements SheetApi {
  private timeout = 500;

  private sheets: Model.Sheet[] = [
    new Model.Sheet({
      name: 'Roland of Gilead',
      statistics: [
        { name: 'fighter level', formula: '5' },
        { name: 'wizard level', formula: '3' },
        { name: 'total level', formula: '[wizard level] + [fighter level]' },
        { name: 'constitution', formula: '18' },
        { name: 'constitution modifier', formula: '([constitution] - 10) / 2' },
        { name: 'dexterity', formula: '22' },
        { name: 'dexterity modifier', formula: '([dexterity] - 10) / 2' },
        { name: 'favored class bonus', formula: '[fighter level]' },
        { name: 'ranged attack bonus', formula: '[base attack bonus] + [dexterity modifier]' },
        { name: 'pistol attack bonus', formula: '1 + [ranged attack bonus]' },
        { name: 'base attack bonus', formula: '[fighter level] + ([wizard level] / 2)' },
      ],
      resources: [
        { name: 'hit points', current: '15', formula: 
        '([constitution modifier] * [total level]) + (([fighter level] - 1) * 5.5 + 10)'
        + ' + ([wizard level] * 3.5) + [favored class bonus]' },
      ],
      logs: [
        { timestamp: 'today', text: 'i made this' }
      ],
      effects: [
        {
          name: 'within 30 feet of target', targets: [
            { statisticName: 'ranged attack bonus', formula: '+1' }
          ]
        }
      ],
      inventory: [
        {
          name: 'Big Irons with the Sandalwood Grips',
          stock: 2,
          description: 'The Sandalwood Guns are the guns of a true gunslinger.'
        },
        {
          name: 'Horn of Eld', stock: 1, description: 'The Horn of Eld is the personal horn of Arthur Eld.'
        },
        {
          name: 'Old Cowboy\'s Boots', stock: 2,
          description: 'These old worn leather boots are made of deerhide. They probably need to be replaced.'
        },
        { name: 'Traveler\'s Clothes', stock: 1 },
        {
          name: 'Gunna', stock: 1, description: `In his bag he always seems to have what he needs.
        Something something something something something something something something something something 
        something something something something something something something something something 
        something something something something something something something something something 
        something something something something something something something something something 
        something something something something something something something something something ` },
        {
          name: 'Grow Bag', stock: 1, description: `A magical bag that has the ability to generate coins.
                Given to Roland by his father, Steven Deschain.`
        }
      ],
      abilities: [
        {
          name: 'Weapon Training (firearms)',
          source: 'fighter 5',
          description: 'https://www.d20pfsrd.com/classes/core-classes/fighter/#TOC-Weapon-Training'
        },
        {
          name: 'Second Wind',
          source: 'fighter 1',
          actions: ['bonus action'],
          description: `You have a limited well of stamina that you can draw on to protect yourself from harm.
                    On Your Turn, you can use a Bonus Action to regain hit points equal to 1d10 + your fighter level.
                    Once you use this feature, you must finish a short or Long Rest before you can use it again.`
        }
      ]
    })
  ];

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
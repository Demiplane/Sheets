import * as Model from './SheetModel';

export interface SheetApi {
  createSheet(sheet: Model.Sheet): Promise<string>;
  getAllSheets(): Promise<Model.Sheet[]>;
  updateSheet(sheet: Model.Sheet): Promise<void>;
  deleteSheet(sheetIdentifier: string): Promise<void>;
}

export class MockSheetApi implements SheetApi {
  private timeout = 1500;

  private sheets: Model.Sheet[] = [
    {
      identifier: 'some guid',
      name: 'Roland of Gilead',
      statistics: [
        { name: 'fighter level', modifiers: [{ formula: '5' }] },
        {
          name: 'example base with conditional',
          modifiers: [
            { formula: '5' },
            { source: 'example', condition: 'long is kranky', formula: '5' }
          ]
        },
        {
          name: 'example base with conditional two',
          modifiers: [
            { formula: '7' },
            { source: 'example', condition: 'long is kranky', formula: '5' }
          ]
        },
        { name: 'wizard level', modifiers: [{ formula: '3' }] },
        { name: 'favored class bonus', modifiers: [{ source: 'race', formula: '[fighter level]' }] },
        { name: 'total level', modifiers: [{ formula: '[fighter level] + [wizard level]' }] },
        {
          name: 'base attack bonus', modifiers: [
            { formula: '[fighter level]' },
            { formula: '[wizard level] / 2' }
          ]
        },
        {
          name: 'hit point maximum',
          modifiers: [
            { source: 'constitution', formula: '[constitution modifier] * [total level]' },
            { formula: '([fighter level] - 1) * 5.5 + 10' },
            { formula: '[wizard level] * 3.5' },
            { formula: '[favored class bonus]' },
          ],
          resource: {
            name: 'hit points',
            current: 63,
            recharge: [{ name: 'rest', restorationFormulae: ['[hit point maximum]'] }]
          }
        },
        { name: 'constitution', modifiers: [{ formula: '14' }] },
        {
          name: 'constitution modifier', modifiers: [
            { source: 'constitution', formula: '([constitution] - 10) / 2' }]
        },
        { name: 'example', modifiers: [{ formula: 'min(-1, 1)' }] },
        { name: 'dexterity', modifiers: [{ formula: '14' }] },
        {
          name: 'dexterity modifier',
          modifiers: [{ source: 'dexterity', formula: '([dexterity] - 10) / 2' }]
        },
        {
          name: 'gun attack bonus', modifiers: [
            { source: 'weapon focus', formula: '1' },
            { formula: '[base attack bonus]' },
            { formula: '[dexterity modifier]' },
            { source: 'point blank shot', condition: 'target is within 30ft.', formula: '1' },
            { condition: 'target is behind cover', formula: '-2' }
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
        { name: 'Gunna', stock: 1, description: 'In his bag he always seems to have what he needs.' },
        {
          name: 'Grow Bag', stock: 1, description: `A magical bag that has the ability to generate coins.
                Given to Roland by his father, Steven Deschain.` },
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
          actionCost: ['bonus action'],
          description: `You have a limited well of stamina that you can draw on to protect yourself from harm.
                    On Your Turn, you can use a Bonus Action to regain hit points equal to 1d10 + your fighter level.
                    Once you use this feature, you must finish a short or Long Rest before you can use it again.`
        }
      ],
      actions: [
        { name: 'Dash', actionCost: ['action'] },
        { name: 'Dodge', actionCost: ['action'] },
        { name: 'Disengage', actionCost: ['action'] },
        { name: 'Help', actionCost: ['action'] }
      ],
      conditions: ['long is kranky']
    },
    {
      identifier: 'some other guid', name: 'Steven Deschain',
      statistics: [],
      inventory: [],
      abilities: [],
      conditions: []
    }
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
        resolve(newSheet.identifier);
      }, this.timeout);
    });
  }

  updateSheet(sheet: Model.Sheet): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(s => s.identifier !== sheet.identifier), sheet];
        resolve();
      }, this.timeout);
    });
  }

  deleteSheet(sheetIdentifier: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(sheet => sheet.identifier !== sheetIdentifier)];
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
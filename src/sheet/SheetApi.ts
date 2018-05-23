import * as Model from './SheetModel';

export interface SheetApi {
  createSheet(sheet: Model.Sheet): Promise<number>;
  getAllSheets(): Promise<Model.Sheet[]>;
  updateSheet(sheet: Model.Sheet): Promise<void>;
  deleteSheet(sheetIdentifier: number): Promise<void>;
}

export class MockSheetApi implements SheetApi {
  private timeout = 1500;

  private sheets: Model.Sheet[] = [
    {
      id: 1,
      name: 'Roland of Gilead',
      statistics: [
        { id: 1, name: 'fighter level', modifiers: [{ id: 1, formula: '5' }] },
        {
          id: 2, 
          name: 'example base with conditional',
          modifiers: [
            { id: 1, formula: '5' },
            { id: 2, source: 'example', condition: 'long is kranky', formula: '5' }
          ]
        },
        {
          id: 3, 
          name: 'example base with conditional two',
          modifiers: [
            { id: 1, formula: '7' },
            { id: 2, source: 'example', condition: 'long is kranky', formula: '5' }
          ]
        },
        { id: 4, name: 'wizard level', modifiers: [{ id: 1, formula: '3' }] },
        { id: 5, name: 'favored class bonus', modifiers: [{ id: 1, source: 'race', formula: '[fighter level]' }] },
        { id: 6, name: 'total level', modifiers: [{ id: 1, formula: '[fighter level] + [wizard level]' }] },
        {
          id: 7, name: 'base attack bonus', modifiers: [
            { id: 1, formula: '[fighter level]' },
            { id: 2, formula: '[wizard level] / 2' }
          ]
        },
        {
          id: 8, 
          name: 'hit point maximum',
          modifiers: [
            { id: 1, source: 'constitution', formula: '[constitution modifier] * [total level]' },
            { id: 2, formula: '([fighter level] - 1) * 5.5 + 10' },
            { id: 3, formula: '[wizard level] * 3.5' },
            { id: 4, formula: '[favored class bonus]' },
          ],
          resource: {
            name: 'hit points',
            current: 63,
            recharge: [{ name: 'rest', restorationFormulae: ['[hit point maximum]'] }]
          }
        },
        { id: 9, name: 'constitution', modifiers: [{ id: 1, formula: '14' }] },
        {
          id: 10, 
          name: 'constitution modifier', modifiers: [
            { id: 1, source: 'constitution', formula: '([constitution] - 10) / 2' }]
        },
        { id: 11, name: 'example', modifiers: [{ id: 1, formula: 'min(-1, 1)' }] },
        { id: 12, name: 'dexterity', modifiers: [{ id: 1, formula: '14' }] },
        {
          id: 13, 
          name: 'dexterity modifier',
          modifiers: [{ id: 1, source: 'dexterity', formula: '([dexterity] - 10) / 2' }]
        },
        {
          id: 14, 
          name: 'gun attack bonus', modifiers: [
            { id: 1, source: 'weapon focus', formula: '1' },
            { id: 2, formula: '[base attack bonus]' },
            { id: 3, formula: '[dexterity modifier]' },
            { id: 4, source: 'point blank shot', condition: 'target is within 30ft.', formula: '1' },
            { id: 5, condition: 'target is behind cover', formula: '-2' }
          ]
        }
      ],
      inventory: [
        {
          id: 1, 
          name: 'Big Irons with the Sandalwood Grips',
          stock: 2,
          description: 'The Sandalwood Guns are the guns of a true gunslinger.'
        },
        {
          id: 2, name: 'Horn of Eld', stock: 1, description: 'The Horn of Eld is the personal horn of Arthur Eld.'
        },
        {
          id: 3, 
          name: 'Old Cowboy\'s Boots', stock: 2,
          description: 'These old worn leather boots are made of deerhide. They probably need to be replaced.'
        },
        { id: 4, name: 'Traveler\'s Clothes', stock: 1 },
        { id: 5, name: 'Gunna', stock: 1, description: 'In his bag he always seems to have what he needs.' },
        {
          id: 6, name: 'Grow Bag', stock: 1, description: `A magical bag that has the ability to generate coins.
                Given to Roland by his father, Steven Deschain.` },
      ],
      abilities: [
        {
          id: 1, 
          name: 'Weapon Training (firearms)',
          source: 'fighter 5',
          description: 'https://www.d20pfsrd.com/classes/core-classes/fighter/#TOC-Weapon-Training'
        },
        {
          id: 2, 
          name: 'Second Wind',
          source: 'fighter 1',
          actionCost: ['bonus action'],
          description: `You have a limited well of stamina that you can draw on to protect yourself from harm.
                    On Your Turn, you can use a Bonus Action to regain hit points equal to 1d10 + your fighter level.
                    Once you use this feature, you must finish a short or Long Rest before you can use it again.`
        }
      ],
      actions: [
        { id: 1, name: 'Dash', actionCost: ['action'] },
        { id: 2, name: 'Dodge', actionCost: ['action'] },
        { id: 3, name: 'Disengage', actionCost: ['action'] },
        { id: 4, name: 'Help', actionCost: ['action'] }
      ],
      conditions: ['long is kranky']
    },
    {
      id: 2,
      name: 'Steven Deschain',
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

  createSheet(sheet: Model.Sheet): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        var newSheet = Object.assign({}, { identifier: this.uuidv4() }, sheet);
        this.sheets = [...this.sheets, newSheet];
        resolve(newSheet.id);
      }, this.timeout);
    });
  }

  updateSheet(sheet: Model.Sheet): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(s => s.id !== sheet.id), sheet];
        resolve();
      }, this.timeout);
    });
  }

  deleteSheet(sheetIdentifier: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.sheets = [...this.sheets.filter(sheet => sheet.id !== sheetIdentifier)];
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
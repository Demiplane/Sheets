import * as Model from './sheetModel';

export default interface SheetApi {
    createSheet(sheet: Model.Sheet): Promise<string>;
    getAllSheets(): Promise<Model.Sheet[]>;
    updateSheet(sheet: Model.Sheet): Promise<void>;
    deleteSheet(sheetIdentifier: string): Promise<void>;
}

export class MockSheetApi implements SheetApi {

    timeout = 1500;

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    sheets: Model.Sheet[] = [
        {
            identifier: 'some guid',
            name: 'Roland of Gilead',
            statistics: [
                { name: 'fighter level', modifiers: [{ formula: '5' }] },
                { name: 'wizard level', modifiers: [{ formula: '3' }] },
                { name: 'favored class bonus', modifiers: [{ formula: '[fighter level]' }] },
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
                        { formula: '[constitution modifier] * [total level]' },
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
                { name: 'constitution modifier', modifiers: [{ formula: '([constitution] - 10) / 2' }] },
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
                { name: 'Old Cowboy\'s Boots', stock: 2 },
                { name: 'Traveler\'s Clothes', stock: 1 },
                { name: 'Gunna', stock: 1, description: 'In his bag he always seems to have what he needs.' },
                { name: 'Grow Bag', stock: 1, description: 'A magical bag that has the ability to generate coins.' },
            ],
            abilities: [
                {
                    name: 'Weapon Training (firearms)',
                    source: 'fighter 5',
                    description: 'https://www.d20pfsrd.com/classes/core-classes/fighter/#TOC-Weapon-Training'
                }
            ]
        },
        { identifier: 'some other guid', name: 'Steven Deschain', statistics: [], inventory: [], abilities: [] }
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
                var newSheet = Object.assign({}, {identifier: this.uuidv4()}, sheet);
                this.sheets = [...this.sheets, newSheet];
                resolve(newSheet.identifier);
            }, this.timeout);
        });
    }

    updateSheet(sheet: Model.Sheet): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                this.sheets = [...this.sheets.filter(sheet => sheet.identifier !== sheet.identifier), sheet];
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
}


import * as React from 'react';
import './App.css';
import Sheet from './sheet/Sheet';
import * as S from './sheet/SheetModel';
import './extensions/Act';

const logo = require('./logo.svg');

interface AppState {
  sheets: S.Sheet[];
}

interface AppProps {

}

class App extends React.Component<AppProps, AppState> {

  state = this.initialState();

  initialState(): AppState {

    let initial: S.Sheet = {
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
            recharge: [{ name: 'rest', amount: ['[hit point maximum]'] }]
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
    };

    let restored: S.Sheet = JSON.parse(JSON.stringify(initial));

    return {
      sheets: [

        restored,

        { name: 'Steven Deschain', statistics: [], inventory: [], abilities: [] },

      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Sheet sheet={this.state.sheets[0]} />
      </div>
    );
  }
}

export default App;
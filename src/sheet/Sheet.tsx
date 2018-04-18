import * as React from 'react';
import * as S from './SheetModel';
import StatisticsSection from './StatisticsSection';
import ResourcesSection from './ResourcesSection';
import AbilitiesSection from './AbilitiesSection';
import InventorySection from './InventorySection';
import './sheet.css';

export type SheetProps = {
    sheet: S.Sheet;
};

export default class Sheet extends React.Component<SheetProps> {
    render() {
        let sheet = this.props.sheet;

        return (
            <article className="character-sheet">
                <header>
                    <h2>{sheet.name}</h2>
                </header>
                <div>
                    <StatisticsSection sheet={sheet} />
                    <ResourcesSection sheet={sheet} />
                    <AbilitiesSection sheet={sheet} />
                    <InventorySection sheet={sheet} />
                </div>
            </article>
        );
    }
}
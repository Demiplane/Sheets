import * as React from 'react';
import Sheet from './SheetModel';

interface AbilitiesSectionProps {
    sheet: Sheet;
}

export default class AbilitiesSection extends React.Component<AbilitiesSectionProps> {
    render() {
        let sheet = this.props.sheet;
        let abilities = sheet.abilities;

        return (
            <section className="abilities-section">
                <h3>Abilities</h3>
                {abilities.length > 0 ?
                    (
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Source</th>
                                <th>Description</th>
                            </tr>
                            {abilities.map(r => (
                                <tr key={r.name}>
                                    <td>{r.name}</td>
                                    <td>{r.source}</td>
                                    <td>{r.description}</td>
                                </tr>
                            ))}
                        </table>
                    )
                    : <p>No abilities.</p>}
            </section>
        );
    }
}
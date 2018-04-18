import * as React from 'react';
import * as S from './SheetModel';

interface StatisticsSectionProps {
    sheet: S.Sheet;
}

export default class StatisticsSection extends React.Component<StatisticsSectionProps> {
    render() {
        let sheet = this.props.sheet;
        let statistics = sheet.statistics;

        return (
            <section className="statistics-section">
                <h3>Statistics</h3>
                {statistics.length > 0 ? (
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                        {statistics.map(stat => (
                            <tr key={stat.name}>
                                <td>{stat.name}</td>
                                <td>{S.calculateValue(sheet, stat)}</td>
                            </tr>
                        ))}
                    </table>
                ) : <p>No statistics.</p>}
            </section>
        );
    }
}
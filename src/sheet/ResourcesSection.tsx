import * as React from 'react';
import * as S from './SheetModel';

interface ResourcesSectionProps {
    sheet: S.Sheet;
}

export default class ResourcesSection extends React.Component<ResourcesSectionProps> {
    render() {
        let sheet = this.props.sheet;
        let statisticsWithResources = sheet
            .statistics
            .filter(statistic => statistic.resource);

        return (
            <section className="resources-section">
                <h3>Resources</h3>
                {statisticsWithResources.length > 0 ?
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Maximum</th>
                            <th>Current</th>
                            <th>Recharge</th>
                        </tr>
                        {statisticsWithResources.map(statistic => (
                            <tr key={statistic.name}>
                                <td>{statistic.name}</td>
                                <td>{S.calculateValue(sheet, statistic)}</td>
                                <td>{statistic.resource ? statistic.resource.current : ''}</td>
                                <td>{statistic.resource && statistic.resource.recharge ?
                                    statistic.resource.recharge
                                        .map(recharge => recharge.name)
                                        .reduce((l, r) => l + ', ' + r) :
                                    ''}</td>
                            </tr>
                        ))}
                    </table> :
                    <p>No resources.</p>}
            </section>
        );
    }
}
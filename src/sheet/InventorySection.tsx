import * as React from 'react';
import Sheet from './SheetModel';

interface InventorySectionProps {
    sheet: Sheet;
}

export default class InventorySection extends React.Component<InventorySectionProps> {
    render() {
        let sheet = this.props.sheet;
        let inventory = sheet.inventory;

        return (
            <section className="inventory-section">
                <h3>Inventory</h3>
                {inventory.length > 0 ? (
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Description</th>
                        </tr>
                        {inventory.map(r => (
                            <tr key={r.name}>
                                <td>{r.name}</td>
                                <td>{r.stock}</td>
                                <td>{r.description}</td>
                            </tr>
                        ))}
                    </table>
                )
                    : <p>No inventory.</p>}
            </section>
        );
    }
}
import React from 'react'
// import Navbar from '../Components/Navbar';
import { IGreenHouse } from "../Models/IGreenHouse";
import { parseJSON } from 'date-fns';
import { getUrl } from '../Utilities/url';

interface IHistoryState {
    greenHouses: IGreenHouse[]
}

export default class History extends React.Component<{}, IHistoryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            greenHouses: []
        };
    }

    public componentDidMount(): void {
        const request = new Request(`${getUrl()}greenhouse`);

        fetch(request, { mode: 'cors' })
            .then(response => response.json())
            .then(result => this.setState({ greenHouses: result }));
    }

    public render() {
        return (
            <div className="container">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Datum</th>
                                <th scope="col">Temperatuur in kas</th>
                                <th scope="col">Ingesteld temperatuur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTempature()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private renderTempature(): JSX.Element[] {
        return this.state.greenHouses.map((greenHouse: IGreenHouse, index: number) => {
            return (
                <tr key={index}>
                    <td>{parseJSON(greenHouse.dateTime).toLocaleDateString()}</td>
                    <td>{greenHouse.measuredTemperature}</td>
                    <td>{greenHouse.temperature}</td>
                </tr>
            );
        });
    }

}
import React from "react";
// import Navbar from "../Components/Navbar";
import '../Assets/scss/Overview.scss';
import { IPlant } from "../Models/IPlant";
import { getUrl } from "../Utilities/url";

interface IOverviewProps {
    plants: IPlant[]
    getDataPlantsAPI: () => void
}

interface IOverviewState {
    temperature: number
}

export default class Overview extends React.Component<IOverviewProps, IOverviewState> {
    constructor(props: IOverviewProps) {
        super(props)

        this.state = {
            temperature: 0
        }
    }

    public render() {
        return (
            <div className="container overview">
                <h1 className="text-center">Overzicht</h1>

                {this.props.plants.length <= 0 ? this.renderLoading() : this.renderPlants()}

                <div className="circleTemp">
                    Ideale temperatuur
                    <br />
                    <h5>22,5  &#176;C</h5>
                </div>
                <br />
                <form>
                    <div className="form-group">
                        <input type="number" min="10" max="70" placeholder="Type het gewenste temperatuur" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onKeyUp={(event) => this.onKeyUpHandler(event)} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onClickHandlerTemperature}>Opslaan</button>
                </form>
            </div>

        );
    }

    private onClickHandlerTemperature = (): void => {
        alert("Dank je wel, wordt aangepast");
        const request = new Request(`${getUrl()}greenhouse`)
        fetch(request,
            {
                method: "PATCH", headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    temperature: this.state.temperature
                })
            }).then(response => console.log(response));
    }

    private onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const temperature = +event.currentTarget.value;
        this.setState({ temperature });
    }

    private renderPlants(): JSX.Element[] {
        return this.props.plants.map((plant: IPlant) => {
            return (
                <div key={plant.id}>
                    {plant.isPresentInGreenHouse ?
                        <div className="input-group mb-3" key={plant.id}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input" defaultChecked={plant.isPresentInGreenHouse} onClick={() => this.onClickHandlerPresentGreenHouse(plant.isPresentInGreenHouse, plant.id)} />
                                </div>
                            </div>
                            <p className="form-control" aria-label="Text input with checkbox">{plant.name}</p>
                        </div>
                        : ""
                    }
                </div>
            );
        });
    }

    private renderLoading(): JSX.Element {
        return <p>Data aan het laden...</p>
    }

    private onClickHandlerPresentGreenHouse(isPresentInGreenHouse: boolean, id: number): void {
        const request = new Request(`${getUrl()}plant`)
        fetch(request,
            {
                method: "PATCH", headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    isPresentInGreenHouse: isPresentInGreenHouse ? false : true
                })
            }).then(response => response.status === 204 ? this.props.getDataPlantsAPI() : window.alert("Fout bij het sturen van gegevens"));
    }
}
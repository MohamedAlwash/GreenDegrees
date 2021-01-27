import React from "react";
// import Navbar from "../Components/Navbar";
import '../Assets/scss/Plants.scss'
import { ImInfo } from 'react-icons/im'
import { Link } from "react-router-dom";
import { IPlant } from "../Models/IPlant";
import { getUrl } from "../Utilities/url";

interface IPlantsProps {
    plants: IPlant[]
}

export default class Plants extends React.Component<IPlantsProps, {}> {

    public render(): JSX.Element {
        return (
            <div className="container plants">
                <h3 className="text-center">Selecteer je planten</h3>
                <div className="card-group">
                    {this.props.plants.length <= 0 ? this.renderLoading() : this.renderPlants()}
                </div>
            </div>
        )
    }

    public renderPlants(): JSX.Element[] {
        return this.props.plants.map((plant: IPlant, index: number) => {
            return (
                <div className="card" key={index}>
                    <img src={plant.imageUrl} className="card-img-top" alt="veldsla" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {plant.name}
                            <Link to={{
                                pathname: "/plantinfo",
                                state: {
                                    plant: plant
                                }
                            }}>
                                <ImInfo size={18} />
                            </Link>

                        </h5>
                        <p className="card-text">{plant.description}</p>
                        <input type="checkbox" aria-label="Checkbox for following text input" defaultChecked={plant.isPresentInGreenHouse} onClick={() => this.onClickHandler(plant.isPresentInGreenHouse, plant.id)} />
                    </div>
                </div>
            );
        });
    }

    private renderLoading(): JSX.Element {
        return <p>Data aan het laden...</p>
    }


    public onClickHandler(isPresentInGreenHouse: boolean, id: number): void {
        const request = new Request(`${getUrl()}plant`)
        fetch(request,
            {
                method: "PATCH", headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    isPresentInGreenHouse: isPresentInGreenHouse ? false : true
                })
            });
    }
}
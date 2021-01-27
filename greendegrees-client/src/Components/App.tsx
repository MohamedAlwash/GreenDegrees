import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import '../Assets/scss/App.scss';
// import Login from '../Pages/Login';
import Overview from '../Pages/Overview';
import Plants from '../Pages/Plants';
import PlantInfo from '../Pages/PlantInfo';
import History from '../Pages/History';
import { IPlant } from '../Models/IPlant';
import Navbar from './Navbar';
import { getUrl } from '../Utilities/url';

interface IAppState {
    plants: IPlant[]
}

export default class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            plants: []
        };
    }

    public render() {
        return (
            <>
                <Switch>
                    <Navbar getDataPlantsAPI={this.getDataPlantsAPI}/>
                    {/* <Route path="/" component={Login} exact /> */}
                    <Route path="/temperatuur" component={History} />
                    <Route path="/" exact component={() => <Overview plants={this.state.plants} getDataPlantsAPI={this.getDataPlantsAPI} />} />
                    <Route path="/planten" component={() => <Plants plants={this.state.plants} />} />
                    <Route path="/plantinfo" component={PlantInfo} />

                    {/* Searg more info about render in Route
                    <Route path="/overzicht" render={() => <Overview plants={this.state.plants}/>} /> */}
                </Switch>
            </>
        );
    }

    public componentDidMount = (): void => { this.getPlants() }

    private getDataPlantsAPI = (): void => { this.getPlants() }

    private getPlants(): void {
        const request = new Request(`${getUrl()}plant`);
        fetch(request, { mode: "cors" })
            .then(response => response.json())
            .then(plants => this.setState({ plants }));
    }
}
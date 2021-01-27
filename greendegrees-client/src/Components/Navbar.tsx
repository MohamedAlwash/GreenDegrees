import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/scss/Navbar.scss'
import logo from '../Assets/scss/Images/logo.png';
import { RiPlantLine } from 'react-icons/ri';
// import { BiLogOut } from 'react-icons/bi'
import { GrOverview } from 'react-icons/gr';
import { FaTemperatureHigh } from 'react-icons/fa'

interface INavbarProps {
    getDataPlantsAPI: () => void
}

export default class Navbar extends React.Component<INavbarProps, {}> {
    public render() {
        
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <img src={logo} alt="logo" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to={'/'} onClick={this.props.getDataPlantsAPI} className="nav-link"><GrOverview size={24} className="svg" /> Overzicht</Link>
                        <Link to={'/planten'} className="nav-link"><RiPlantLine size={27} /> Planten</Link>
                        <Link to={'/temperatuur'} className="nav-link"><FaTemperatureHigh size={24} /> Temperatuur</Link>
                        {/* <Link to={'/'} className="nav-link"><BiLogOut size={26} /> Logout</Link> */}
                    </div>
                </div>
            </nav>
        )
    }
}
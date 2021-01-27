import React from "react"
import '../Assets/scss/PlantInfo.scss'
import { BiArrowBack } from 'react-icons/bi';
import { Link } from "react-router-dom";

interface IPlantInfoProps {
    location: { state: {
            plant: {
                name: string,
                imageUrl: string,
                temperature: string,
                harvest: string,
                description: string
            }}}
}

interface IPlantInfoState { }

export default class PlantInfo extends React.Component<IPlantInfoProps, IPlantInfoState> {

    public render() {
        const plantProp = this.props.location.state.plant;
        return (
            <>
                <div className="container plantinfo">
                    <h3 className="text-center"><Link to="/planten" ><BiArrowBack size={40} /></Link> {plantProp.name}</h3>

                    <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-interval="800">
                                <img src={plantProp.imageUrl} className="d-block w-100" alt="..." />
                            </div>
                            {/* <div className="carousel-item" data-interval="800">
                                <img src={kersttomaat2} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item" data-intval="800">
                                <img src={kersttomaat3} className="d-block w-100" alt="..." />
                            </div> */}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <section className="accordion-section clearfix mt-3" aria-label="Question Accordions">
                        <div className="container">

                            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div className="panel panel-default">
                                    <div className="panel-heading mb-3" role="tab" id="heading0">

                                        <div className="panel-title">
                                            <a className="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse0" aria-expanded="true" aria-controls="collapse0">
                                                Informatie
                                        </a>
                                        </div>


                                    </div>
                                    <div id="collapse0" className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading0">
                                        <div className="panel-body px-3 mb-4">
                                            <p>{plantProp.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading mb-3" role="tab" id="heading0">

                                        <div className="panel-title">
                                            <a className="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                Temperatuur
                                        </a>
                                        </div>


                                    </div>
                                    <div id="collapse1" className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading0">
                                        <div className="panel-body px-3 mb-4">
                                            <p>{plantProp.temperature} &#176;C</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading mb-3" role="tab" id="heading0">

                                        <div className="panel-title">
                                            <a className="collapsed" role="button" title="" data-toggle="collapse" data-parent="#accordion" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
                                                Oogsten
                                        </a>
                                        </div>


                                    </div>
                                    <div id="collapse2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading0">
                                        <div className="panel-body px-3 mb-4">
                                            <p>{plantProp.harvest}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}
import React from "react";
import './Crew.css';
import NavBar from "../Navigation/Navigation";
import Data from '../../data.json';
import { Link, useParams } from "react-router-dom";

export default function Crew(){
    let className;
    let crew;
    const { name } = useParams();

    if(name === 'Douglas') {
        className = ["active", "", "", ""];
        crew = Data.crew[0];
    } else if(name === 'Mark') {
        className = ["", "active", "", ""];
        crew = Data.crew[1];
    } else if(name === 'Victor') {
        className = ["", "", "active", ""];
        crew = Data.crew[2];
    } else if(name === 'Anousheh') {
        className = ["", "", "", "active"];
        crew = Data.crew[3];
    } else {
        className = ["active", "", "", ""];
        crew = Data.crew[0];
    }

    return (
        <div className="crew">
            <NavBar activeClass={["", "", "active", "", ""]} />
            <main className="container flow">
                <h1 className="numbered-title marginTop"><span>02</span> Meet your crew</h1>
                <div className="grid-container-crew flow">
                    <article className="crew-info">
                        <h2 className="positions fs-500 upperCase">{crew.role}</h2>
                        <h1 className="fs-700 line-height-1 upperCase">{crew.name}</h1>
                        <p className="fs-400 line-height-2 ff-san-normal">
                            {crew.bio}
                        </p>
                        
                        <div className="dot-indicators indicators flex">
                            <Link to="/SpaceTourism/crew/Douglas" className={className[0]} aria-label="Douglas Hurley"></Link>
                            <Link to="/SpaceTourism/crew/Mark" className={className[1]} aria-label="Mark Shuttleworth"></Link>
                            <Link to="/SpaceTourism/crew/Victor" className={className[2]} aria-label="Victor Glover"></Link>
                            <Link to="/SpaceTourism/crew/Anousheh" className={className[3]} aria-label="Anousheh Ansari"></Link>
                        </div>
                    </article>

                    <div className="crew-image-wrapper">
                        <img src={process.env.PUBLIC_URL + crew.images.png} alt={crew.name} className="crew-img" />
                    </div>
                </div>
            </main>
        </div>
    );
}
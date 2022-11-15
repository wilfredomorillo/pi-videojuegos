import React from "react";
import { NavLink } from "react-router-dom";





function CardVideogame({image, name, genres, rating, id}){

return (
<div className="Card">
    <div className="Flip-card" >
        <div className=" Flip-card-inner">
            <div className="Flip-card-front">
                <img src={image} alt={`${name}`} className='imageGame' />
            </div>
            <div className="Flip-card-back">
                <h1>{name}</h1>
                <h2>genres</h2>
                <h4>{genres}</h4>
                <h2>Rating</h2>
                <h4>🤗{rating}</h4>
                <NavLink to={`/detail/${id}`}><span>Muestramelo</span></NavLink>
            </div>
        </div>
    </div>
</div>



)}
export default CardVideogame
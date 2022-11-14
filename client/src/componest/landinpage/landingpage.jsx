import React from "react";
import './landingpage.scss'
import imagen from '../../assesn/elden-ring.jpg'

import {Link} from 'react-router-dom'


export default function Landingpage(){console.log(Landingpage)
 return(
    <div className="Landinpage">
        <img src={imagen} alt="" className="eldenring"/>
        <div className="text">HOLA AQUI😁</div>
        <div className="subtexto">aqui estan los juegos😍😎😎</div>
    <Link to ='/home' ><button className="BotonInicio"><span>STAR</span></button></Link>

    </div>
 )



}






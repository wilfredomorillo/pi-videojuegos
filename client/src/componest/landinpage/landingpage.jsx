import React from "react";
import './landingpage.scss'
import imagen from '../../assesn/elden-ring.jpg'

import {Link} from 'react-router-dom'


function Landingpage(){
 return(
    <div className="Landinpage">
        <img src={imagen} alt="" className="eldenring"/>
        <div className="text">HOLA AQUI😁</div>
        <div className="subtexto">aqui estan los juegos😍😎😎</div>
    


    </div>
 )



}




export default Landingpage

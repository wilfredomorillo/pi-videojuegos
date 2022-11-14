import React from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../searchBar/searchBar";
import './NavBar.scss'
import {getAllVideogames} from '../../Redux/actions'
import {Link} from 'react-router-dom'

function NavBar(){

    const dispatch= useDispatch()
    const handleRefresh=(e)=>{
    e.preventDefault()
    dispatch(getAllVideogames())

}
return(
    <div >
        <div>
            <ul className="navbar">
                <li>
                <Link to = '/' ><button className="Butonicio"><samp>Landinpage</samp></button></Link>
                </li>
                <li>
                <button className="Butoninicio"  onClick={e=>{handleRefresh(e)}} ><samp>Reset</samp></button>
                </li>
                <li>
                    <Link to= '/create' className= 'Butoninicio'><span>Crear nuevo juegos😍😎😎</span></Link>
                </li>
                <li>
                    <SearchBar></SearchBar>
                </li>
            </ul>

        </div>
        




    </div>
)
}
export default NavBar



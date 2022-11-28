import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanGame, getVideogame, deteleGame, cleaner } from "../../Redux/actions";
import Loading from'../loading/Loading'
import { Link } from "react-router-dom";


function Detail(){

    const[carga, setCarga]= useState(true)
    const {id}= useParams()
    const dispatch= useDispatch()
    const navigate= useNavigate()
    
    useEffect(()=>{
        dispatch(getVideogame(id)).then(()=> setCarga(false)) 
    
    }, [dispatch, id])
    
    const myVideogame= useSelector(state=> state.videogame)
    
    function handleDelete(e){
    const ID = id.includes('-')
    if(ID){
    e.preventDefault()
    dispatch(cleanGame())
    dispatch (deteleGame(id))
    dispatch(cleaner())
    alert('Videojuego borrado')
    navigate('/home')
    
    }else{
        alert('solo puedes eliminar tus juegos')
    }
    
    }
    if (carga){
    return (<Loading/>)
    
    }
    var regex=  /(<([^>]+)>)/gi;
    
    return(
        <div className="Detail">
            <Link to= '/home'><button id= 'home' className="home"><span>Home</span></button></Link>
            <Link to='/create'><button className="home"><span>Crear videojuego</span></button></Link>
        <button onClick={(e)=>handleDelete(e)} className= 'home'><span>Eliminar juego</span></button>
        <div >
    <h1 className="name">{myVideogame.name}</h1>
    <ul>
        <li>
            <div>
                <img src= {myVideogame.image} alt={myVideogame.name} className= 'image' />
            </div>
        </li>
        <li>
            <div>
                <h2 className="caracts">Genres:</h2>
                <ul className="allTemps">
                    <li>
                        {myVideogame.genres?.map((a)=>(a.name ? a.name: a)).join('| ')}
                    </li>
    
                </ul>
                <h2 className="caracts">Released:</h2>
                <p>📅{myVideogame.released}</p>
                <h2 className="caracts">Rating:</h2>
                <p>🌟{myVideogame.rating}</p>
                <h2 className="caracts">Descrption:</h2>
                <p>{myVideogame.description?.replace(regex, '').replace('&#39', '')}</p>
                <h2 className="caracts">Plataforma</h2>
                <p>{myVideogame.platforms?.join(',')}</p>
            </div>
        </li>
    </ul>
    
    
        </div>
        
        
        
        </div>
    )
    
    
    
    
    }
    export default Detail
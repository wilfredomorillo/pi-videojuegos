import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.scss'
import NavBar from "../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, filterBySource, getAllVideogames, orderBy } from "../../Redux/actions";
import Funcionalidades from "../funtions/funtions";
import Videogames from "../videogame/videogames";
import Paginado from "../paginado/paginado";

function Home(){

    const allGames= useSelector(state=>state.allVideogames)

    const [currentPage, setCurrentPage]= useState(1)
    const gamePerpage= 15
    const indexOfLastGame= currentPage *gamePerpage
    const indeOfFisrtGame= indexOfLastGame - gamePerpage
    const currentGames= allGames.slice(indeOfFisrtGame, indexOfLastGame)
    const dispatch= useDispatch()
    
    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

useEffect(()=>{
    window.scrollTo(0,0)
},[currentPage])


function handleSort(e){
    e.preventDefault()
    if (e.targe.value===''){
        dispatch(getAllVideogames())
    }else{
        dispatch(orderBy(e.targe.value))
        setCurrentPage(1)
    }
}

function handleFilter(e) {
    e.preventDefault()
    if(e.targe.value=== ''){
        dispatch(getAllVideogames())
    }else{
        dispatch(filterByGenres(e.targe.value))
        setCurrentPage(1)
    }
    
}

function handleSource(e){
    if(e.targe.value===''){
        dispatch(getAllVideogames())

    }
    else{
        dispatch(filterBySource(e.targe.value))
        setCurrentPage(1)
    }
}

return(
<div className="home">
    <div className="divNav">
        <NavBar/> </div>
    <div className='divNBFun'>
            <Funcionalidades handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource}/>
            </div>
            <div>
                <h1 className='h1home'>INSERT COIN</h1>
            </div>

            <div>
                <Videogames currentGames={currentGames}/>
            </div>
            <div>
                <Paginado 
                gamesPerPage={gamePerpage} 
                allGames={allGames.length} 
                paginado={paginado} />
            </div>
</div>


)



}
export default Home
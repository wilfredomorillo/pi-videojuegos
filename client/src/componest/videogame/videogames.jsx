import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardVideogame from "../CardVideogame/cardVideogame";
import { getAllVideogames } from "../../Redux/actions";
import Loading from "../loading/Loading";


export const Videogames = ({currentGames}) => {
    const dispatch = useDispatch()
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        dispatch(getAllVideogames()).then(() => setCarga(false)) 
    }, [dispatch])

 

    if (carga) {
        return <Loading />;
      }

    return (
        <div className='container'>
            {currentGames.length > 0 ?
            currentGames?.map(v => {
                return (<CardVideogame className='cardHome'
                    key={v.id}
                    id={v.id}
                    image={v.image ? v.image : v.name}
                    name={v.name}
                    genres={v.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                    rating={v.rating}
                    />)}) : `We couldn't load the games, refresh the page`}

        </div>
    )
}
export default Videogames
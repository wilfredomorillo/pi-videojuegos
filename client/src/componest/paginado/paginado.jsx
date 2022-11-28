import React from "react";




function Paginado({gamesPerPage, allGame, paginado}) {

    const pageNumber=[]
    let all= Math.ceil(allGame/ gamesPerPage)
    for (let i = 1; i <= all; i++) {
        pageNumber.push(i)
        
    }
    return(
        <nav>
            <ul className="paginado">
                {pageNumber && pageNumber.map(number=>(
                    <li key={number}>
                        <button onClick={()=>paginado(number)}>{number}</button>
                    </li>
                ))} 
            </ul>
        </nav>
    )


}

export default Paginado


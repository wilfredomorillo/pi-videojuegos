import React from "react";
import { useState } from "react";
import './searchBar.scss'
import {useDispatch} from 'react-redux'
import {getNames} from '../../Redux/actions'



function SearchBar(){

const [state, setState]= useState('')
const dispatch= useDispatch()

function handleChange(e){
    e.preventDefault()
    setState(e.target.value)
}


function handleSubmit(e){
e.preventDefault()
if(state.length>1){
    dispatch(getNames(state))
    setState('')
}
else{
    alert('No se esta la busquieda')
}
}

return(
    <>
    <input 
    type="text"
    placeholder='Insert name'
    onChange={e => handleChange(e)}
    value={state}
    className='input'
    onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
     
    <button
    type="submit"
    onClick={e=> handleSubmit(e)}
    className= 'buttom'>
        <span><strong>Buscar!</strong></span>

    </button>
    
    
    </>
)

}

export default SearchBar
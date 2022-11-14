import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import { createVideogame, getByGenres, getPlanforms } from "../../Redux/actions";
import Generico from '../../assesn/generico.png'
function validate(input){

let erros={}
if(!input.name){
    erros.name= 'requiere un nombre'
}else if(!input.name.length>50){
    erros.name= 'nombre demaciado largo'
}if (!input.description){
    erros.description= 'coloca descripcion'
}else if (!input.description.length>100)
erros.description= 'la descripcion es mas larga de lo esperado'

if (!input.released){
    erros.released= 'necesito fecha de lanzamiento'
}
if (!input.rating){
    erros.rating= 'falta valoracion'

}else if (!input.rating>5|| !input.rating<0)
erros.rating= 'valoracion no valida'

return erros
};


function Create() {
const dispatch= useDispatch()
const navigate= useNavigate()
const genres= useSelector((state)=>state.genres)
const plaforms= useSelector((state)=> state.plaforms)
const allNames= useSelector((state)=>state.allVideogames)
const [erros, setErrors]= useState({})
const [input, setInput]= useState({
    name:'',
    image:'',
    description:'',
    released:'',
    rating:'',
    genres:[],
    platforms:[]


});


useEffect(()=>{
    dispatch(getByGenres())
    dispatch(getPlanforms())
}, [dispatch])

function handleSubmit(e){

e.preventDefault()
let noRepeat= allNames.filtet(n=> n.name=== input.name);
if (noRepeat.length!==0){
    alert('ese nombre no esta disponible')
}else if (!Object.getOwnPropertyNames(erros).length&& input.name&& input.description&& input.rating&& input.released){
    if (!input.image){
        input.image=Generico
    }
    dispatch(createVideogame(input))
    alert('el juego fue creado con exito ')
    setInput({
name: "",
image: "",
description: "",
released: "",
rating: "",
genres: [],
platforms: [],

    });
    navigate('/home')
}else{
    alert('el juego nofue creado')
}


}

function handleChange(e){
    e.preventDefault();
    setInput((prev)=>({...prev , [e.target.name]: e.target.value}))
    setErrors(validate({
        ...input,
        [e.target.name]: [e.target.value]
    }))

}
function handleGenres(e){
    if (!input.genres.includes(e.target.value)){
        setInput({
            ...input,
            genres:[...input.genres, e.target.value],
        })
    }
}
function handlePlatforms(e){
    if (input.platforms.includes(e.target.value)){
        setInput({
            ...input,
            platforms:[ ...input.platforms , e.target.value,]
        })
    }
}
function handleDeleteG(e){
    setInput({
        ...input,
        genres:input.genres.filter((gen)=>gen!==e)
    })
}
function handleDeleteP(e){
    setInput({
        ...input,
        platforms:input.platforms.filter((plat)=>plat !== e)
    })
}





return (
    <div className="divCreate">

<Link to='/home'><button className="Botonhome"><span>home</span></button></Link>
<h1 className="title"> Crear videojuego</h1>
<h3 className="subtitle">sientete creativo</h3>
<div className="Super">

<form onSubmit={e=> handleSubmit(e) }>
<div>
<label><strong>Nombre:</strong></label>
<input type="text" value={input.name} placeholder='Name' name='name' onChange={e=>handleChange(e)}/>
{erros.name&&(
    <p className="error">{erros.name}</p>
)}

</div>
<div>
    <label ><strong>Descriccion:</strong></label>
    <textarea type='text' value={input.description} name="description"  placeholder="buen juego" onChange={(e)=>handleChange(e)}></textarea>
</div>
<div>
<label><strong>Rating</strong></label>
<input type="number" min = '0' max='5' step='0.01' value={input.rating} placeholder='4.5' name = 'rating'  onChange={e=>handleChange(e)}/>
{erros.rating && (
    <p className="error">{erros.rating}</p>
)}
</div>
<div>
    <label><strong>fecha de lanzamiento:</strong></label>
    <input type="date" id="start" value={input.released}  max='01/01/2023' placeholder='21/02/1990' name='released' onChange={e => handleChange(e)}/>
    {erros.released&&(
        <p className="error">{erros.released}</p>
    )}
</div>
<div>
<label><strong>Imagen: </strong></label>
<input type="text" value={input.image} name='image' placeholder='https://...com' onChange={e => handleChange(e)} />

</div>

<div>

<select onChange={e=>handleGenres(e)}>
<option value="selected" hidden>Genero:</option>
{genres?.sort(function(a,b){
    if(a.name<b.name)return-1
    if (a.name>b.name)return 1
    return 0
}).map(gen=>{
    return(
        <option value={gen.name} key={gen.id}>{gen.name}</option>
    )
})
}
</select>
{input.genres.map(e=>{
    return(
        <ul className="listaGen" key={e}>
            <li>
            <p className="selection"><strong>{e}</strong></p>
            <button onClick={()=> handleDeleteG(e)} className='borrar'>X</button>
            </li>
        </ul>
    )
})}

</div>
<div>

<select onChange={e=>handlePlatforms(e)}>

<option value="selected" hidden>Platafoma:</option>
{plaforms?.spor(function(a,b){
    if(a.name>b.name) return-1
    if(a.name<b.name) return 1
    return 0
}).map((pla)=>{
    return(
    <option value={pla.name} key={pla.id}>{pla.name}</option>
    )
})
}

</select>

{input.platforms.map(e=>{
    return(
        <ul className="listaGen" key={e}>
            <li>
            <p className="selection"><strong>{e}</strong></p>
            <button onClick={()=> handleDeleteP(e)} className='borrar'>X</button>
            </li>
        </ul>
    )
})}

</div>
<button type="submit" className="boop" ><strong>Create!</strong></button>
</form>
</div>
    </div>
)

}



export default Create
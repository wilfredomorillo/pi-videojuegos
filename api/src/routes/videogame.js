const { Router } = require('express');
require ('dotenv').config();
const { videogame } = require('../controllers');
const {Videogame ,Genres}= require('../db');



const router = Router();

router.get('/:idVideogame', async (req, res, next) => {

    const{idVideogame}= req.params
    let data = await videogame(idVideogame)
try{
    data ? res.send(data) : res.status(404).send('el id no conincide🤩')


} catch(e){
    next(e)
}

});
 

router.post('/', async (req, res, next)=>{

const{name, image, genres, released, rating, platforms, description} = req.body

try{
    let newVideogame= await Videogame.create({
        name,
        image,
        rating,
        released,
        genres,
        platforms,
        description
    })
const relation= await Genres.finAll({
    where: {
        name: genres
    }
})

await newVideogame.addGenres(relation)
res.json(newVideogame)

}catch(e){
    next(e)
}

});

router.delete('/:id', async (req, res)=>{

    const {id}= req.params
    try{
if (id){
    await Videogame.destroy({
        where: {id:id}
    })
    res.json({msg:'Juego borrado'})
}


    }catch(error)
    { console.log(error)}
})



module.exports= router
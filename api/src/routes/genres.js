const axios = require('axios')
const {Router}= require('express')
const {Genres} = require( '../db')

const router=Router()



router.get('/', async( req, res, next)=>{

try{
const respusta= await axios.get(`https://api.rawg.io/api/genres?key=053217d14e104c23a29449f3b148e573`)
const genresapi= await respusta.data.results.map((a)=> a.name)

genresapi.map((e)=> Genres.findOrCreate({
    where: {name:e}
 
}))
const allGenres= await Genres.findAll()
res.json(allGenres)

}catch(e){
    next(e)
}


})

module.exports = router

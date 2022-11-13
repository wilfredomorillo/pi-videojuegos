const{ default: axios}= require('axios')
const{ Videogame, Genres} = require('../db')

// hacer peticiones a la api
const infoApi= async()=>{

     let url= `https://api.rawg.io/api/games?key=053217d14e104c23a29449f3b148e573`
    let videogame= []
     try{
        for (let i = 0; i < 5; i++) {
            const respusta = await  axios.get(url)
            respusta.data.results.map(a=>{
                videogame.push({
                    id:a.id,
                    name:a.name,
                    image:a.background_image,
                    rating:a.rating,
                    platforms: a.platforms?.map(p=> p.platform.name),
                    genres: a.genres?.map(g=> g.name)
                }
                )
            });


            url= respusta.data.next

            
        }
        return videogame
     }
     catch(e){
        console.log(e)
     }

};

//hacer peticiones a mi base de datos 

const infoBD= async () =>{

try{
    return await Videogame.findAll({
        include:[{
            model: Genres,
            atributte:['name'],
            throught: {
                attributte:[]
            }
        }]

    })

} catch(e){
    console.error(e)
}

};

// unimos las dos solicitudos 
const infototal= async ()=>{
    const dataapi= await infoApi()
    const dataDB= await infoBD()

    const todainfo= dataDB.concat(dataapi)
    return todainfo
}
// solicutuses de reques por quiery a mi api


const nameapi= async(name)=>{

const infoSearch= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=053217d14e104c23a29449f3b148e573`)

try{
    const videoSearch= await infoSearch.data.results.map((a)=>{
        return{
            id: a.id,
            name: a.name,
            image: a.background_image,
            rating: a.rating,
            platforms: a.platforms?.map((p)=>p.platform.name),
            genres: a.genres?.map((g)=> g.genres)
        }

    })
return videoSearch
}

catch(e){
    console.error(e)
}
};

// solicutus de request por params

const idApi= async(id)=>{
    try{

        const IDpa= await axios.get(`https://api.rawg.io/api/games/${id}?key=053217d14e104c23a29449f3b148e573`)
        if(IDpa){
            const VGid= await IDpa.data
            const info= {
                id:VGid.id,
                name:VGid.name,
                image:VGid.background_image,
                genres: VGid.genres?.map((a)=> a.name),
                description: VGid.description,
                released: VGid.released,
                rating: VGid.rating,
                platforms: VGid.platforms?.map((p)=>p.platform.name)

            }
            return info
        } 
        else{
            return ('no hay nada con esa id 😅')
        }
    } catch(e){
        console.error(e)
    }
};
/// y aqui para cuando puda lo mismo a mi base de datos 
const idDb= async(id)=>{
try{
     return await Videogame.findByPk(id,{
        include: [{
            model: Genres,
            atributes: ['name'],
            throught: {
                attributes: []
            }
        }]
     })


}catch(e){
    console.error(e)
}


};
// y aqui esta la union de las solicitudes 
const videogame= async (id)=>{
    const dbID = id.includes('-')
    if (dbID) {
        const vgDb = await idDb(id);
        return vgDb
    } else {
        const vgApi = await idApi(id);
        return vgApi
    }
}
 module.exports={

infototal,
videogame,
infoApi,
infoBD,
nameapi

 }











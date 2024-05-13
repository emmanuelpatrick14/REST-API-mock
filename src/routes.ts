import{ Express ,Request,Response}from 'express';
function routes (app:Express){

    app.get('/healthcheck',(req:Request, res:Response)=>{
        console.log("gdgggs")
        res.sendStatus(200)
    })

}

export default routes;
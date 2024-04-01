import express  from 'express';
import { router as productsRouter } from "./routes/productsRouter.js";

const port=3000;
const app=express();

/*
//Ruta para visualizar todos los productos o con un límite de visualización
app.get("/api/products/", async(req,res)=> {
    const {limit} = req.query;
    console.log (limit);
    let product = await Products.getProducts(limit);  
    res.json({Products: product});         
});

//Ruta para visualizar solo uno de los productos por su id
app.get("/api/products/:pid", async(req,res)=> {
    const {pid} = req.params;
    let product = await Products.getProductsById(Number(pid));  
    res.json({Products: product});  
})
*/

//App use es para utilizar los routers
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productsRouter)

//el servidor escucha en el puerto 3000
app.listen(port, ()=>console.log(`Server corriendo en puerto ${port}`))
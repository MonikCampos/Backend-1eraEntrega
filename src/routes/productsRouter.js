import { Router } from 'express';
import productManager from "../dao/productManager.js";
export const router=Router();


const Products=new productManager("./src/data/products.json");

//Ruta para visualizar todos los productos o con un límite de visualización
router.get("/", async(req, res)=>{
    let {limit}=req.query
    let product = await Products.getProducts(limit);
    if(limit){
        product=product.slice(0, limit)
    }
    res.json({Products: product});
})

//Ruta para visualizar solo uno de los productos por su id
router.get("/:pid", async(req, res)=>{
    let pid=req.params.pid
    // validar que sea numerico...
    pid=Number(pid)  // "100"
    if(isNaN(pid)){
        return res.json({error:`Ingrese un id numérico`})
    }
    try {
        let product = await Products.getProductsById(Number(pid));
        if(!product){
            return res.json({message:`No existen products con id ${pid}`});
        }
        res.json({Products: product});
    } catch (error) {
        console.log(error);
        return res.json({error:"Error desconocido!"});
    }
})

router.post("/", async(req, res)=>{
    let {title, price, code, stock} = req.body
    // validacion que no exista
    if(!title || !price || !code || !stock){ 
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete title / price / code / stock`})
    }     
    // validación que  el codigo sea único
    // validacion que el precio sea numerico
    // resto validaciones ...
    
    try {
        let newProduct=await Products.addProduct({title, price, code, stock}) 
        res.setHeader('Content-Type','application/json');
        return res.status(200).json(newProduct);
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})

router.put("/:id", async(req, res)=>{

    let id=req.params.id
    // validar que sea numerico...
    id=Number(id)  // "100"
    if(isNaN(id)){
        return res.json({error:`Ingrese un id numérico...!!!`})
    }

    // recuperar info desde body
    // validar 

    try {
        let productModificado=await Products.update(id, {})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json(productModificado);
    
    } catch (error) {
        console.log(error)
        return res.json({error:"Error desconocido...!!!"})
    }



})

router.delete("/:id", async(req, res)=>{

    let id=req.params.id
    // validar que sea numerico...
    id=Number(id)  // "100"
    if(isNaN(id)){
        return res.json({error:`Ingrese un id numérico...!!!`})
    }

    try {
        let productEliminado=await Products.delete(id)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json(productEliminado);
    
        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.json({error:"Error desconocido...!!!"})
    }



})
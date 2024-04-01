import { Router } from 'express';
import CartManager from "../dao/cartManager.js";

export const router=Router();

const Carts=new CartManager("./src/data/carts.json");

//La ruta RAIZ GET devuelve todos los carritos
router.get( '/', (req, res) =>{
    const {cid} = req.params;
    const Cart=Carts.getCarts();
    return res.json({Cart});
});

//La ruta /:cid devuelve el contenido del carro con id :
router.get( '/:cid', (req, res) =>{
    const {cid} = req.params;
    const Cart=Carts.getCartsById(Number(cid));
    return res.json({Cart});
});

//La ruta RAÍZ POST crea un nuevo carrito
router.post('/', (req,res)=>{
    const Cart=Carts.createCart();
    return res.json({Cart});
});

//La Ruta /:cid/product/:pid agrega un producto al carro de compras 
router.post('/:cid/product/:pid', (req,res)=>{
    const {cid, pid} = req.params;
    const Cart=Carts.addProductInCart(Number(cid), Number(pid));
    return res.json({Cart});
});

router.delete("/:cid", async(req, res)=>{
    let cid=req.params.cid
    // validar que sea numerico...
    cid=Number(cid) 
    if(isNaN(cid)){
        return res.json({error:`Ingrese un id numérico...!!!`})
    }
    try {
        let cartEliminado=await Carts.deleteCart(cid)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json(cartEliminado);
    } catch (error) {
        console.log(error)
        return res.json({error:"Error desconocido...!!!"})
    }
})
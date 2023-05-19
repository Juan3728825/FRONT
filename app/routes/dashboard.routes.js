import { Router, response } from "express"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const dash = Router();

dash.get("/inicio", (req, res) => {
    if (req.cookies.ckjm) {
        try {
            const token = jwt.verify(req.cookies.ckjm, process.env.SECRET_KEY);
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 0
            });
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

dash.get("/usuario", async (req, res) => {
    if (req.cookies.ckjm) {
        try {
            const token = jwt.verify(req.cookies.ckjm, process.env.SECRET_KEY);

            let ruta = "http://localhost:3000/api/user";

            let options = {
                method: "GET",
            }

            let datos = {};

            const result = await fetch(ruta, options)
                .then(response => response.json())
                .then(data => {
                    datos = data[0];
                    // console.log(data[0])
                })
                .catch(error => {
                    console.log(err => console.error("Error en peticicon: " + error));
                })

            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 1,
                "datos": datos
            });
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

dash.get("/productos", (req, res) => {
    if (req.cookies.ckjm) {
        try {
            const token = jwt.verify(req.cookies.ckjm, process.env.SECRET_KEY);
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 2
            });
        } catch (error) {
            res.redirect("/");
        }
        res.render("dash");
    } else {
        res.redirect("/");
    }
});

dash.get("/categorias", (req, res) => {
    if (req.cookies.ckjm) {
        try {
            const token = jwt.verify(req.cookies.ckjm, process.env.SECRET_KEY);
            res.render("dash", {
                "nombre": token.nombre,
                "foto": token.foto,
                "menu": 3
            });
        } catch (error) {
            res.redirect("/");
        }
        res.render("dash");
    } else {
        res.redirect("/");
    }
});

dash.post("/guardar", (req, res) => {
    if (req.body.name) {
        // res.send("Guardado exitosamente"+ req.body.name);
        let ruta = "http://localhost:3000/api/user";
        let data = { 
            name: req.body.name 
        }

        let metodo = "POST";

        if (req.body.id) {
            data = {
                id: req.body.id,
                name: req.body.name
            }

            metodo = "put";
        }

        let options = {

            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        try {
            const result = fetch(ruta, options)
                .then(res => res.json)
                .then(data => {
                    console.log("Datos guardados exitosamente ;)");
                })
                .catch(error => console.log('error consumo de api'));
                res.redirect("/v1/usuario")
        } catch (error) {

        }

    } else {
        res.send("error");
    }
})

dash.get("/salir", (req, res) => {
    res.clearCookie("ckjm");
    res.redirect("/");
});

dash.get("/edit-user", (req, res)=>{
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
        id:id,
        name:name
    }

    if (req.cookies.ckjm) {
        try {
            const token = jwt.verify(
                req.cookies.ckjm,
                 process.env.SECRET_KEY)
                 res.render("dash", {
                    "nombre": token.nombre,
                    "foto": token.foto,
                    "menu": 4,
                    "datos": datos
                 })

        } catch (error) {
            console.error("Error con el token");
            
        }
    }

    res.send(id+" "+name);
})



export default dash;
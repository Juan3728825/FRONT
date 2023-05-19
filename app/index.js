import app from "./app.js";


app.listen(app.get("port"), () => {
    console.log(`Escuchando el puerto: 
    ${app.get("port")} 
    htpp://localhost:${app.get("port")}`);
})
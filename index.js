const express = require("express");
const app = express();
const expressFileUpload = require("express-fileUpload");
const fs = require("fs").promises;
const port = 3000;
const path = require("path");
app.use(express.json());
app.listen(port, console.log("Server On"));

app.use("/imgs", express.static(path.join(__dirname, "imgs")));
app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "tamaño limite maximo sobrepasado, solo 5mb",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/formulario.html");
});

app.use(express.static(path.join(__dirname, "imgs")));

app.use("/collage", (req, res) => {
  res.sendFile(__dirname + "/collage.html");
});

app.post("/imagen", (req, res) => {
  const { target_file } = req.files;
  const { posicion } = req.body;
  target_file.mv(`${__dirname}/imgs/imagen-${posicion}.jpg`, (err) => {
    res.redirect("/collage");
  });
});

/* app.get("/deleteImg/:nombre", async (req, res) => {
  const { nombre } = req.params;
  await fs.unlink(`${__dirname}/imgs/${nombre}.jpg`, () => {
    res.redirect("/collage");
  });
});
 */
app.delete("/imagen/:nombre", async (req, res) => {
  const { nombre } = req.params;
  console.log(nombre)
  //res.redirect("/collage.html");
  //res.redirect(req.originalUrl)
 try{
 
    await fs.unlink(`${__dirname}/imgs/${nombre}`,  (err)=> {
     // res.redirect("/collage");
      //res.redirect(req.originalUrl)
      res.redirect('back')
     });
 
    }catch(e){
      res.redirect('back')
    }
});



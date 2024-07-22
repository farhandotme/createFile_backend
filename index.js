const express = require("express");
const path = require("path");
const fs = require("fs");
const { fileLoader } = require("ejs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// "/" Routing
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});


// create file
app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`${req.body.details}`,(err) => {
      res.redirect("/");
    });
});

//read file

app.get("/file/:filename", (req, res)=>{
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err , filedata)=>{
    res.render("show", {filename : req.params.filename , filedata: filedata})
  })
})

// Updation of file------------------------------------------------>

app.post("/update", (req, res) => {
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err)=>{
    res.redirect("/")
  })
});


app.get("/edit/:filename", (req, res)=>{
  res.render("edit", {filename : req.params.filename})
})

//Deletion of a file-------------------------------------------------->

app.get(`/delete/:filename`,(req, res)=>{
  fs.rm(`./files/${req.params.filename}`, (err)=>{
    res.redirect("/")
  })
})



// listening port----------------------------------------------------->
app.listen(3000, () => {
  console.log(`App is running on the port localhost:${3000}`);
});

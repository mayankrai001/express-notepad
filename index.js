const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {
    res.render("show", {
      fileName: req.params.fileName,
      fileData: fileData,
    });
  });
});

app.get("/edit/:editFileName", (req, res) => {
  res.render("edit", { editFileName: req.params.editFileName });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previousName}`,
    `./files/${req.body.newName}`,
    (err) => {
      console.log("new", req.body);
      res.redirect("/");
    }
  );
  // console.log(req.body);
  // res.render("edit", { editFileName: req.params.editFileName });
});

app.post("/create", (req, res) => {
  console.log("Hello req.body.title ", req.body.title);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    `${req.body.details}`,
    () => {
      res.redirect("/");
    }
  );
});

app.listen(3000);

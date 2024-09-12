import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

let posts = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/post", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: nextId++, title, content };
  posts.push(newPost);
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== parseInt(id));
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

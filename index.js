const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const methodOverride = require('method-override')

let posts = require("./posts.json");
const port = 3000;

const postsFilePath = path.join(__dirname, 'posts.json');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

// Function to write posts to the JSON file
function writePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

function readID(){
    let data = fs.readFileSync(path.join(__dirname, "/id.json"), "utf-8");
    let json = JSON.parse(data);
    return json.id;
}

function updateID(){
    let oldID = readID();
    newID = oldID + 1;
    fs.writeFileSync(path.join(__dirname, "/id.json"), JSON.stringify({id : newID}, null, 2), "utf-8");
    return newID;
}

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/posts`);
});

app.get("/posts", (req,res)=>{
    res.render("loviter", { posts });
});

app.get("/posts/addPost", (req,res)=>{
    res.render("addPost");
});

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    if(username.length == 0 || content.length == 0){
        res.send("Error");
    }else{
        id = updateID();
        posts.unshift({id, username, content});
        writePosts(posts);
        res.redirect("/posts")
    }
})

app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let data = posts.find((p)=> p.id == id);
    res.render("post.ejs", {data});
})


app.get("/posts/:id/edit", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> p.id == id);
    res.render("editPost", {post});
});

app.patch("/posts/:id", (req, res)=>{
    let { id } = req.params;
    let data = posts.find((p)=> p.id == id);
    let { username,content } = req.body;
    data.username = username;
    data.content = content;
    writePosts(posts);
    res.redirect("/posts");
});

app.delete("/post/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== Number(id));
    writePosts(posts);
    res.redirect("/posts");
});

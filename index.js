const express=require("express");
const methodOverride = require('method-override');
const app=express();

const port=9090;
const path=require("path");
const{v4: uuidv4} =require('uuid');
uuidv4();

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        Title:"Industries",
        id: uuidv4(),
        Author:"Zeenat Amaan",
        Content:"Reduce manual and administrative workload"
    },
    {
        Title:"Education",
        id: uuidv4(),
        Author:"Zaroon",
        Content:"Provide accessible digital learning experiences"
    },
    {
        Title:"Thoughts",
        id: uuidv4(),
        Author:"Kashaf",
        Content:"Just keep Swimming!!"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    res.render("show.ejs",{post});
});

app.post("/posts",(req,res)=>{
    let{Title, Author, Content}=req.body;
    let id=uuidv4();
    posts.push({Title,id , Author, Content});
    res.redirect("/posts");

});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.Content;
    let post=posts.find((p)=>id === p.id);
    post.Content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
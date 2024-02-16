import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




app.get("/", (req, res) => {
    res.render("index.ejs");
});



app.get("/posts", (req,res) =>{
    res.render("posts.ejs", {

    blogs:array    

    });
      
});






app.get("/create", (req,res) =>{
    res.render("create.ejs")
       
});   



const array = new Array();

app.post("/submit", (req,res)=>{

    const cardType = req.body.cardType;
    let name = req.body["name"];
    let email = req.body["email"];
    let text = req.body["text"];

    const blog = {
        name,
        email,
        text,
        category: cardType, 
    };

    array.unshift(blog);
    
    res.redirect("/posts");
});



app.post("/update", (req, res) => {
    let name_up = req.body["name"];
    let email_up = req.body["email"];
    let text_up = req.body["text"];
    let tail = Number(req.body["idx"]);

    let obj1 = {
        name_up,
        email_up,
        text_up,
        tail
    };

    res.render("update.ejs", {
        obj1
    });

});

app.post("/posts", (req, res)=>{
    let point = Number(req.body["index_update"]);

    array[point].name = req.body["name"];
    array[point].email = req.body["email"];
    array[point].text = req.body["text"];

    res.redirect("/posts");

});




function deletePost(del){
    array.splice(del,1);
}


app.post("/delete", (req, res) => {
    let i = Number(req.body["updated_idx"]);
    deletePost(i);
    // Silme işleminden sonra kullanıcıyı posts sayfasına yönlendir.
    res.redirect("/posts");
});
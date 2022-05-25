const  express    = require("express"),       
       app        = express();
       bodyParser = require("body-parser");
       mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/Shopping');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

const ProductSchema = new mongoose.Schema({
    Name: String,
    Brand: String,
    url: String
});

const Products = mongoose.model('Product',ProductSchema);

Products.create(
    {
        Name:"The Avengers Thor's Hammer Dangle Charm",
        Brand:"Pandora", 
        Id:"003",
        url:"https://backend.central.co.th/media/catalog/product/2/5/25478edeaa662ede3a6a4ec38db18dcda1e597b6_mkp1134469dummy.jpg"
    },
    function(err, product){
        if(err){
            console.log(err);
        } else {
            console.log('New Product added!');
            console.log(product);
        }

    }
)

app.get("/", function(req, res){
    res.render("landing.ejs");
});

app.get("/Products", function(req, res){
    Products.find({},function (err, allProducts) {
        if(err){
            console.log(err);
        } else {
            res.render("index.ejs", {Products: allProducts});
        }
    })
});

app.post("/Products", function(req, res){
    let Name = req.body.Name;
    let Brand = req.body.Brand;
    let url = req.body.url;
    let newProduct = {Brand:Brand, Name:Name, url:url};
    Products.create(newProduct, function(err, newlyAdded){;
        if(err){
            console.log(err);
        }else{
            res.redirect("/Products");
        }
    });
});

app.get("/Products/new", function(req, res){
    res.render("new.ejs");
})

app.get("/Product/:id", function(req,res){
    Products.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        }else {
            res.render('show.ejs',{Product: foundProduct})
        }
    });
});

app.listen(3000, function(){
    console.log("Activated");
});
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import db from "./db.js";
import { userSignup , userLogin } from "./user.js";  
import bodyParser from "body-parser";
import { customerReview } from "./review.js";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, () => {
    console.log("Server has started");
});

app.set("views", path.join(__dirname, '../Frontend/views'));
app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(bodyParser.urlencoded({extended : true}));

// Customer Reviews
app.get("/",customerReview);

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs" , {invalidsignupMessage:""});
});

app.post("/signupBookMyHotel", userSignup);
app.post("/loginBookMyHotel",userLogin);

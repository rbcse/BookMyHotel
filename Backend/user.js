import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import db from "./db.js";
import { customerReview } from "./review.js";
const SECRET_KEY = "NOTESAPI";

const userSignup = async (req,res)=>{

    try{
        const userEnteredEmail = req.body.email;
        const userEnteredPassword = req.body.password;
        const userName = req.body.username;
        // Existing user check
    
        const existingCustomer = await db.query("SELECT * FROM customer WHERE email = $1 and password = $2",[userEnteredEmail,userEnteredPassword]);
        if(existingCustomer.rows.length != 0){
            // User already exists
            res.render("signup.ejs",{invalidsignupMessage:"User Already Exists , try logging in"});
        }
    
        // Encryption of password
        const hashedPassword = await bcrypt.hash(userEnteredPassword,10);
    
        // User creation
        await db.query("INSERT INTO customer (name,email,password) VALUES ($1,$2,$3)",[userName,userEnteredEmail,hashedPassword]);
        // Token Generation
        const userId = await db.query("SELECT id FROM customer WHERE email = $1 and password = $2",[userEnteredEmail,userEnteredPassword]);
    
        const jwtToken = jwt.sign({email : userEnteredEmail , id : userId},SECRET_KEY);
        console.log(jwtToken);
        res.render("login.ejs");
    }
    catch(err){
        res.render("signup.ejs",{invalidsignupMessage:"User Already Exists , try logging in"});
    }

}

const userLogin = async (req, res) => {
    const { loginemail, loginpassword } = req.body;

    try {
        // Fetch user by email
        const result = await db.query("SELECT * FROM customer WHERE email = $1", [loginemail]);
        const existingCustomer = result.rows[0];

        if (!existingCustomer) {
            return res.status(400).send("User does not exist");
        }

        // Compare passwords
        const matchPassword = await bcrypt.compare(loginpassword, existingCustomer.password);
        if (matchPassword) {
            // Passwords match, log the user in
            res.redirect("/");
        } else {
            // Passwords do not match
            res.status(400).send("Password is incorrect");
        }
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).send("Error during user login");
    }
};

export { userSignup, userLogin };
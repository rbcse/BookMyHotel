import db from "./db.js";
const customerReview = async (req,res)=>{
    try {
        const reviews = await db.query("SELECT * FROM customer_reviews");
        const reviewArr = reviews.rows;
        let tempArr = [];
        let map = new Map();
        let i = 0;
        while (i < 3 && reviewArr.length > 0) {
            let index = Math.floor(Math.random() * reviewArr.length);
            if (!map.has(index)) {
                tempArr.push(reviewArr[index]);
                map.set(index, i);
                i++;
            }
        }
        res.render("home.ejs", { reviewArr: tempArr });
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).send("Error fetching reviews");
    }
}
export { customerReview };
const express = require("express");
const router = express.Router();
const path = require("path");

router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, ".." ,"views", "index.html"));
});
router.get('/newpage(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, ".." ,"views", "newpage.html"))
});
router.get('/oldpage(.html)?', (req,res) => {
    res.redirect(301, '/newpage.html')
});
router.get('/hello(.html)?', (req,res,next) => {
    console.log("attempted to load hello.html");
    next();
}, (req, res) => res.send("Hello World"));

const one = (req,res,next) => {
    console.log("one");
    next();
};
const two = (req,res,next) => {
    console.log("two");
    next();
}
const three = (req,res) => {
    console.log("three");
    res.send("Finished!");
};

router.get("/chain(.html)?", [one,two,three]);

module.exports = router;
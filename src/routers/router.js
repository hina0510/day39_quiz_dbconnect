module.exports=(app)=>{
    const router = require("express").Router();
    router.get("/", (req, res)=>{
        res.render("index");
    })
    return router;
}
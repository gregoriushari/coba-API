module.exports= app =>{
    const restoran = require("../controllers/restoran.controller")

    var router = require("express").Router();

    router.post("/", restoran.create);
    router.get("/", restoran.findAll);
    router.get("/published", restoran.findAllPublished)
    router.get("/:id", restoran.findOne)
    router.put("/:id", restoran.update)
    router.delete("/:id", restoran.delete)
    router.delete("/", restoran.deleteAll);

    app.use('/api/restoran', router);
}
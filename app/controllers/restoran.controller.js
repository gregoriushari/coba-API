const db = require("../models");
const Restoran = db.restoran;
const Op = db.Sequelize.Op;

//Create anda save a new Tutorial
exports.create = (req, res)=>{
    //validate request
    if(!req.body.name){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }else if(!req.body.address){
        res.status(400).send({
            message:"Content can't be empty"
        });
        return;
    }

    //create a restoran
    const restoran = {
        name : req.body.name,
        address: req.body.address,
        description : req.body.description,
        published: req.body.published ? req.body.published:false
    };

    Restoran.create(restoran)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Restoran."
            })
        })
};

// retrieve all Restoran from db
exports.findAll = (req,res)=>{
    const name = req.query.name;
    var condition = name ? {name : {[Op.like]: `%${name}%`}} : null;

    Restoran.findAll({where : condition})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Restoran."
        })
    });
};

// find a Restoran with ID
exports.findOne=(req,res)=>{
    const id = req.params.id;
    Restoran.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving Restoran with id=" + id
        });
    });
};

//update restoran by id
exports.update=(req,res)=>{
    const id = req.params.id;

    Restoran.update(req.body,{
        where: {id:id}
    })
    .then(num=>{
        if(num ==1){
            res.send({
                message:"Restoran was updated successfully"
            });
        }else{
            res.send({
                message: `Cannot update Restoran with id=${id}. Maybe Restoran was not found or req.body is empty!`
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Restoran with id=" + id
        });
    })

};

//Delete all data from restoran db
exports.deleteAll=(req,res)=>{
    Restoran.destroy({
        where:{},
        truncate: false
    })
        .then(nums=>{
            res.send({ message: `${nums} Restoran were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all Restoran."
            });
        });
};

//delete restoran by id
exports.delete=(req,res)=>{
    const id = req.params.id;

    Restoran.destroy({
        where: {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Restoran was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Restoran with id=${id}. Maybe Restoran was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Restoran with id=" + id
            });
        });

};

//find all published resto
exports.findAllPublished=(req,res)=>{
    Restoran.findAll({ where : {published : true}})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Restoran."
        });
    });
}
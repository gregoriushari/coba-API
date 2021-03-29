module.exports = (sequelize, Sequelize)=>{
    const Restoran = sequelize.define("restoran",{
        name:{
            type: Sequelize.STRING
        },
        address:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        published:{
            type : Sequelize.BOOLEAN
        }
    });
    return Restoran;
}
'use stric'




module.exports = (sequelize, DataTypes) =>{
  const Users = sequelize.define('Users', {
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validata:{ 
          isEmail: true,
          msg:"Must be a valid email address",
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
  });


  Users.associate = (models)=>{
 
    Users.hasMany(models.Likes,
      {
        onDelete: "cascade", 
      });
      Users.hasMany(models.Posts, 
      {
        onDelete: "cascade"
      })
          
  };

 
  return Users;
    
}
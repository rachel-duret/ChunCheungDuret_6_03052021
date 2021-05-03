' use stric'

module.exports = (sequlize, DataTypes) => {
    const Comments = sequlize.define('Comments', {
        commentBody:{
            type:DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return Comments;
}
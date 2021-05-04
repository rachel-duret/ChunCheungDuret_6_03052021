' use stric'

module.exports = (sequlize, DataTypes) => {
    const Likes = sequlize.define('Likes');

    return Likes;
}
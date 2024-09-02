const mongodbconnection = require("../mongodbconnection");


async function getGenres(req, res){
    const user_id = req.query.user_id;
    try {
        const collection = await mongodbconnection.connect("LikedGenres");
        const genres = await collection.findOne({ user_id: user_id });
        if(genres == null){
            res.status(404).json({ msg: 'No genres liked! Please do so.'});
        }
        else{
            res.json(genres);
        }
    } catch (err) {
        res.status(500).send({ msg: "Server error" });
    }
}


async function addLikedGenres(req, res) {
    const { user_id, genres } = req.body;

    try {
        const collection = await mongodbconnection.connect("LikedGenres");

        
        await collection.deleteOne({ user_id });

    
        const genresList = {
            user_id: user_id,
            genres: genres
        };
        await collection.insertOne(genresList);

        res.send({ msg: "Successfully updated genres" });
    } catch (err) {
        res.status(500).send({ msg: "Server error" });
    }
}

module.exports = {
    addLikedGenres,
    getGenres
}

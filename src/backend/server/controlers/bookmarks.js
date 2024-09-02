const mongodbconnection = require("../mongodbconnection");
const { ObjectId } = require('mongodb');

async function showBookmarks(req, res){ 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    try{
        const booksCollection = await mongodbconnection.connect("LikedBooksUser");
        const userBookmarks = await booksCollection.find({ user_id: req.query.user_id }).skip(skip).limit(limit).toArray();
        const totalBooks = await booksCollection.countDocuments({ user_id: req.query.user_id });

        const booksDetailsPromises = userBookmarks.map(async bookmark => {
            const bookCollection = await mongodbconnection.connect("Books");
            const bookDetails = await bookCollection.findOne({ _id: new ObjectId(bookmark.book_id) });
            return bookDetails;
        });

        const booksDetails = await Promise.all(booksDetailsPromises);
        res.json({
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            books: booksDetails
        });
    }
    catch(err){
        res.status(500).send({msg: "Server error"});
    }
}

  async function showBookmark (req, res) {
    try {
        const { book_id, user_id } = req.body;
        const query = { book_id: book_id, user_id: user_id };
        const collection = await mongodbconnection.connect('LikedBooksUser');
        const cursor = await collection.find(query);
        const results = await cursor.toArray();

        if(results.length!==0)
            res.json(results);
        else
            res.status(400).json({msg: 'NO BOOKMARK!'})
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the bookmarks' });
    }
};



async function createBookmark(req, res){
    const bookmark = {
        book_id: req.body.book_id,
        user_id: req.body.user_id
    }
    try{
        const toAdd = await mongodbconnection.connect("LikedBooksUser");
        await toAdd.insertOne(bookmark);
        res.send({msg: "Sucsesfull"});
    }
    catch(err){
        res.status(404).send({msg: "Server error"});
    }
}

async function deleteBokmark(req, res){
    const bookmark = {
        book_id: req.body.book_id,
        user_id: req.body.user_id
    }
    try{
        const remove = await mongodbconnection.connect("LikedBooksUser");
        const result = await remove.deleteOne(bookmark);
        res.send({msg: "Sucsesfull"});
    }
    catch(err){
        res.status(404).send({msg: "Server error"});
    }
}
module.exports = {
    showBookmarks,
    showBookmark,
    createBookmark,
    deleteBokmark
}
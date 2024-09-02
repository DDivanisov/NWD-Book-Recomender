const mongodbconnection = require("../mongodbconnection");
const NodeCache = require("node-cache");
const { ObjectId } = require('mongodb');
const cacheData = require('../cache');

const cache = new NodeCache({ stdTTL: 600 });

async function showBooks(req, res){ 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const genre = req.query.genre.toUpperCase();
    const skip = (page - 1) * limit;

    const cData = cacheData.getCacheData(cache, page, limit, genre);
    if(cData){
        return res.json(cData);
    }
    try{
        const books = await mongodbconnection.connect("Books");
        const filter = genre && genre !== 'ALL' ? { genres: genre } : {};
        const totalBooks = await books.countDocuments(filter);
        const paginatedBooks = await books.find(filter).skip(skip).limit(limit).toArray();

        const responseData = {
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            books: paginatedBooks
        };

        cacheData.setCacheData(cache, page, limit, responseData, genre);
        res.json(responseData);
    }
    catch(err){
        res.send({msg: "Server error"});
    }
}

async function showBook(req, res){
    try{
        const books = await mongodbconnection.connect("Books");
        const book = await books.findOne({ _id: new ObjectId(req.query.book_id) });
        res.send(book);
    }
    catch(err){
        res.send({msg:"Server error"});
    }
}


async function updateBook(req, res){
    try{
        const books = await mongodbconnection.connect("Books");
        const bookId = new ObjectId(req.query.book_id);
        const incrementValue = parseInt(req.query.incrementValue) || 1;

        const result = await books.updateOne(
            { _id: bookId },
            { $inc: { liked: incrementValue } }
        );

        if (result.modifiedCount === 1) {
            cacheData.deleteCacheData(cache, req.query.page, 15);
            res.send({ msg: "Book updated successfully" });
        } else {
            res.status(404).send({ msg: "Book not found" });
        }
    }
    catch(err){
        res.send({msg:"Server error"});
    }
}

async function addComment(req, res){
    try{
        const books = await mongodbconnection.connect("Books");
        const bookId = new ObjectId(req.body.book_id);

        const book = await books.findOne({ _id: bookId });
        const highestCommentId = Math.max(0, ...book.comments.map(comment => comment.id));
        const newCommentId = highestCommentId + 1;

        const comment = {
            id: newCommentId,
            user: req.body.user,
            description: req.body.description,
            createdAt: req.body.createdAt
        }
        const respons = await books.updateOne(
            { _id: bookId },
            { $push: { comments: comment } }
        );
        res.json(comment);
    }
    catch(err){
        res.send({msg: "Server error"});
    }
}

async function removeComment(req, res) {
    try {
        const books = await mongodbconnection.connect("Books");
        const bookId = new ObjectId(req.body.book_id);
        const commentId = parseInt(req.body.commId);

        const result = await books.updateOne(
            { _id: bookId },
            { $pull: { comments: { id: commentId } } }
        );
        
        if (result.modifiedCount === 1) {
            res.send({ msg: "Comment removed successfully" });
        } else {
            res.status(404).send({ msg: "Comment not found" });
        }
    } catch (err) {
        res.status(500).send({ msg: "Server error" });
    }
}


module.exports = {
    showBooks,
    showBook,
    updateBook,
    addComment,
    removeComment,
}
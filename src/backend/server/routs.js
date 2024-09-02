const BookControler = require('./controlers/book');
const LoginControler = require('./controlers/login');
const RegisterControler = require('./controlers/register');
const BookmarksControler = require('./controlers/bookmarks');
const Recomend = require('./controlers/recomend');
const Genres = require('./controlers/genres');
const validation = require('./validation');


module.exports = (app) =>{
    app.get('/home', BookControler.showBooks);

    app.get('/book', BookControler.showBook);

    app.put('/modifyBook',BookControler.updateBook);

    app.post('/login', validation.login, LoginControler.login);

    app.post('/register', validation.register , RegisterControler.register);

    app.get('/showBookmarks', BookmarksControler.showBookmarks);

    app.post('/showBookmark', BookmarksControler.showBookmark);

    app.post('/createBookmark',BookmarksControler.createBookmark);

    app.post('/deleteBookmark', BookmarksControler.deleteBokmark);

    app.put('/addComment', BookControler.addComment);

    app.put('/removeComment', BookControler.removeComment);

    app.get('/getGenres', Genres.getGenres);

    app.post('/likeGenres', Genres.addLikedGenres);
    
    app.post('/getRecomendations', Recomend.recomend);
}
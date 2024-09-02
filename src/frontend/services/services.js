import API from './API';

export default {
  getBooks(page, limit, genre) {
    return API().get(`/home?page=${page}&limit=${limit}&genre=${genre}`);
  },
  getBook(id){
    return API().get(`/book?book_id=${id}`);
  },
  modifyBook(increment, id, page){
    return API().put(`/modifyBook?incrementValue=${increment}&book_id=${id}&page=${page}`);
  },
  register(data){
    return API().post(`/register`,data);
  },
  login(data){
    return API().post(`/login`,{email: data.email, password: data.password});
  },
  getBookmarks(page, limit, user_id,){
    return API().get(`/showBookmarks?page=${page}&limit=${limit}&user_id=${user_id}`);
  },
  getBookmark(user_id, book_id){
    return API().post(`/showBookmark`,{book_id: book_id, user_id: user_id});
  },
  createBookmark(data){
    return API().post(`/createBookmark`, data);
  },
  deleteBookmark(data){
    return API().post(`/deleteBookmark`, data);
  },
  addComment(data){
    return API().put(`/addComment`, data);
  },
  removeComment(data){
    return API().put(`/removeComment`, data);
  },
  getGenres(user_id){
    return API().get(`/getGenres?user_id=${user_id}`);
  },
  addLikedGenres(data){
    return API().post('/likeGenres', data);
  },
  getRecomended(data){
    return API().post('/getRecomendations', data); 
  }
};

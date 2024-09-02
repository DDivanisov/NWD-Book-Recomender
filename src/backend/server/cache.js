const NodeCache = require("node-cache");


function getCacheData(cache, page, limit, genre){
    const cacheKey = `books-${page}-${limit}-${genre}`;
    return cache.get(cacheKey);
}

function setCacheData(cache, page, limit, data, genre){
    const cacheKey = `books-${page}-${limit}-${genre}`;
    cache.set(cacheKey, data);
}

function deleteCacheData(cache, page, limit, genre){
    const cacheKey = `books-${page}-${limit}-${genre}`;
    cache.del(cacheKey);
}

module.exports  = {
    getCacheData,
    setCacheData,
    deleteCacheData
}
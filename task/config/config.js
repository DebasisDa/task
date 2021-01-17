
const URLs = {
    mongoose :process.env.MONGO_URL||"mongodb://localhost:27017/carsijt"
};

let sendURL=(name)=> {
   return URLs[name];
}

module.exports = {
   getURL : sendURL,
}

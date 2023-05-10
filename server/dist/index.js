"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors('*'));
let port = process.env.PORT || 400;
app.get('/', (req, res) => {
    res.send('ok!');
});
//! creo un endpoint da richiamare lato client che ritorna i dati di quell API (uso una GET)
app.get('/posts', (req, res) => {
    fetch('https://22hbg.com/wp-json/wp/v2/posts/')
        .then((res) => res.json())
        .then((response) => res.send(response));
});
//! per ora i valori sono statici poi li faro passare dal req.body (voglio capire se posso filtrarli direttamente dalla query)
//* ho creato CustomReq per tipizzare {title , items} se no l'includes() e lo splice() non li accettavano
app.get('/posts-filtered', (req, res) => {
    const { title, items } = req.query;
    fetch(`https://22hbg.com/wp-json/wp/v2/posts/`)
        .then((res) => res.json())
        .then((response) => {
        var _a;
        return res.send(response
            .filter((data) => data.title.rendered.includes(title))
            .splice(0, (_a = +items) !== null && _a !== void 0 ? _a : response.length - 1));
    });
    console.log(title + '-' + items);
});
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
module.exports = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
const port = process.env.PORT || 400;
app.get('/', (_req, res) => {
    res.send('ok!');
});
app.get('/test', (_req, res) => {
    res.send({
        title: 'test1',
        body: 'body1',
    });
});
//! creo un endpoint da richiamare lato client che ritorna i dati di quell API (uso una GET)
app.get('/posts', (_req, res) => {
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
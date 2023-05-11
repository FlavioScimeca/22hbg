import express, { Request, Response } from 'express';
import { Post, CustomReq } from '../interface';

const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());

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
app.get('/posts', (_req: Request, res: Response) => {
  fetch('https://22hbg.com/wp-json/wp/v2/posts/')
    .then((res) => res.json())
    .then((response) => res.send(response));
});

//! per ora i valori sono statici poi li faro passare dal req.body (voglio capire se posso filtrarli direttamente dalla query)
//* ho creato CustomReq per tipizzare {title , items} se no l'includes() e lo splice() non li accettavano
app.get('/posts-filtered', (req: CustomReq, res: Response) => {
  const { title, items } = req.query;

  fetch(`https://22hbg.com/wp-json/wp/v2/posts/`)
    .then((res) => res.json())
    .then((response: Array<Post>) =>
      res.send(
        response
          .filter((data: Post) => data.title.rendered.includes(title))
          .splice(0, +items ?? response.length - 1)
      )
    );
  console.log(title + '-' + items);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = app;

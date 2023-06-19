import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Post, CustomReq } from '../interface';

const app = express();
dotenv.config();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

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
app.get('/posts', async (_req: Request, res: Response) => {
  try {
    const data = await fetch('https://22hbg.com/wp-json/wp/v2/posts/');
    const response = await data.json();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

//! per ora i valori sono statici poi li faro passare dal req.body (voglio capire se posso filtrarli direttamente dalla query)
//* ho creato CustomReq per tipizzare {title , items} se no l'includes() e lo splice() non li accettavano
app.post('/posts-filtered', async (req: CustomReq, res: Response) => {
  const { title, items } = req.query;

  try {
    const data = await fetch(`https://22hbg.com/wp-json/wp/v2/posts/`);
    const response = await data.json();

    res
      .status(200)
      .send(
        response
          .filter((data: Post) => data.title.rendered.includes(title))
          .splice(0, +items ?? response.length - 1)
      );
  } catch (error) {
    console.log(error);
    res.status(404);
  }

  console.log(title + '-' + items);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = app;

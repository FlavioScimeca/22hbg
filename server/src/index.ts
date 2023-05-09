import express, { Request, Response } from 'express';
import { Post } from '../interface';

const app = express();

//! creo un endpoint da richiamare lato client che ritorna i dati di quell API (uso una GET)
app.get('/posts', (req: Request, res: Response) => {
  fetch('https://22hbg.com/wp-json/wp/v2/posts/')
    .then((res) => res.json())
    .then((response) => res.send(response));
});

//! per ora i valori sono statici poi li faro passare dal req.body (voglio capire se posso filtrarli direttamente dalla query)
app.get('/posts-filtered', (req: Request, res: Response) => {
  let t: string = 'a';
  let n: number = 1;

  fetch(`https://22hbg.com/wp-json/wp/v2/posts/`)
    .then((res) => res.json())
    .then((response: Array<Post>) =>
      res.send(
        response
          .filter((data: Post) => data.title.rendered.includes(t))
          .splice(0, n ?? response.length - 1)
      )
    );
});

app.listen(4000, () => {
  console.log('running on 4000');
});

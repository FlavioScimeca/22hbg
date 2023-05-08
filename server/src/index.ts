import express, { Request, Response } from 'express';

const app = express();

//! creo un end-point da richiamare lato client che ritorna i dati di quell API (uso una GET)
app.get('/get-posts', (req: Request, res: Response) => {
  fetch('https://22hbg.com/wp-json/wp/v2/posts/')
    .then((res) => res.json())
    .then((response) => res.send(response));
});

app.listen(4000, () => {
  console.log('running on 4000');
});

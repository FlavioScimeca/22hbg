import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript and node');
});

app.listen(4321, () => {
  console.log('running on 4321');
});

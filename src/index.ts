import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({"message": "Hello"})
});

app.listen(8080, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${8080}`);
});
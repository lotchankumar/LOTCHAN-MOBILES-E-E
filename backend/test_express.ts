import express from 'express';

const app = express();

app.use((req, res, next) => {
  req.query = req.query || {};
  (req as any).query.foo = 'bar';
  next();
});

app.get('/', (req, res) => {
  res.json({ query: req.query });
});

app.listen(5001, () => console.log('Listening on 5001'));

const express = require('express');
const startGraphQlServer = require('./graphql/graphql.server');

const app = express();
const port = 3000;
const graphqlPort = 9000;

app.use(express.static('public'));
app.get('/test1', (req, res) => {
  res.send('Hello World!');
});

app.get('/request-header-1', (req, res) => {
  res.send('server response');
});

app.listen(port, () => {
  console.log(`E2E Browser-proxy is listening on http://localhost:${port}`);
});

startGraphQlServer({ port: graphqlPort });
console.log(
  `E2E Browser-proxy graphQL is listeners http://localhost:${graphqlPort}`,
);

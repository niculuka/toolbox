const express = require('express');
const app = express();

const root = __dirname + "/dist/toolbox/browser";

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: root})
});

app.listen(process.env.PORT || 3008);
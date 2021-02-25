const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');

const axios = require('axios');

app.use(bodyParser.json({ extended: true }), express.json());

const CLIENT_ID = "Your API Key";
const CLIENT_SECRET = "Your API Secret";

const token = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build'));
});

app.post(`/token`, (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.headers.authorization);
    console.log(req.headers.accept);
    console.log(req.headers['content-type']);
    console.log(req.query.grant_type);
    console.log("This is the scope: " + req.query.scope);
    const headers = {
      accept: req.headers.accept,
      authorization: token,
    };
    axios
      .post(
        `https://identity.fortellis.io/oauth2/aus1p1ixy7YL8cMq02p7/v1/token/?scope=anonymous&grant_type=client_credentials`,
        null,
        {
          params: {},
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

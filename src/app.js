const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const { ProjectRoutes }  = require('./api-routes');

config();
loaders();

const app = express();
// body'daki bilgileri json olarak alabilmek için önceden bodyparser kullanırdık şimdi express.json kullanıyoruz
app.use(express.json());
app.use(helmet());

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    app.use("/projects", ProjectRoutes.router);
});
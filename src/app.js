const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const { ProjectRoutes, UserRoutes, SectionRoutes }  = require('./api-routes');
const path = require('path');

config();
loaders();
// emitler controllar'dan önce çalışması gereklirdir o yüzden öncelikle eventleri çalıştırıyoruz
events();

const app = express();
// sunucuya göndermem lazım ki resim ui de çalışsın
app.use("/uploads", express.static(path.join(__dirname, './', 'uploads')));
// body'daki bilgileri json olarak alabilmek için önceden bodyparser kullanırdık şimdi express.json kullanıyoruz
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    app.use("/projects", ProjectRoutes);
    app.use("/users", UserRoutes);
    app.use("/sections", SectionRoutes);
});
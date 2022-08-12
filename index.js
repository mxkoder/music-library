const app = require('./src/app.js');

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
    console.log(`App is listenning on port ${APP_PORT}`)
});
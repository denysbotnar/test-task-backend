import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import VideoRoute from './routes/videos.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new VideoRoute(),
]);

app.listen();

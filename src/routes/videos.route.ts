import { Router } from 'express';
import VideosController from '../controllers/videos.controller';
import { CreateVideoDto } from '../dtos/videos.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class VideoRoute implements Route {
  public path = '/videos';
  public router = Router();
  public videosController = new VideosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.videosController.getVideos);
    this.router.get(`${this.path}/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})`, this.videosController.getVideoById);
    this.router.post(`${this.path}`, validationMiddleware(CreateVideoDto), this.videosController.createVideo);
  }
}

export default VideoRoute;

import { NextFunction, Request, Response } from 'express';
import { CreateVideoDto } from '../dtos/videos.dto';
import { VideoInterface, VideoResponseInterface } from '../interfaces/videos.interface';
import VideoService from '../services/videos.service';

class VideosController {
  public videoService = new VideoService();

  public getVideos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllVideosData: VideoResponseInterface[] = await this.videoService.findAllVideos();
      res.status(200).json({ data: findAllVideosData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  public getVideoById = async (req: Request, res: Response, next: NextFunction) => {
    const videoId: string = req.params.id;

    try {
      const findOneVideoData: VideoInterface = await this.videoService.findVideoById(videoId);
      res.status(200).json({ data: findOneVideoData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createVideo = async (req: Request, res: Response, next: NextFunction) => {
    const videoData: CreateVideoDto = req.body;

    try {
      const createVideoData: VideoInterface = await this.videoService.createVideo(videoData);
      res.status(201).json({ data: createVideoData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateVideo = async (req: Request, res: Response, next: NextFunction) => {
    const videoId: string = req.params.id;
    const videoData: VideoInterface = req.body;

    try {
      const updateVideoData: VideoInterface = await this.videoService.updateVideo(videoId, videoData);
      res.status(200).json({ data: updateVideoData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    const videoId: number = Number(req.params.id);

    try {
      const deleteVideoData: VideoInterface = await this.videoService.deleteVideoData(videoId);
      res.status(200).json({ data: deleteVideoData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default VideosController;

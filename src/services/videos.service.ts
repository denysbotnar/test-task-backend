import HttpException from '../exceptions/HttpException';
import videoModel from '../models/videos.model';
import { isEmptyObject } from '../utils/util';
import { VideoInterface, VideoResponseInterface } from '../interfaces/videos.interface';
import { CreateVideoDto } from '../dtos/videos.dto';
import { v1 as uuidv1 } from 'uuid';

class VideoService {

  public videos = videoModel;

  public async findAllVideos(): Promise<VideoResponseInterface[]> {
    const videos: VideoInterface[] = await this.videos.findAll();
    const result: VideoResponseInterface[] = videos.map((item: VideoInterface) => {
      return {
        id: item.public_id,
        name: item.name,
        url_240p: item.url_240p,
        url_480p: item.url_480p,
        url_1080p: item.url_1080p,
        url_4k: item.url_4k,
      };
    });

    return result;
  }

  public async findVideoById(videoId: string): Promise<VideoInterface> {
    const findVideo: VideoInterface = await this.videos.findOne({ where: { public_id: videoId } });
    if (!findVideo) throw new HttpException(409, 'Error');

    return findVideo;
  }

  public async createVideo(videoData: CreateVideoDto): Promise<VideoInterface> {
    if (isEmptyObject(videoData)) throw new HttpException(400, 'Error');

    const { name } = videoData;
    const public_id: string = uuidv1();

    const createVideorData: VideoInterface = await this.videos.create({
      name,
      public_id,
      url_240p: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
      url_480p: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      url_1080p: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4',
      url_4k: 'https://static.videezy.com/system/resources/previews/000/004/164/original/hidden-beach-hawaii-4K.mp4',
    });

    return createVideorData;
  }

  public async updateVideo(videoId: string, videoData: VideoInterface): Promise<VideoInterface> {
    if (isEmptyObject(videoData)) throw new HttpException(400, 'Error');

    const updateVideo: VideoInterface = await this.videos.update(videoData, { where: { public_id: videoId } });
    if (!updateVideo) throw new HttpException(409, 'Error');

    return updateVideo;
  }

  public async deleteVideoData(videoId: number): Promise<VideoInterface> {
    const deleteVideo: VideoInterface = await this.videos.destroy({ where: { id: videoId } });
    if (!deleteVideo) throw new HttpException(409, 'Error');

    return deleteVideo;
  }
}

export default VideoService;

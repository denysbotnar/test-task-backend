import { IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  public name: string;

  // @IsString()
  // public url_240p: string;
  //
  // @IsString()
  // public url_480p: string;
  //
  // @IsString()
  // public url_1080p: string;
  //
  // @IsString()
  // public url_4k: string;
}

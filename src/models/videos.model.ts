import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ modelName: 'videos', timestamps: true, paranoid: false })
export default class Videos extends Model<Videos> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public_id: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  url_240p: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  url_480p: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  url_1080p: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  url_4k: string;
}

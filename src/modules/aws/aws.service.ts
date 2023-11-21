import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { logger } from 'handlebars';

import { AwsSetting } from '../../utils/aws.setting.enum';

const { AWS_PROFILE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  AwsSetting;

@Injectable()
export class AwsS3Service {
  constructor(private configService: ConfigService) {}

  private bucketName = this.configService.get(AWS_PROFILE_BUCKET_NAME);
  private s3 = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.get(AWS_ACCESS_KEY_ID),
      secretAccessKey: this.configService.get(AWS_SECRET_ACCESS_KEY)
    },
    region: 'eu-north-1'
  });

  async uploadFile(file: Express.Multer.File) {
    return this.upload(
      file.buffer,
      this.bucketName,
      file.originalname,
      file.mimetype
    );
  }

  private async upload(file, bucket, name, mimetype) {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: bucket,
      ContentDisposition: 'inline',
      ContentType: mimetype,
      Key: String(name)
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      logger.log(e, 'Amazon file upload error');
    }
  }

  removeDuplicates(data) {
    return [...new Set(data)];
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} aw`;
  // }
  //
  // update(id: number, updateAwDto: UpdateAwDto) {
  //   return `This action updates a #${id} aw`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} aw`;
  // }
}

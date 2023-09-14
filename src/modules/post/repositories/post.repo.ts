import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { CreatePostInDB } from '../dto/update-post.dto';

@Injectable()
export class PostsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(dto: CreatePostInDB) {
    return this.prisma.post.create({
      data: dto
    });
  }

  async findPostById(id: string, userId: string) {
    try {
      return this.prisma.post.findFirst({
        where: { id: id, userId: userId }
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Post do not find' },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updatePost(id, data) {
    try {
      return this.prisma.post.update({
        data: data,
        where: { id }
      });
    } catch (error) {
      return error;
    }
  }

  async deletePost(dto) {
    const { id, userId } = dto;
    try {
      return this.prisma.post.delete({
        where: { id: id, userId: userId }
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(userId: string, take: number, skip: number, order) {
    try {
      return this.prisma.post.findMany({
        orderBy: { createdAt: order },
        skip: skip,
        take: take,
        where: { userId }
      });
    } catch (error) {
      return error;
    }
  }
}

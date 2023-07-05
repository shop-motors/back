import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  create(createCommentDto: CreateCommentDto, userId: string, vehicleId: string) {
    return this.commentsRepository.create(createCommentDto, userId, vehicleId);
  }

  async findAll() {
    return this.commentsRepository.findAll();
  }

  async findOne(id: string) {
    return this.commentsRepository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    return this.commentsRepository.update(id, updateCommentDto, userId);
  }

  async remove(id: string, userId: string) {
    await this.commentsRepository.delete(id, userId);
  }
}


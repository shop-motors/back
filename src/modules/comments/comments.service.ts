import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const comment = await this.commentsRepository.findOne(id);
    if (comment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this comment.');
    }
    return this.commentsRepository.update(id, updateCommentDto, userId); // include userId here
}

  async remove(id: string, userId: string) {
    const comment = await this.commentsRepository.findOne(id);
    if (comment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this comment.');
    }
    return this.commentsRepository.delete(id, userId);
  }
}

import { PrismaClient } from "@prisma/client";
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { UpdateCommentDto } from '../../dto/update-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { CommentsRepository } from '../comments.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

class CommentsPrismaRepository implements CommentsRepository{
    private prisma = new PrismaClient();

   
  async create(data: CreateCommentDto, userId: string, vehicleId: string): Promise<Comment> {
    const comment = await this.prisma.comment.create({
      data: {
        content: data.content,
        userId: userId,
        vehicleId: vehicleId,
      },
    });

    return comment;
  }

    async findAll(): Promise<Comment[]> {
        const comments = await this.prisma.comment.findMany();
        return comments;
    }

    async findOne(id: string): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: id },
        });

        if (!comment) throw new Error('Comment not found');

        return comment;
    }

    async update(id: string, data: UpdateCommentDto): Promise<Comment> {
        const comment = await this.prisma.comment.update({
          where: { id },
          data: {
            content: data.content,
            updatedAt: new Date(),
          },
        });
    
        return comment;
      }

      async delete(id: string, userId: string): Promise<void> {
        const comment = await this.prisma.comment.findUnique({
          where: { id },
        });
    
        if (!comment) {
          throw new NotFoundException('Comment not found.');
        }
    
        if (comment.userId !== userId) {
          throw new ForbiddenException('You do not have permission to delete this comment.');
        }
    
        await this.prisma.comment.delete({
          where: { id },
        });
      }
}

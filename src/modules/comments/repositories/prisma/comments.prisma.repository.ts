import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { UpdateCommentDto } from '../../dto/update-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { CommentsRepository } from '../comments.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class CommentsPrismaRepository implements CommentsRepository {
  private prisma = new PrismaClient();

  async create(
    data: CreateCommentDto,
    userId: string,
    vehicleId: string,
  ): Promise<Comment> {
    const vehicle = await this.prisma.vehicles.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    const prismaComment = await this.prisma.comment.create({
      data: {
        content: data.content,
        user: {
          connect: { id: userId },
        },
        vehicle: {
          connect: { id: vehicleId },
        },
      },
    });

    const comment = new Comment(userId, data.content);
    comment.createdAt = prismaComment.createdAt.toLocaleString();

    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const prismaComments = await this.prisma.comment.findMany();
    return prismaComments.map((c) => {
      const comment = new Comment(c.userId, c.content);
      comment.createdAt = c.createdAt.toLocaleString();
      comment.updatedAt = c.updatedAt ? c.updatedAt.toLocaleString() : null;
      return comment;
    });
  }

  async findOne(id: string): Promise<Comment> {
    const prismaComment = await this.prisma.comment.findUnique({
      where: { id: id },
    });

    if (!prismaComment) throw new Error('Comment not found');

    const comment = new Comment(prismaComment.userId, prismaComment.content);
    comment.createdAt = prismaComment.createdAt.toLocaleString();
    comment.updatedAt = prismaComment.updatedAt
      ? prismaComment.updatedAt.toLocaleString()
      : null;

    return comment;
  }

  async update(
    id: string,
    data: UpdateCommentDto,
    userId: string,
  ): Promise<Comment> {
    const prismaComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!prismaComment) {
      throw new NotFoundException('Comment not found.');
    }

    if (prismaComment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment.',
      );
    }

    const updatedPrismaComment = await this.prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
        updatedAt: new Date(),
      },
    });

    const updatedComment = new Comment(
      updatedPrismaComment.userId,
      updatedPrismaComment.content,
    );
    updatedComment.createdAt = updatedPrismaComment.createdAt.toLocaleString();
    updatedComment.updatedAt = updatedPrismaComment.updatedAt.toLocaleString();

    return updatedComment;
  }

  async delete(id: string, userId: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment.',
      );
    }

    await this.prisma.comment.delete({
      where: { id },
    });
  }
}

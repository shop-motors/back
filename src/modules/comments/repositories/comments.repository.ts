import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

export abstract class CommentsRepository {
    abstract create(data: CreateCommentDto, userId: string, vehicleId: string): Promise<Comment> | Comment;
    abstract findAll(): Promise<Comment[]> | Comment[] ;
    abstract findOne(id: string): Promise<Comment> | Comment;
    abstract update(id: string, data: UpdateCommentDto, userId: string): Promise<Comment> | Comment;
    abstract delete(id: string, userId: string): Promise<void> | void;
}


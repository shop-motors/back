import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Param('vehicleId') vehicleId: string, @Request() req) {
    const userId = req.user.id;
    return this.commentsService.create(createCommentDto, userId, vehicleId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Param('vehicleId') vehicleId: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req) {
    const userId = req.user.id;
    return this.commentsService.update(id, updateCommentDto, userId, vehicleId);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.commentsService.remove(id, userId);
  }
}


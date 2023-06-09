import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard ('jwt'))
  @Post('/:vehicleId')
  create(@Body() createCommentDto: CreateCommentDto, @Param('vehicleId') vehicleId: string, @Request() req) {
    const userId = req.user.id;
    if (!vehicleId) {
      throw new BadRequestException('vehicleId is required');
    }
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
  

  @UseGuards(AuthGuard ('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req) {
      const userId = req.user.id;
      return this.commentsService.update(id, updateCommentDto, userId);
  }
  
  
  @UseGuards(AuthGuard ('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.commentsService.remove(id, userId);
  }
}


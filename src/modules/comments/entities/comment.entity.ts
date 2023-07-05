import { randomUUID } from 'crypto';

export class Comment {
  readonly id: string;
  content: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date | null;

  constructor(userId: string, content: string, id?: string) {
    this.id = id || randomUUID();
    this.userId = userId;
    this.content = content;
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = null;
  }
}


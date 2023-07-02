import { randomUUID } from 'crypto';

export class Comment {
  readonly id: string;
  content: string;
  userId: string;
  createdAt: string; // Add this
  updatedAt: string | null; // Add this

  constructor(userId: string, content: string) {
    this.id = randomUUID();
    this.userId = userId;
    this.content = content;
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = null;
  }
}

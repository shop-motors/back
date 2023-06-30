import { randomUUID } from 'crypto';

export class Comment {
    readonly id: string
    content: string
    userId: string

    constructor(id: string, userId: string){
        this.id = randomUUID()
        this.userId = userId
    }
}


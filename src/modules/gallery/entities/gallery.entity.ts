/* eslint-disable prettier/prettier */
import { Url } from "url";
import { randomUUID } from 'crypto';

export class Gallery {
    readonly id: string;
    img_url: Url

    constructor(){
        this.id = randomUUID()
    }
}

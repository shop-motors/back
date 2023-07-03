export class Gallery {
    readonly id: string;
    image_url: string; 

    constructor(id: string, image_url: string) {
        this.id = id;
        this.image_url = image_url;
    }
}


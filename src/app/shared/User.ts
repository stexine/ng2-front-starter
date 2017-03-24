export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    password2: string;
    avatar_img_url: string;
    profile: any

    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.password2 = '';
        this.avatar_img_url = '';
        this.profile = {}
    }
}
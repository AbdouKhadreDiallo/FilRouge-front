import { Profils } from "./profils.model";

export class Users {
    id?:number;
    email: string | undefined;
    firstname!: string;
    lastname!: string;
    avatar?: string;
    isDeleted?: boolean;
    profil!: Profils;

}
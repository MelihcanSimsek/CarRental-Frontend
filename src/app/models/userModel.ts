export interface UserModel{
    id:number;
    firstName:string;
    lastName:string;
    roles:string[]|null;
    email:string;
}
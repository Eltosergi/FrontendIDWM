import { User } from "next-auth";

export interface UserResponse {
    user: User[];
}
import { UserResponse } from "@/models/responses/user-response";

export const getAllUsers = async (): Promise<UserResponse> => {
    const response = await fetch('user');
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }
    return response.json();
}

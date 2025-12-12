import { api } from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  userId?: string;
};

export async function loginRequest(data: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await api.post("auth/login", data);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data || "Erro ao fazer login");
    }
    throw new Error("Erro desconhecido");
  }
}

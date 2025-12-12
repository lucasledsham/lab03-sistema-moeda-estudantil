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
  const res = await fetch(`${api}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await tryGetError(res);
    throw new Error(text || "Erro ao fazer login");
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}

async function tryGetError(res: Response) {
  try {
    return await res.text();
  } catch {
    return "Erro desconhecido";
  }
}

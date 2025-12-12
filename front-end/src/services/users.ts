import { api } from "./api";
export type User = { id: string; name: string; email: string; role: string };

const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Silva", email: "alice@uni.edu", role: "student" },
  { id: "2", name: "Bruno Costa", email: "bruno@uni.edu", role: "teacher" },
  { id: "3", name: "Carla Souza", email: "carla@uni.edu", role: "admin" }
];

function shouldUseMock() {
  const isBrowser = typeof window !== "undefined";
  const queryMock = isBrowser && window.location.search.includes("mock");
  const envMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === "1";
  const testing = process.env.NODE_ENV === "test";
  return queryMock || envMock || testing;
}

export async function fetchUsers(): Promise<{ data: User[]; error: string | null }> {
  if (shouldUseMock()) {
    return { data: MOCK_USERS, error: null };
  }

  try {
    const res = await api.get("admin/users");
    return { data: res.data, error: null };
  } catch (err) {
    console.warn("Backend falhou, usando MOCK_USERS:", err);
    return {
      data: MOCK_USERS,
      error: "Falha ao carregar usuários do servidor. Exibindo dados de exemplo."
    };
  }
}

export async function updateUser(user: User) {
  try {
    const res = await api.put("admin/users", user);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data || "Erro ao atualizar usuário");
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await api.delete("admin/users", { data: { id } });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data || "Erro ao excluir usuário");
  }
}

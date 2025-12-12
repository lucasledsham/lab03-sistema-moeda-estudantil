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
    const res = await fetch(`${api}admin/users`);
    if (!res.ok) throw new Error(`server responded ${res.status}`);
    const data: User[] = await res.json();
    return { data, error: null };
  } catch (err) {
    console.warn("Backend falhou, usando MOCK_USERS:", err);
    return {
      data: MOCK_USERS,
      error: "Falha ao carregar usuários do servidor. Exibindo dados de exemplo."
    };
  }
}

export async function updateUser(user: User) {
  return fetch(`${api}admin/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
}

export async function deleteUser(id: string) {
return fetch(`${api}admin/users`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

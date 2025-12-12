import { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUser, User } from "@/services/users";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await fetchUsers();
    setUsers(data);
    setError(error);
    setLoading(false);
  }

  async function save(u: User) {
    updateUser(u);
    setUsers(prev => prev.map(x => (x.id === u.id ? u : x)));
  }

  async function remove(id: string) {
    deleteUser(id);
    setUsers(prev => prev.filter(x => x.id !== id));
  }

  return { users, loading, error, save, remove };
}

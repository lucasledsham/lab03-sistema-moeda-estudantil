"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = { id: string; name: string; email: string; role: string };

const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Silva", email: "alice@uni.edu", role: "student" },
  { id: "2", name: "Bruno Costa", email: "bruno@uni.edu", role: "teacher" },
  { id: "3", name: "Carla Souza", email: "carla@uni.edu", role: "admin" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const useMockQuery = isBrowser && window.location.search.includes("mock");
    const useMockEnv = process.env.NEXT_PUBLIC_ENABLE_MOCK === "1";

    // Use mocks only when explicitly requested (query param, env or test)
    if (useMockQuery || useMockEnv || process.env.NODE_ENV === "test") {
      setUsers(MOCK_USERS);
      setLoading(false);
      setError(null);
      return;
    }

    // Otherwise try backend; if it fails, FALLBACK to mock for preview
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error(`server responded ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(
          "Failed to load users from backend, using MOCK_USERS:",
          err
        );
        // fallback to mock so you can preview UI locally
        setUsers(MOCK_USERS);
        // optional small notice in UI
        setError(
          "Falha ao carregar usuários do servidor, usando dados de exemplo."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function openEdit(u: User) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setOpen(true);
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!editing) return;
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, ...form }),
    });
    // update UI locally so preview works even if backend not available
    setUsers((s: User[]) =>
      s.map((u) => (u.id === editing.id ? { ...u, ...form } : u))
    );
    setOpen(false);
    setEditing(null);
    if (!res.ok) {
      console.warn("PUT /api/admin/users failed", res.status);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Confirmar deleção?")) return;
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    // remove locally in all cases so UI updates for preview
    setUsers((s) => s.filter((u) => u.id !== id));
    if (!res.ok) {
      console.warn("DELETE /api/admin/users failed", res.status);
    }
  }

  return (
    <div>
      <h1>Gerenciar Usuários</h1>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            fontFamily: "inherit",
          }}
        >
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Nome</th>
              <th style={{ textAlign: "left", padding: 8 }}>Email</th>
              <th style={{ textAlign: "left", padding: 8 }}>Papel</th>
              <th style={{ textAlign: "left", padding: 8 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td
                  style={{
                    padding: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {u.name}
                </td>
                <td
                  style={{
                    padding: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {u.email}
                </td>
                <td style={{ padding: 8 }}>{u.role}</td>
                <td
                  style={{
                    padding: 8,
                    textAlign: "right", // alinha conteúdo à direita da célula
                    verticalAlign: "middle", // alinha verticalmente com a linha
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex", // garante que botões fiquem lado a lado
                      gap: 8,
                      alignItems: "center",
                      marginRight: 200,
                    }}
                  >
                    <Button onClick={() => openEdit(u)}>Editar</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(u.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
          }}
          onClick={() => {
            setOpen(false);
            setEditing(null);
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Editar Usuário</h2>
            <form onSubmit={handleSave}>
              <label style={{ display: "block", marginTop: 8 }}>Nome</label>
              <Input
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <label style={{ display: "block", marginTop: 8 }}>Email</label>
              <Input
                value={form.email}
                onChange={(e: any) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <label style={{ display: "block", marginTop: 8 }}>Role</label>
              <Input
                value={form.role}
                onChange={(e: any) =>
                  setForm({ ...form, role: e.target.value })
                }
              />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <Button type="submit">Salvar</Button>
                <Button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditing(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

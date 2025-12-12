"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/lib/hooks/useUsers";
import type { User } from "@/services/users";

export default function AdminUsersPage() {
  const { users, loading, error, save, remove } = useUsers();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  function openEdit(u: User) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setOpen(true);
  }

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!editing) return;

    await save({ ...editing, ...form });
    setOpen(false);
    setEditing(null);
  }

  return (
    <div>
      <h1>Gerenciar Usuários</h1>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
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
                <td style={{ padding: 8 }}>{u.name}</td>
                <td style={{ padding: 8 }}>{u.email}</td>
                <td style={{ padding: 8 }}>{u.role}</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  <Button onClick={() => openEdit(u)}>Editar</Button>
                  <Button variant="destructive" onClick={() => remove(u.id)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => {
            setOpen(false);
            setEditing(null);
          }}
        >
          <div
            style={{ background: "#fff", padding: 20, borderRadius: 8, minWidth: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Editar Usuário</h2>
            <form onSubmit={handleSave}>
              <label>Nome</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Email</label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label>Role</label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
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

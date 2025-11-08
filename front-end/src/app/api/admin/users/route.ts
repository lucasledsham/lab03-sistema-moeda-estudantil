import { NextResponse } from "next/server";
const BACKEND = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function GET(req: Request) {
  const res = await fetch(`${BACKEND}/admin/users`, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body?.id)
    return NextResponse.json({ error: "id required" }, { status: 400 });
  const res = await fetch(`${BACKEND}/admin/users/${body.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      cookie: req.headers.get("cookie") ?? "",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  if (!body?.id)
    return NextResponse.json({ error: "id required" }, { status: 400 });
  const res = await fetch(`${BACKEND}/admin/users/${body.id}`, {
    method: "DELETE",
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

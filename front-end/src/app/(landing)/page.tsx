"use client";
import { useRouter } from "next/navigation";
export default function home() {
  const router = useRouter();
  router.push("/login");
  return <> </>;
}

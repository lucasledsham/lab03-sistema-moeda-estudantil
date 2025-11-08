import Navbar from "@/components/navbar";
import { Coins } from "lucide-react";

export default function Page() {
  return (
    <>
      <Navbar
        links={[
          { href: "/home", title: "Home" },
          { href: "/consultar-moedas", title: "Meu Saldo" },
          { href: "/pagar-moedas", title: "Pagar Moedas" },

          { href: "/logout", title: "Sair" },
        ]}
        className=""
      ></Navbar>
      <div className="text-center sm:text-2xl md:text-4xl xl:text-6xl mb-10 font-bold mt-8 items-center flex justify-center gap-16">
        <Coins className="text-amber-600 " />
        <h1 className="">Bem vindo ao Educoin</h1>
        <Coins className="text-amber-600" />
      </div>
    </>
  );
}

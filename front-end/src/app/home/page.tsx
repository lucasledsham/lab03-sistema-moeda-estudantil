"use client";

import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

export default function Page() {
  return (
    <div
      className="
        min-h-screen 
        bg-cover 
        bg-center 
        bg-fixed 
        bg-no-repeat
      "
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Navbar
        links={[
          { href: "/home", title: "Home" },
          { href: "/consultar-moedas", title: "Meu Saldo" },
          { href: "/pagar-moedas", title: "Pagar Moedas" },
          { href: "/vantagens-cadastro", title: "Cadastrar Vantagens" },
          { href: "/vantagens-listar", title: "Ver Vantagens" },

          { href: "/login", title: "Sair" },
        ]}
        className=""
      ></Navbar>
      <div className="text-center sm:text-2xl md:text-4xl xl:text-6xl mb-10 font-bold mt-8 items-center flex justify-center gap-16">
        <Coins className="text-amber-600 " />
        <h1 className=" text-amber-50">Bem vindo ao Educoin</h1>
        <Coins className="text-amber-600" />
      </div>
      <Card className="mx-auto max-w-md md:max-w-lg bg-amber-50/80">
        <CardContent>
          <p className="text-center text-sm md:text-md lg:text-lg xl:text-xl text-left">
            O Educoin é uma plataforma inovadora que visa incentivar e
            recompensar comportamentos positivos dentro do ambiente educacional.
            Ao utilizar nossa plataforma, estudantes, professores e funcionários
            podem ganhar moedas virtuais, chamadas educoins, por meio de ações
            como participação em aulas, cumprimento de tarefas, colaboração com
            colegas e muito mais.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

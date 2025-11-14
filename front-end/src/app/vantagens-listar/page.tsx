import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <Navbar
        links={[
          { href: "/home", title: "Home" },
          { href: "/consultar-moedas", title: "Meu Saldo" },
          { href: "/pagar-moedas", title: "Pagar Moedas" },
          { href: "/vantagens-cadastro", title: "Cadastrar Vantagens" },
          { href: "/vantagens-listar", title: "Ver Vantagens" },

          { href: "/logout", title: "Sair" },
        ]}
        className=""
      ></Navbar>
    </>
  );
}

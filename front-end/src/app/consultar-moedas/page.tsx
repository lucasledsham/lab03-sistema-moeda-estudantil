import Navbar from "@/components/navbar";
import { TransactionDashboard } from "./_transactionDashboard";

export default function page() {
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
      <TransactionDashboard></TransactionDashboard>
    </>
  );
}

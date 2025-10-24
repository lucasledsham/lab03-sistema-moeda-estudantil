import Navbar from "@/components/navbar";

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-center text-6xl mb-10 font-bold">Educoin</h1>
      <span className="text-center text-2xl mb-10 font-semibold">
        Você está logado
      </span>
    </>
  );
}

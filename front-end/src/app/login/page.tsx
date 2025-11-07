import Navbar from "@/components/navbar";
import LoginForm from "./_form";

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-center text-6xl mb-10 font-bold mt-8">Educoin</h1>
      <LoginForm />
    </>
  );
}

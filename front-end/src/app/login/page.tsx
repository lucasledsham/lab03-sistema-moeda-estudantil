import Navbar from "@/components/navbar";
import LoginForm from "./_form";

export default function page() {
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
      <Navbar />

      <div className="container mx-auto p-8">
        <h1 className="text-center text-6xl mb-10 font-bold mt-8 text-white drop-shadow-lg">
          Educoin
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

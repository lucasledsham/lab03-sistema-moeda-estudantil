"use client";
import { useState } from "react";
import RegisterCompanyForm from "./_company-form";
import RegisterStudentForm from "./_student-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ButtonGroup } from "@/components/ui/button-group";
import Navbar from "@/components/navbar";

export default function Page() {
  // Estado para controlar qual formulário está ativo
  const [selectedForm, setSelectedForm] = useState<"student" | "company">(
    "student"
  );

  return (
    <>
      <Navbar links={[{ href: "/", title: "Voltar" }]} />
      <h1 className="text-center text-6xl mb-10 font-bold">Educoin</h1>

      <div className="flex flex-col items-center">
        <ButtonGroup className="">
          <Button
            variant={selectedForm === "student" ? "default" : "outline"}
            className=" mx-auto w-50 rounded-t-lg rounded-b-none"
            onClick={() => setSelectedForm("student")}
          >
            Aluno
          </Button>

          <Button
            variant={selectedForm === "company" ? "default" : "outline"}
            className=" mx-auto w-50 rounded-t-lg rounded-b-none"
            onClick={() => setSelectedForm("company")}
          >
            Empresa
          </Button>
        </ButtonGroup>

        {selectedForm === "student" ? (
          <RegisterStudentForm />
        ) : (
          <RegisterCompanyForm />
        )}
      </div>
      {/* Renderização condicional dos formulários */}
    </>
  );
}

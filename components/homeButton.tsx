"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export default function HomeButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/")}
      className="bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-sky-500 px-5 py-4 rounded-xl text-left shadow-sm hover:shadow-sky-500/20 transition-all"
    >
      <Home/>
    </Button>
  );
}

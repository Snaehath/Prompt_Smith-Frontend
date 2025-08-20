"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { HomePage } from "@/components/home-page";
import WallpaperGenerator from "@/components/wallpaper";
import PromptStudio from "@/components/promptStudio";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";


export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "generator" | "studio">(
    "home"
  );
  const [bgImage, setBgImage] = useState<string>("");
  const [hide, setHide] = useState(false);

  const handleBackgroundImage = (imageUrl: string) => {
    setBgImage(imageUrl ?? "");
  };
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && <HomePage onNavigate={setActiveTab} />}

        {activeTab === "generator" && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="font-serif text-2xl md:text-4xl font-bold text-slate-900">
                Wallpaper Generator{" "}<Button variant="ghost" onClick={() => setHide(!hide)}>
                {hide ? <EyeClosed /> : <Eye />}
              </Button>
              </h1>
            </div>

            <WallpaperGenerator handleBackgroundImage={handleBackgroundImage} hide={hide} />
          </div>
        )}

        {activeTab === "studio" && <PromptStudio />}
      </main>
    </div>
  );
}

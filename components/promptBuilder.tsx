"use client";

import { useEffect, useRef, useState } from "react";

import { Artwork, Step } from "@/types";
import Loader from "./loader";
import MuseumShow from "./museumShow";
import Contribution from "./contribution";
import PoeticShow from "./poeticShow";
import PromptStudio from "./promptStudio";

interface promptBuilderProps {
  step: Step;
}
const toArtwork = (p: string, id: number): Artwork => ({
  id,
  title: p.slice(0, 3),
  artist: "Gemini",
  year: new Date().getFullYear().toString(),
  description: "Random two-line cinematic prompt",
  style: "Two-Line Cinematic",
  prompt: p,
  imageUrl: "",
});

export default function PromptBuilder({ step }: promptBuilderProps) {
  const [prompts, setPrompts] = useState<Artwork[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const itDidnt = useRef(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleBack = () => {
    // setStep("suggestion");
  };

  const handlePromptGeneration = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-prompt");

      const data = await res.json();

      if (!res.ok || !data.prompt) {
        console.error("Error:", data.error || "Failed to generate prompt");
        return;
      }

      setPrompts((prev) => {
        const nextId = prev.length + 1;
        return [...prev, toArtwork(data.prompt, nextId)];
      });
    } catch (err) {
      console.error("Network error:", err);
    }
  };
  useEffect(() => {
    if (itDidnt.current) return;
    itDidnt.current = true;
    const generateAll = async () => {
      for (let i = 0; i < 6; i++) {
        await handlePromptGeneration();
        await sleep(3000);
      }
    };

    generateAll();
  }, []);
  const handleImageGeneration = async (prompt: string) => {
    setPrompts((prev) =>
      prev.map((art) =>
        art.prompt === prompt ? { ...art, imageUrl: "" } : art
      )
    );
    try {
      const res = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error:", errorData.error || "Failed to generate image");
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPrompts((prev) => {
        return prev.map((art) =>
          art.prompt === prompt ? { ...art, imageUrl } : art
        );
      });
      setLoadingText("Image generated!");
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Loader loading={isLoading} text={loadingText} />

      {step === "museum" && (
        <MuseumShow
          artPrompts={prompts}
          handleImageGeneration={handleImageGeneration}
        />
      )}
      {step === "poem" && <PoeticShow />}
      {step === "learning" && <PromptStudio />}

      {step === "contribution" && <Contribution />}
    </div>
  );
}

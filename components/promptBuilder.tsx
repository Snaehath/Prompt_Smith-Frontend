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
const toArtwork = (p: Artwork | string, id: number): Artwork => {
   if (typeof p === "string") {
    return {
      id,
      title: p.slice(0, 10) + "...",
      artist: "Manual Entry",
      description: "User-generated prompt",
      style: "Freeform",
      prompt: p,
      year: new Date().getFullYear().toString(),
      imageUrl: "",
    };
  }

  return {
    id,
    title: p.title,
    artist: p.artist,
    description: p.description,
    prompt: p.prompt,
    style: p.style,
    year: p.year,
    imageUrl: "",
  };
}

export default function PromptBuilder({ step }: promptBuilderProps) {
  const [prompts, setPrompts] = useState<Artwork[]>([]);
  const [bgImage, setBgImage] = useState<string>("");

  const[promptError, setPromptError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const itDidnt = useRef(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleBack = () => {
    // setStep("suggestion");
  };

  const handleManualPrompt = (prompt: string) => {
    setPrompts((prev) => [...prev, toArtwork(prompt, prev.length + 1)]);
  };

  const handlePromptGeneration = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-prompt");

      const data = await res.json();

      if (!res.ok || !data.prompt) {
        console.error("Error:", data.error || "Failed to generate prompt");
        setPromptError(true);
        return;
      }

      setPrompts((prev) => {
        const nextId = prev.length + 1;
        return [...prev, toArtwork(data, nextId)];
      });
    } catch (err) {
      console.error("Network error:", err);
      setPromptError(true);
    }
  };
  useEffect(() => {
    if (itDidnt.current) return;
    itDidnt.current = true;
    const generateAll = async () => {
      for (let i = 0; i < 3; i++) {
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

  const handleBackgroundImage = (id: number) => {
    const selectedPrompt = prompts.find((p) => p.id === id);
    if (selectedPrompt) {
      setBgImage(selectedPrompt?.imageUrl ?? "");
    }
  };
  return (
    <>
      <Loader loading={isLoading} text={loadingText} />

      {step === "museum" && (
        <div
          className="h-screen flex items-center justify-center"
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <MuseumShow
            artPrompts={prompts}
            errorOccurred={promptError}
            handleManualPrompt={handleManualPrompt}
            handleImageGeneration={handleImageGeneration}
            handlebackground={handleBackgroundImage}
          />
        </div>
      )}

      {step === "poem" && (
        <div className="h-screen overflow-y-auto">
          <PoeticShow />
        </div>
      )}

      {step === "learning" && (
        <div className="min-h-screen overflow-y-auto">
          <PromptStudio />
        </div>
      )}

      {step === "contribution" && (
        <div className="h-screen flex items-center justify-center">
          <Contribution />
        </div>
      )}
    </>
  );
}

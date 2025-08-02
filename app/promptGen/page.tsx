"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import PromptBuilder from "@/components/promptBuilder";
import { Step } from "@/types";

export default function HomePage() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-2">
      {!selectedStep ? (
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-5">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Prompt Museum
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              A curated museum of world-class prompts that produce art-like,
              gallery-worthy images. Browse, copy, or generate — build your own
              collection from masterfully crafted prompts.
            </p>
            <Button
              onClick={() => setSelectedStep('museum')}
              className="mt-2 mr-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-400/40 transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              Enter the Art Museum
            </Button>
            <Button
              onClick={() => setSelectedStep('poem')}
              className="mt-2 mr-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-400/40 transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              Enter the Poetic Gallery
            </Button>
            <Button
              onClick={() => setSelectedStep('learning')}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-400/40 transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              Enter prompt Studio
            </Button>
          </div>
        </div>
      ) : (
        <PromptBuilder step={selectedStep} />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import CategorySelector from "./categorySelector";
import SubjectInputForm from "./subjectInput";
import SuggestionSelector from "./suggestionSelector";
import PromptResult from "./promptResults";
import { PromptCategory, Step } from "@/types";
import Loader from "./loader";

export default function PromptBuilder() {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<PromptCategory | null>(null);
  const [subject, setSubject] = useState("");
  const [suggestions, setSuggestions] = useState<string[][]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const handleCategorySelect = (cat: PromptCategory) => {
    setCategory(cat);
  };
  useEffect(() => {
    if (category) {
      setStep("form");
    }
  }, [category]);

  const handleBack = () => {
    setStep("suggestion");
    setGeneratedOutput("");
  };

  const handleSubjectSubmit = async (subj: string) => {
    setSubject(subj);
    try {
      setIsLoading(true);
      setLoadingText("Generating suggestions...");
      const res = await fetch(
        "http://localhost:5000/api/generate-suggestions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject: subj, category: category }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error || "Unknown error");
        return;
      }
      setSuggestions(data.suggestions);
      setIsLoading(false);
      setStep("suggestion");
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleSuggestionSelect = async (suggestion: string[]) => {
    try {
      setIsLoading(true);
      setLoadingText("Generating Prompt...");
      const res = await fetch("http://localhost:5000/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          keywords: suggestion.join(", "),
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.prompt) {
        console.error(
          "Error:",
          data.error || "Failed to generate final prompt"
        );
        return;
      }

      setSelectedPrompt(data.prompt); // Final AI-ready prompt
      if (category === "Image Generation") {
        setLoadingText("Injecting prompt to image generator...");
        handleImageGeneration(data.prompt);
      } else {
        setLoadingText("Injecting prompt to text generator...");
        handleTextGeneration(data.prompt);
      }

      setStep("result");
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleImageGeneration = async (selectedPrompt: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selectedPrompt }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error:", errorData.error || "Failed to generate image");
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedOutput(imageUrl);
      setLoadingText("Image generated!");
      setIsLoading(false);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleTextGeneration = async (selectedPrompt: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selectedPrompt}),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Server error:", data.error || "Unknown error");
        return;
      }

      setGeneratedOutput(data.text);
      setLoadingText("Text generated!");
      setIsLoading(false);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const restartFlow = () => {
    setStep("category");
    setCategory(null);
    setSubject("");
    setSuggestions([]);
    setSelectedPrompt("");
    setGeneratedOutput("");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Loader loading={isLoading} text={loadingText} />
      {step === "category" && (
        <CategorySelector onSelectCategory={handleCategorySelect} />
      )}

      {step === "form" && category && (
        <SubjectInputForm
          initialSubject=""
          onBack={() => setStep("category")}
          onSubmit={handleSubjectSubmit}
          category={category}
        />
      )}

      {step === "suggestion" && (
        <SuggestionSelector
          subject={subject}
          suggestions={suggestions}
          onBack={() => setStep("form")}
          onSelect={handleSuggestionSelect}
        />
      )}

      {step === "result" && category && (
        <PromptResult
          prompt={selectedPrompt}
          result={generatedOutput}
          category={category}
          onRegenerate={() => setStep("suggestion")}
          onBack={handleBack}
          onStartOver={restartFlow}
        />
      )}
    </div>
  );
}

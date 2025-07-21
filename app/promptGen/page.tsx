"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PromptBuilder from "@/components/promptBuilder";
import { response } from "@/data/sample-responses";
import HomeButton from "@/components/homeButton";

const showcaseExamples = [
  {
    type: "writing",
    prompt: "A sci-fi story about time travel and friendship.",
    result: response["writing"],
  },
  {
    type: "image",
    prompt: "A futuristic city skyline at sunset, cyberpunk theme.",
    result: response["image"],
  },
];

export default function HomePage() {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-12">
      {!showBuilder ? (
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-5">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Prompt Showcase
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              A sneak peek into what PromptSmith can do — from moody art prompts
              to short stories that might confuse your English teacher (in a
              good way).
            </p>
            <Button
              onClick={() => setShowBuilder(true)}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-400/40 transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              ✍️ Create Your Own Prompt
            </Button>
          </div>

          {/* Prompt Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {showcaseExamples.map((example, index) => (
              <Card
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-500 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="capitalize text-xl text-white">
                    {example.type} Prompt
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    <span className="font-medium text-slate-200">Prompt:</span>{" "}
                    {example.prompt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300 font-semibold mb-1">
                    Result:
                  </p>
                  <p className="whitespace-pre-wrap text-slate-100 leading-relaxed text-sm">
                    {example.result}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <PromptBuilder />
      )}
    </div>
  );
}

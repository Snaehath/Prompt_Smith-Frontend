import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const prompts = [
  "Describe a sunset over a quiet lake.",
  "Write a poem about lost time.",
  "Imagine a world where dreams shape reality.",
];

const handlePoemGeneration = async (prompt: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/generate-poem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    if (!res.ok || !data.poem) {
      console.error("Error:", data.error || "Failed to generate poem");
      return;
    }

    return data.poem;
  } catch (err) {
    console.error("Network error:", err);
  }
};

const PoeticShow: React.FC = () => {
  const [poems, setPoems] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const handleGenerate = async (index: number, prompt: string) => {
    setLoading((prev) => ({ ...prev, [index]: true }));
    const poem = await handlePoemGeneration(prompt);
    setPoems((prev) => ({ ...prev, [index]: poem || "No poem generated." }));
    setLoading((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">📝 Poetic Show</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between h-full bg-white shadow-md"
          >
            <CardHeader>
              <CardTitle>Prompt #{index + 1}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">{prompt}</p>

              {poems[index] && (
                <div className="mt-4 whitespace-pre-wrap text-sm text-foreground">
                  <div>{poems[index]}</div>
                  <p className="mt-2 text-right italic text-muted-foreground">
                    — author: Gemini
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleGenerate(index, prompt)}
                disabled={loading[index]}
              >
                {loading[index] ? "Generating..." : "Generate Poem"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PoeticShow;

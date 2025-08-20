import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { promptExamples, promptExamplesText } from "@/data/promptData";
import Image from "next/image";

const PromptStudio: React.FC = () => {
  const [imageMap, setImageMap] = useState<{ [prompt: string]: string }>({});

  const handleImageGeneration = async (prompt: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error:", errorData.error || "Failed to generate image");
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageMap((prev) => ({ ...prev, [prompt]: imageUrl }));
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className=" min-h-screen">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Image Generation Prompt</h2>
        {promptExamples.map((example) => (
          <Card key={example.level} className="mb-6">
            <CardHeader>
              <CardTitle>
                Level {example.level}: {example.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Description:</strong> {example.description}
              </p>
              <p className="mb-2">
                <strong>Prompt:</strong> {example.prompt}
                {!imageMap[example.prompt] && (
                  <button
                    onClick={() => handleImageGeneration(example.prompt)}
                    className="text-blue-600 hover:underline mb-2"
                  >
                    Generate Image
                  </button>
                )}
              </p>

              <ul className="list-disc list-inside space-y-1">
                {example.breakdown.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {imageMap[example.prompt] && (
                <div className="flex justify-end">
                  <Image
                    src={imageMap[example.prompt]}
                    alt={`Generated for level ${example.level}`}
                    width={512}
                    height={512}
                    className="rounded border"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-2xl font-bold mb-6">Text Generation Prompt</h2>
        {promptExamplesText.map((example) => (
          <Card key={example.level} className="mb-6">
            <CardHeader>
              <CardTitle>
                Level {example.level}: {example.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Description:</strong> {example.description}
              </p>
              <p className="mb-2">
                <strong>Prompt:</strong> {example.prompt}
              </p>
              <ul className="list-disc list-inside space-y-1">
                {example.breakdown.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default PromptStudio;

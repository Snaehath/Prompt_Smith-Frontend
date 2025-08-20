"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Wand2,
  Palette,
  Monitor,
  Sparkles,
  X,
  Image as ImageIcon,
  Download,
  Trash,
  Trash2,
  Brain,
} from "lucide-react";
import { CATEGORIES, RESOLUTIONS, SAMPLE_PROMPTS, STYLES } from "@/constants";
import { PromptWork } from "@/types";

interface wallpaperProps {
  handleBackgroundImage: (url: string) => void;
  hide: boolean;
}

const WallpaperGenerator: React.FC<wallpaperProps> = ({
  handleBackgroundImage,
  hide,
}) => {
  const [prompt, setPrompt] = useState("");
  const [artworks, setArtworks] = useState<PromptWork[]>([]);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const selectSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  const toArtwork = (p: PromptWork, id: number): PromptWork => ({
    id,
    title: p.title,
    artist: p.artist,
    description: p.description,
    prompt: p.prompt,
    style: p.style,
    year: p.year,
    imageUrl: p.imageUrl ?? "",
  });

  const handleImageGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    console.log(selectedResolution);

    try {
      const res = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, resulution: selectedResolution }),
      });

      if (!res.ok) {
        console.error("Error:", await res.text());
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
      setArtworks((prev) => {
        return prev.map((art) =>
          art.prompt === prompt ? { ...art, imageUrl } : art
        );
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {};

  const handlePromptGeneration = async () => {
    try {
      let extraPrompt = "";

      if (negativePrompt.trim()) {
        extraPrompt += `, avoid: ${negativePrompt.trim()}`;
      }
      const res = await fetch("http://localhost:5000/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraPrompt,
          style: selectedStyle,
          subject: selectedSubject,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.prompt) {
        console.error("Error:", data.error || "Failed to generate prompt");
        return;
      }

      setArtworks((prev) => {
        const nextId = prev.length + 1;
        return [...prev, toArtwork(data, nextId)];
      });
      setPrompt(data.prompt);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleManualPrompt = async () => {
    setPrompt(prompt);
    try {
      let extraPrompt = "";

      if (negativePrompt.trim()) {
        extraPrompt += `, avoid: ${negativePrompt.trim()}`;
      }
      const res = await fetch("http://localhost:5000/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, extraPrompt }),
      });
      const data = await res.json();

      if (!res.ok || !data.prompt) {
        console.error("Error:", data.error || "Failed to generate prompt");
        return;
      }
      setPrompt(data.prompt);
      setArtworks((prev) => {
        const nextId = prev.length + 1;
        return [...prev, toArtwork(data, nextId)];
      });
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className={`grid lg:grid-cols-2 gap-8 ${hide ? "opacity-0" : ""}`}>
      {/* Generator Controls */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Create Your Wallpaper
              <Button
                variant="outline"
                size="sm"
                disabled={isGenerating}
                onClick={handlePromptGeneration}
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? "Generating..." : "Create a Prompt"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe your wallpaper</Label>
              <Button
                size="sm"
                variant="outline"
                className="text-xs w-2 h-4 rounded-full ml-6"
                onClick={handleManualPrompt}
              >
                AI
              </Button>

              <Textarea
                id="prompt"
                placeholder="A serene mountain landscape at sunset with purple and orange clouds..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Negative Prompt Input */}
            <div className="space-y-2">
              <Label
                htmlFor="negative-prompt"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4 text-red-500" />
                What to avoid (optional)
              </Label>
              <Textarea
                id="negative-prompt"
                placeholder="blurry, low quality, text, watermarks, people, faces..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-slate-500">
                Specify elements you don't want in your wallpaper
              </p>
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Art Style
              </Label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <Badge
                    key={style}
                    variant={selectedStyle === style ? "default" : "outline"}
                    className="cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() =>
                      setSelectedStyle(selectedStyle === style ? "" : style)
                    }
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Subject
              </Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((Subject) => (
                  <Badge
                    key={Subject}
                    variant={
                      selectedSubject === Subject ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() =>
                      setSelectedSubject(
                        selectedSubject === Subject ? "" : Subject
                      )
                    }
                  >
                    {Subject}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resolution Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Resolution
              </Label>
              <Select
                value={selectedResolution}
                onValueChange={setSelectedResolution}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {RESOLUTIONS.map((res) => (
                    <SelectItem key={res.value} value={res.value}>
                      {res.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleImageGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-black"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Wallpaper
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Prompts */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Try These Prompts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SAMPLE_PROMPTS.slice(0, 4).map((samplePrompt, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors border border-slate-200 hover:border-purple-200"
                  onClick={() => selectSamplePrompt(samplePrompt)}
                >
                  <p className="text-sm text-slate-700 line-clamp-2">
                    {samplePrompt}
                  </p>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => {
                  const randomPrompt =
                    SAMPLE_PROMPTS[
                      Math.floor(Math.random() * SAMPLE_PROMPTS.length)
                    ];
                  selectSamplePrompt(randomPrompt);
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Random Prompt
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={handlePromptGeneration}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Create New Prompts
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Preview Area */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-600">Creating your wallpaper...</p>
                <p className="text-sm text-slate-500">
                  This may take a few moments
                </p>
              </div>
            ) : generatedImage ? (
              <div className="relative group">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated wallpaper"
                  className="w-full h-64 sm:h-80 object-cover rounded-lg border border-slate-200"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-slate-100"
                  >
                    <Download className="w-4 h-4" />
                    <a href={generatedImage} download="wallpaper.png">
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600">
                  Your generated wallpaper will appear here
                </p>
                <p className="text-sm text-slate-500">
                  Enter a prompt and click generate to get started
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Generated Prompts Gallery */}
        {artworks.length > 0 && (
          <Card>
            <CardHeader className="flex">
              <CardTitle className="text-lg">Generated Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {artworks.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center gap-3 p-2 border rounded-lg"
                >
                  <img
                    src={art.imageUrl || "/placeholder.svg"}
                    alt={art.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{art.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {art.prompt}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={true}
                    onClick={() => handleBackgroundImage(art.imageUrl ?? "")}
                  >
                    <ImageIcon className="w-4 h-4 mr-1" /> Set BG
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WallpaperGenerator;

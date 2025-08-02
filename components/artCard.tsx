import { Artwork } from "@/types";
import { useState } from "react";
import { Check, Copy, Lightbulb, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArtworkProps {
  artwork: Artwork;
  handleImageGeneration: (prompt: string) => Promise<void>;
}

const ArtCard: React.FC<ArtworkProps> = ({ artwork, handleImageGeneration }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(artwork.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageGen = async (prompt: string) => {
    setIsLoading(true);
    await handleImageGeneration(prompt);
    setIsLoading(false);
  };

  if (!artwork) {
    return (
      <Card className="w-[600px] h-[720px] flex items-center justify-center">
        <CardContent>
          <p className="text-gray-400 text-sm animate-pulse">
            Loading prompt...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[600px] h-[720px] flex flex-col overflow-hidden transition-shadow hover:shadow-gray-600/20 border-gray-500/30 border-4">
      <div className="flex-1 bg-black relative flex items-center justify-center p-3 h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-10">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm text-gray-300">Generating Masterpiece...</p>
          </div>
        )}

        {artwork.imageUrl && !isLoading ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        ) : !isLoading ? (
          <p className="text-sm font-mono text-gray-400 text-center leading-relaxed select-none">
            {artwork.prompt}
          </p>
        ) : null}
      </div>

      <CardHeader className="py-2 px-4">
        <CardTitle className="text-lg">{artwork.title}</CardTitle>
        <CardDescription className="text-sm text-gray-400">
          {artwork.artist}, {artwork.year}
        </CardDescription>
        <p className="text-xs italic text-gray-500">{artwork.style}</p>
      </CardHeader>

      <CardFooter className="px-4 pb-4 mt-auto flex space-x-2">
        <Button
          onClick={() => handleImageGen(artwork.prompt)}
          disabled={isLoading}
          className="flex-1"
          variant="default"
        >
          {artwork.imageUrl ? (
            <>
              <RefreshCcw size={16} className="mr-2" />
              ReGenerate
            </>
          ) : (
            <>
              <Lightbulb size={16} className="mr-2" />
              Generate
            </>
          )}
        </Button>

        <Button
          onClick={handleCopyPrompt}
          variant="secondary"
          className="flex items-center border-gray-500/30 border-2"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtCard;

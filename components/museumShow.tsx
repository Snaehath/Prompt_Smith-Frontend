import { Artwork } from "@/types";
import ArtCard from "./artCard";
import { Button } from "./ui/button";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface MuseumShowProps {
  artPrompts: Artwork[];
  handleImageGeneration: (prompt: string) => Promise<void>;
}

const MuseumShow: React.FC<MuseumShowProps> = ({ artPrompts, handleImageGeneration }) => {
  const [offset, setOffset] = useState(0);
  const[hide, setHide] = useState(false);
  const itemsPerPage = 1;

  const prompts = artPrompts.slice(offset, offset + itemsPerPage);

  const handleNext = () => {
    if (offset + itemsPerPage < artPrompts.length) {
      setOffset(offset + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - itemsPerPage);
    }
  };
  return (
    <div className="min-h-screen text-gray-100 flex flex-col">
      {/* Header */}
      <header
        role="banner"
        className="text-center relative top-0 backdrop-blur-sm z-30 border-b border-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight p-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 ">
              Gallery of Prompts <Button variant={"secondary"} onClick={() => setHide(!hide)}>{hide?<EyeClosed />:<Eye />}</Button>
            </span>
          </h1>
        </div>
      </header>

      {/* Content Grid */}
      {!hide && <main
        role="main"
        className="flex-1 p-6 overflow-y-auto flex justify-center items-start"
      >
        <Button onClick={handlePrev} disabled={offset === 0} className=" mr-2 my-auto">prev</Button>
        <div className="flex justify-center items-center">
          {Array.from({ length: 1 }).map((_, i) => (
            <ArtCard key={i} artwork={prompts[i] || null} handleImageGeneration={handleImageGeneration}/>
          ))}
        </div>
        <Button onClick={handleNext} disabled={offset + itemsPerPage >= artPrompts.length} className=" ml-2 my-auto">next</Button>
      </main>}

      {/* Footer */}
      <footer
        role="contentinfo"
        className="text-center py-6 border-t border-gray-800"
      >
        <p className="text-gray-300 text-sm">Powered by Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default MuseumShow;

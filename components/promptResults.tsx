"use client";

import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CopyIcon,
  RefreshCcwIcon,
  HomeIcon,
  ArrowLeftIcon,
  Download,
  Fullscreen,
  Cross,
} from "lucide-react";
import { PromptResultProps } from "@/types";
import ReactMarkDown from "react-markdown";

const PromptResult: React.FC<PromptResultProps> = ({
  prompt,
  result,
  category,
  onRegenerate,
  onStartOver,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const currentContent = getPageByParagraphs(result, currentPage);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function getPageByParagraphs(fullText: string, page: number) {
    const paragraphs = fullText.split(/\n\s*\n/); // split by double (or more) line breaks
    const CHUNKS_PER_PAGE = 2;
    const start = page * CHUNKS_PER_PAGE;
    const end = start + CHUNKS_PER_PAGE;
    const selectedParagraphs = paragraphs.slice(start, end);
    return selectedParagraphs.join("\n\n"); // join back for markdown rendering
  }

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative pt-10">
      {/* Fullscreen Mode */}
      {isFullScreen && (
        <>
          {/* Close Button */}
          <Button
            variant="ghost"
            className="fixed top-5 right-5 z-50 hover:bg-slate-500 hover:border-slate-300"
            onClick={handleFullScreen}
          >
            <Cross className="transform rotate-45" />
          </Button>

          {/* Fullscreen Image */}
          <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-gray-200 bg-opacity-90 flex items-center justify-center">
            <img
              src={result}
              alt="Generated"
              className="max-w-full h-[95%] object-contain"
            />
          </div>
        </>
      )}

      <div className="w-full max-w-4xl flex flex-col items-center relative bottom-20">
        {result && (
          <Card className="w-[70%] bg-white text-slate-900 border border-slate-300 shadow-xl rounded-xl p-4">
            <CardContent className="p-0">
              {/* Render image or text based on category */}
              {category === "Image Generation" ? (
                <div
                  className={`flex flex-col items-center justify-center bg-slate-50 border border-slate-300 rounded-md p-2 shadow-inner ${
                    isFullScreen ? "hidden" : ""
                  }`}
                >
                  <img
                    src={result}
                    alt="Generated"
                    className="rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-300 rounded-md p-4 shadow-inner text-slate-800 whitespace-pre-wrap text-justify">
                  <ReactMarkDown>{currentContent}</ReactMarkDown>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center p-2 gap-3">
                {category === "Image Generation" && (
                  <a
                    href={result}
                    download="ai-generated-image.jpg"
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </a>
                )}
                {category === "Text Generation" && (
                  <>
                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentPage === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() =>
                        (currentPage + 1) * 2 <
                          result.split(/\n\s*\n/).length &&
                        setCurrentPage((p) => p + 1)
                      }
                    >
                      Next
                    </Button>
                  </>
                )}
                {/* Prompt Sheet */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-slate-300"
                    >
                      Show Prompt
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-full overflow-y-auto sm:w-[400px]"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold">
                        Creative Prompt
                      </SheetTitle>
                    </SheetHeader>

                    <div className="bg-slate-100 mt-4 rounded-md p-4 shadow-inner overflow-auto">
                      <span className="whitespace-pre-wrap leading-relaxed text-base text-slate-800 text-justify">
                        <ReactMarkDown>{prompt}</ReactMarkDown>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button
                        onClick={handleCopy}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <CopyIcon className="w-4 h-4 mr-2" />
                        {copied ? "Copied!" : "Copy Prompt"}
                      </Button>
                      <Button
                        onClick={onRegenerate}
                        variant="outline"
                        className="w-full"
                      >
                        <RefreshCcwIcon className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                {category === "Image Generation" && (
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto"
                    onClick={handleFullScreen}
                  >
                    <Fullscreen />
                  </Button>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 text-center">
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="w-full sm:w-auto text-slate-700 hover:text-indigo-600"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back (choose different direction)
                </Button>
                <Button
                  onClick={onStartOver}
                  variant="ghost"
                  className="w-full sm:w-auto text-indigo-600 hover:text-indigo-800"
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PromptResult;

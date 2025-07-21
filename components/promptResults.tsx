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
} from "lucide-react";
import { PromptResultProps } from "@/types";
import ReactMarkDown from "react-markdown";

const PromptResult: React.FC<PromptResultProps> = ({
  prompt,
  image,
  onRegenerate,
  onStartOver,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center ">
        {/* Image Display Card */}
        {image && (
          <Card className="w-full bg-white text-slate-900 border border-slate-300 shadow-xl rounded-xl p-4">
            <CardContent className="">
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-300 rounded-md p-2 shadow-inner">
                <img
                  src={image}
                  alt="Generated"
                  className="rounded-lg object-contain w-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center p-2 gap-3">
                <a
                  href={image}
                  download="ai-generated-image.jpg"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                </a>
                {/* Sheet Trigger + Prompt */}
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

                    <div className=" bg-slate-100 mt-4 rounded-md p-4 shadow-inner overflow-auto">
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
              </div>

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

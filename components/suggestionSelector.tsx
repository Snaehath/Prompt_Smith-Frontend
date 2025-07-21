"use client";

import { SuggestionSelectorProps } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const SuggestionSelector: React.FC<SuggestionSelectorProps> = ({
  suggestions,
  onSelect,
  onBack,
  subject,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-white text-slate-900 border border-slate-300 shadow-xl hover:shadow-2xl transition-shadow rounded-xl">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Choose a Creative Direction
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            Suggestions for{" "}
            <span className="text-indigo-600 font-semibold">"{subject}"</span>.
            Pick one to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => onSelect(suggestion)}
                className="w-full h-auto py-4 px-5 flex justify-between items-center border-slate-300 hover:border-indigo-500 rounded-xl text-left bg-slate-100 hover:bg-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-wrap gap-2 max-w-[85%]">
                  {suggestion.map((word, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-slate-200 text-indigo-700 text-sm sm:text-base group-hover:bg-indigo-100 group-hover:text-indigo-900 transition-all"
                    >
                      {word.replace("*","")}
                    </Badge>
                  ))}
                </div>
                <ArrowRightIcon className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform duration-150" />
              </Button>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="bg-white border border-slate-300 hover:bg-slate-100"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionSelector;

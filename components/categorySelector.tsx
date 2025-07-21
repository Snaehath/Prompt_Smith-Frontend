'use client';

import { PromptCategory } from "@/types";
import { Anvil, Hammer, ImageIcon, PencilIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CategorySelectorProps {
  onSelectCategory: (category: PromptCategory) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden bg-white dark:bg-slate-950">
      {/* Outer Card-style Container */}
      <div className="w-full max-w-4xl border border-slate-300 dark:border-slate-700 rounded-xl p-8 shadow-lg bg-white dark:bg-slate-900 transition-colors duration-300">
        {/* Header */}
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 text-3xl font-extrabold tracking-tight text-black dark:text-white">
            <div className="relative w-8 h-8">
              <Anvil className="absolute bottom-0 left-0 w-6 h-6 text-slate-400" />
              <Hammer className="absolute -top-2 -left-2 w-6 h-6 animate-bounce text-indigo-400" />
            </div>
            <span>PromptSmith</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-base mt-3 px-2">
            A fast, flexible tool to help you craft high-quality prompts for AI
            tools like ChatGPT, Midjourney, and more.
          </p>

          <h2 className="text-xl font-medium text-black dark:text-white mt-4">
            Choose your prompt style — epic tales or pixel-perfect images:
          </h2>
        </header>

        {/* Prompt Type Cards */}
        <main className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-4">
          {/* Image Prompt Card */}
          <Card
            onClick={() => onSelectCategory(PromptCategory.IMAGE)}
            className="cursor-pointer rounded-xl border border-sky-700/40 bg-slate-800 hover:bg-sky-900/30 transition-all duration-300 shadow-md hover:shadow-sky-800/40 transform hover:scale-[1.03] group focus:outline-none focus:ring-2 focus:ring-sky-500 active:scale-95"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <ImageIcon className="w-12 h-12 text-sky-400 group-hover:text-sky-500 mb-4 transition-colors" />
              <CardTitle className="text-lg font-semibold text-white group-hover:text-sky-500">
                Image Generation
              </CardTitle>
              <CardDescription className="text-slate-400 group-hover:text-black text-sm mt-1 transition-colors 600">
                From “cyberpunk ninja penguins” to “haunted vaporwave castles.”
              </CardDescription>
            </CardContent>
          </Card>

          {/* Text Prompt Card */}
          <Card
            onClick={() => onSelectCategory(PromptCategory.TEXT)}
            className="cursor-pointer rounded-xl border border-emerald-700/40 bg-slate-800 hover:bg-emerald-900/30 transition-all duration-300 shadow-md hover:shadow-emerald-800/40 transform hover:scale-[1.03] group focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <PencilIcon className="w-12 h-12 text-emerald-400 group-hover:text-emerald-500 mb-4 transition-colors" />
              <CardTitle className="text-lg font-semibold text-white group-hover:text-emerald-500">
                Text Generation
              </CardTitle>
              <CardDescription className="text-slate-400 group-hover:text-black text-sm mt-1">
                Perfect for stories, lore dumps, or impressing your D&D group.
              </CardDescription>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CategorySelector;

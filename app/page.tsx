"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 sm:px-20 py-10 bg-white dark:bg-slate-950 transition-colors duration-300">
      <main className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-left max-w-2xl w-full">
        <Image
          className="dark:invert transition-transform duration-200 hover:scale-105"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white">
          Welcome to <span className="text-primary">PromptSmith</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          Create powerful, structured prompts for writing, code, image
          generation, and more — instantly.
        </p>

        <Button asChild size="lg" className="shadow-md hover:shadow-lg">
          <Link href="/promptGen/">🚀 Generate Your First Prompt</Link>
        </Button>
      </main>

      {/* ✨ New Quote + Humor Section */}
      <section className="max-w-2xl mt-16 text-center flex flex-col gap-6">
        <blockquote className="text-xl italic font-medium text-gray-700 dark:text-gray-300">
          "Give a human a keyboard, they'll write a prompt. Give them
          PromptSmith, they'll write a masterpiece… or at least avoid asking
          ChatGPT generate a image of apple."
        </blockquote>

        <p className="text-base text-muted-foreground leading-relaxed">
          PromptSmith takes the pain out of prompt writing. No more guessing
          what to type — we help you sound smart, creative, and occasionally
          like you've read a book or two. Whether you're crafting epic fantasy
          sagas or trying to get an AI to generate a photo of a frog riding a
          skateboard through space, we've got you covered. Stories or visuals —
          your imagination, supercharged.
        </p>
      </section>

      <Separator className="my-10 w-full max-w-2xl" />

      <footer className="flex gap-4 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a
          className="flex items-center gap-2 hover:underline hover:text-primary"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Built with Next.js
        </a>
      </footer>
    </div>
  );
}

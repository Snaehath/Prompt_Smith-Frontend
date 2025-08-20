"use client";

import { Button } from "@/components/ui/button";

interface HomePageProps {
  onNavigate: (tab: "generator" | "studio") => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-12">
      {/* Hero */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to promptSmith
        </h1>
        <p className="text-slate-600">
          Learn AI prompting and create stunning wallpapers in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => onNavigate("generator")}>
            Start Creating
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("studio")}
          >
            Learn Prompting
          </Button>
        </div>
      </header>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Features</h2>
        <ul className="space-y-2 text-slate-700 list-disc list-inside">
          <li>Instantly generate wallpapers with AI.</li>
          <li>Learn proven prompting techniques.</li>
          <li>Experiment with different artistic styles.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">How It Works</h2>
        <ol className="space-y-2 text-slate-700 list-decimal list-inside">
          <li>Learn prompting basics in the Prompt Studio.</li>
          <li>Craft your prompt and choose your style.</li>
          <li>Generate and download your wallpaper.</li>
        </ol>
      </section>

      {/* CTA */}
      <section className="text-center space-y-3 border p-6 rounded-md">
        <h2 className="text-lg font-semibold text-slate-900">
          Ready to get started?
        </h2>
        <Button size="lg" onClick={() => onNavigate("generator")}>
          Start Your First Generation
        </Button>
      </section>
    </div>
  );
}

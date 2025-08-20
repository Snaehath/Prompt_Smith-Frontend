"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Menu, X, Home, Hammer } from "lucide-react";

interface NavigationProps {
  activeTab: "home" | "generator" | "studio";
  onTabChange: (tab: "home" | "generator" | "studio") => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onTabChange("home")}
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Hammer className="w-4 h-4 text-white /" />
            </div>
            <span className="font-serif font-bold text-xl text-slate-900">
              promptSmith
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              onClick={() => onTabChange("home")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={activeTab === "generator" ? "default" : "ghost"}
              onClick={() => onTabChange("generator")}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generator
            </Button>
            <Button
              variant={activeTab === "studio" ? "default" : "ghost"}
              onClick={() => onTabChange("studio")}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Prompt Studio
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-2">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => {
                  onTabChange("home");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button
                variant={activeTab === "generator" ? "default" : "ghost"}
                onClick={() => {
                  onTabChange("generator");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Sparkles className="w-4 h-4" />
                Generator
              </Button>
              <Button
                variant={activeTab === "studio" ? "default" : "ghost"}
                onClick={() => {
                  onTabChange("studio");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start"
              >
                <BookOpen className="w-4 h-4" />
                Prompt Studio
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

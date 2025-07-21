export enum PromptCategory {
  IMAGE = 'Image Generation',
  TEXT = 'Text Generation',
}

export interface SubjectInputFormProps {
  initialSubject: string;
  onSubmit: (subject: string) => void;
  onBack: () => void;
}
export interface SuggestionSelectorProps {
  suggestions: string[][];
  onSelect: (suggestion: string[]) => void;
  onBack: () => void;
  subject: string;
}

export interface PromptResultProps {
  prompt: string;
  image:string
  onRegenerate: () => void;
  onStartOver: () => void;
  onBack: () => void;
}

export type Step = 'category' | 'form' | 'suggestion' | 'result';
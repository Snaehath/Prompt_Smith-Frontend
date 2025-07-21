'use client';

import { useState, FormEvent } from 'react';
import { SubjectInputFormProps } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const SubjectInputForm: React.FC<SubjectInputFormProps> = ({
  initialSubject,
  onSubmit,
  onBack,
}) => {
  const [subject, setSubject] = useState<string>(initialSubject);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (subject.trim()) {
      onSubmit(subject.trim());
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center">
      <Card className="w-full max-w-xl border border-slate-300 bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What's your subject or theme?
          </CardTitle>
          <CardDescription className="text-slate-600 text-base">
            Think of this like your prompt’s elevator pitch.
            <br />
            For example: <em>"a futuristic city"</em>, <em>"a lonely lighthouse"</em>, or <em>"the concept of time"</em>.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
                Subject / Theme
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter something intriguing..."
                className="bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-full sm:w-auto"
              >
                ← Go Back
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={!subject.trim()}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Next: Show Me the Magic →
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default SubjectInputForm;

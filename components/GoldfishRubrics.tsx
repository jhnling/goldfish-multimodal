'use client';

import React, { useState, ChangeEvent } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus, Upload } from 'lucide-react';

interface FormData {
  image: File | null;
  prompt: string;
  rubrics: string[];
}

export const GoldfishRubrics = () => {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [rubrics, setRubrics] = useState<string[]>(['']);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddRubric = () => {
    setRubrics([...rubrics, '']);
  };

  const handleRemoveRubric = (index: number) => {
    const newRubrics = rubrics.filter((_, i) => i !== index);
    setRubrics(newRubrics);
  };

  const handleRubricChange = (index: number, value: string) => {
    const newRubrics = [...rubrics];
    newRubrics[index] = value;
    setRubrics(newRubrics);
  };

  const handleSubmit = async () => {
    const formData: FormData = {
      image,
      prompt,
      rubrics: rubrics.filter(r => r.trim() !== '')
    };
    console.log('Submitting:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Goldfish Multimodal Rubrics
        </h1>
        
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Instructions</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Upload an image and write a prompt. Then, create rubric criteria to evaluate responses.
              Each rubric should start with "The response must..." Add or remove criteria as needed.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center space-y-2 cursor-pointer"
                >
                  <div className="h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <Upload className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Upload Image</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Section */}
          <Card>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-24"
              />
            </CardContent>
          </Card>

          {/* Rubrics Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Rubric Criteria</h3>
                <Button onClick={handleAddRubric} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Criterion
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rubrics.map((rubric, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={rubric}
                      onChange={(e) => handleRubricChange(index, e.target.value)}
                      placeholder="The response must..."
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleRemoveRubric(index)}
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="px-8"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
"use client";

import Link from "next/link";
import { numKeys, type Numeric } from "node_modules/zod/v4/core/util.cjs";
import { useState } from "react";
import { Button } from "~/components/ui/button";

interface predictions{
  class : string;
  confidence: number;
}

interface LayerData {
  shape: number[];
  values: number[][];
}

interface VisualizationData {
  [layerName: string]: LayerData;
}

interface WaveformDta {
  values : number[];
  sample_rate : number;
  duration: number;
}

interface ApiResponse {
  predictions: predictions[];
  visualization : VisualizationData;
  input_spectogram : LayerData;
  waveform: WaveformDta;
}
export default function HomePage() {
  const [vizData, setVizData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] =  useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name)
    setIsLoading(true)
    setError(null);
    setVizData(null);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        ),
      );
    }
  };
  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="mx-auto mx-w-[60%]">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight text-stone-900">
            CNN Audio Visualizer
          </h1>
          <p className="mb-8 text-lg text-stone-600">
            Upload a WAV file to see the model's predictions and feature Maps
          </p>

          <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <input 
                type="file"
                accept=".wav"
                id="file-upload"
                disabled= {isLoading}
                className="absolute inset-0 w-full cursor-pointer opacity-10" 
              />
              <Button 
                disabled={isLoading}
                className = "border-stone-300" 
                variant = "outline" 
                size = "lg"
              >
                {isLoading ? "Analysing..." : "Choose File"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

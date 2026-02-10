"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { BorderBeam } from "@/components/ui/border-beam";

// SVG Icons
const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80943 14.7185 1.3877 15.78 1.3877C16.8415 1.3877 17.8594 1.80943 18.61 2.56C19.3606 3.31057 19.7823 4.32853 19.7823 5.39C19.7823 6.45147 19.3606 7.46943 18.61 8.22L9.41 17.41C9.03472 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4643 6.20472 14.9553 6.58 14.58L15.07 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <rect x="6" y="6" width="12" height="12" rx="1" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PromptArea = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInput("");
        setFiles([]);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          What thumbnail do you want to create?
        </h1>
        <p className="text-gray-400 text-lg">
          Describe your idea and AI will generate it for you
        </p>
      </div>

      {/* Prompt Input */}
      <PromptInput
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl"
      >
        <BorderBeam duration={6} size={200} borderWidth={1.5} />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-white/10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300"
              >
                <PaperclipIcon />
                <span className="max-w-[120px] truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="hover:bg-white/10 rounded-full p-1 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <PromptInputTextarea placeholder="Describe your thumbnail idea..." />

        <PromptInputActions className="flex items-center justify-between gap-2 pt-3">
          <PromptInputAction tooltip="Attach files">
            <label
              htmlFor="file-upload"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <input
                ref={uploadInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <PaperclipIcon />
            </label>
          </PromptInputAction>

          <PromptInputAction
            tooltip={isLoading ? "Stop generation" : "Send message"}
          >
            <Button
              size="icon"
              className="h-9 w-9 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={handleSubmit}
            >
              {isLoading ? <StopIcon /> : <ArrowUpIcon />}
            </Button>
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
};

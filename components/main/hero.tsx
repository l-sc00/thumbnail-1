"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// SVG Arrow Icon Component
const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
  >
    <path
      d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33333M12.6667 8L8.00001 12.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PremiumHero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const { user } = useAuth();

  const aiTitles = ["stunning", "professional", "viral", "engaging", "creative"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % aiTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative flex h-screen w-full items-center justify-center px-6 text-center">
        <div className="container mx-auto flex flex-col items-center gap-12 text-center">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
            <span className="text-white">Create</span>
            <span className="relative flex w-full justify-center overflow-hidden md:pb-4 md:pt-1">
              &nbsp;
              {aiTitles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold text-white dark:text-gray-300"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
            <span className="text-white">thumbnails with thumbAI</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-300 max-w-2xl text-center">
            전문가 수준의 썸네일을 간편하게 만들어보세요.
          </p>

          <Link href={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="gap-4 bg-black hover:bg-gray-900 text-white font-semibold text-lg px-8 py-6">
              {user ? "Dashboard" : "무료로 시작하기"} <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

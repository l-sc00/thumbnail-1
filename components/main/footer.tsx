"use client";

import Link from "next/link";
import Image from "next/image";

// Social Media Icons
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Main Footer Box */}
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Logo & Social */}
            <div className="space-y-6">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit"
              >
                <Image
                  src="/thumb.png"
                  alt="thumbAI Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9"
                />
                <span className="text-2xl font-bold text-white">thumbAI</span>
              </Link>

              <p className="text-gray-400 text-sm max-w-md">
                AI 기반 YouTube 썸네일 생성 서비스.
                <br />
                몇 초 만에 전문적인 썸네일을 만들어보세요.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <XIcon />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <YouTubeIcon />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-pink-500 transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>

            {/* Right Side - Links */}
            <div className="flex flex-col md:items-end justify-center">
              <nav className="flex flex-col gap-3">
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#features")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                >
                  Terms
                </Link>
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 thumbAI. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Powered by{" "}
              <span className="text-cyan-400 font-medium">Google Gemini AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

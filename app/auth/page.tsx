"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// Google Icon SVG
const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.1713 8.36791H17.5001V8.33333H10.0001V11.6667H14.7096C14.0225 13.6071 12.1763 15 10.0001 15C7.23882 15 5.00007 12.7613 5.00007 10C5.00007 7.23875 7.23882 5 10.0001 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1859 2.52167 12.1951 1.66667 10.0001 1.66667C5.39798 1.66667 1.66674 5.39792 1.66674 10C1.66674 14.6021 5.39798 18.3333 10.0001 18.3333C14.6022 18.3333 18.3334 14.6021 18.3334 10C18.3334 9.44125 18.2767 8.89583 18.1713 8.36791Z"
      fill="#FFC107"
    />
    <path
      d="M2.6275 6.12125L5.36542 8.12917C6.10625 6.29501 7.90042 5 10.0004 5C11.2754 5 12.435 5.48083 13.3179 6.26625L15.675 3.90917C14.1867 2.52167 12.1958 1.66667 10.0004 1.66667C6.79917 1.66667 4.02334 3.47375 2.6275 6.12125Z"
      fill="#FF3D00"
    />
    <path
      d="M10.0001 18.3333C12.1526 18.3333 14.1101 17.5096 15.5876 16.17L13.0084 13.9875C12.1434 14.6454 11.0859 15.0008 10.0001 15C7.83258 15 5.99216 13.6179 5.29883 11.6892L2.58091 13.7829C3.96049 16.4817 6.76133 18.3333 10.0001 18.3333Z"
      fill="#4CAF50"
    />
    <path
      d="M18.1713 8.36791H17.5001V8.33333H10.0001V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0084 13.9871L15.5876 16.1696C15.4042 16.3363 18.3334 14.1667 18.3334 10C18.3334 9.44125 18.2767 8.89583 18.1713 8.36791Z"
      fill="#1976D2"
    />
  </svg>
);

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
}

function createBeam(width: number, height: number, layer: number): Beam {
  const angle = -35 + Math.random() * 10;
  const baseSpeed = 0.2 + layer * 0.2;
  const baseOpacity = 0.08 + layer * 0.05;
  const baseWidth = 10 + layer * 5;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
  };
}

export default function AuthPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const LAYERS = 3;
  const BEAMS_PER_LAYER = 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseRef.current;
    if (!canvas || !noiseCanvas) return;
    const ctx = canvas.getContext("2d");
    const nCtx = noiseCanvas.getContext("2d");
    if (!ctx || !nCtx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      noiseCanvas.width = window.innerWidth * dpr;
      noiseCanvas.height = window.innerHeight * dpr;
      noiseCanvas.style.width = `${window.innerWidth}px`;
      noiseCanvas.style.height = `${window.innerHeight}px`;
      nCtx.setTransform(1, 0, 0, 1, 0, 0);
      nCtx.scale(dpr, dpr);

      beamsRef.current = [];
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(createBeam(window.innerWidth, window.innerHeight, layer));
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const generateNoise = () => {
      const imgData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.random() * 255;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 12;
      }
      nCtx.putImageData(imgData, 0, 0);
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4));
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `rgba(0,255,255,0)`);
      gradient.addColorStop(0.2, `rgba(0,255,255,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(0,255,255,${pulsingOpacity})`);
      gradient.addColorStop(0.8, `rgba(0,255,255,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(0,255,255,0)`);

      ctx.fillStyle = gradient;
      ctx.filter = `blur(${2 + beam.layer * 2}px)`;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#050505");
      gradient.addColorStop(1, "#111111");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5);
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -50) {
          beam.y = window.innerHeight + 50;
          beam.x = Math.random() * window.innerWidth;
        }
        drawBeam(beam);
      });

      generateNoise();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Animation */}
      <canvas ref={noiseRef} className="absolute inset-0 z-0 pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen w-full">
        {/* Left Panel - 3/5 */}
        <div className="hidden lg:flex w-3/5 relative flex-col justify-between p-12">
          {/* YouTube Video */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="w-full mx-auto">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
                <iframe
                  src="https://www.youtube.com/embed/cikiu0gBPJA"
                  title="thumbAI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Watch how thumbAI creates stunning thumbnails in seconds
              </p>
            </div>
          </div>

          {/* Social Links - Bottom */}
          <div className="relative z-10 flex items-center gap-6 pb-4">
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Panel - 2/5 */}
        <div className="w-full lg:w-2/5 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center justify-center gap-3 mb-10 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/thumb.png"
                alt="thumbAI Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-white">thumbAI</span>
            </Link>

            {/* Auth Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
                <p className="text-gray-400">
                  Sign in to create stunning thumbnails
                </p>
              </div>

              {/* Google Sign In Button */}
              <Button
                size="lg"
                className="w-full gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-base h-12"
                onClick={signInWithGoogle}
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                계속 진행하시면{" "}
                <Link
                  href="/terms"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  이용약관
                </Link>
                {" "}및{" "}
                <Link
                  href="/privacy"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  개인정보 보호정책
                </Link>
                에 동의하는 것으로 간주됩니다
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

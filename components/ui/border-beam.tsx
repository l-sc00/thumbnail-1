"use client"

import { useId } from "react"

interface BorderBeamProps {
  size?: number
  duration?: number
  color?: string
  borderWidth?: number
}

export const BorderBeam = ({
  size = 200,
  duration = 8,
  color = "#06b6d4",
  borderWidth = 1.5,
}: BorderBeamProps) => {
  const beamId = useId().replace(/:/g, "bb")

  return (
    <>
      <style>{`
        @keyframes ${beamId} {
          0% { offset-distance: 0% }
          100% { offset-distance: 100% }
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderColor: "transparent",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0) border-box",
          mask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0) border-box",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: size,
            aspectRatio: "1",
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `radial-gradient(circle, ${color} 0%, ${color}88 30%, transparent 70%)`,
            animation: `${beamId} ${duration}s linear infinite`,
            willChange: "offset-distance",
          }}
        />
      </div>
    </>
  )
}

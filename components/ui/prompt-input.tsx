"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// PromptInput Context
interface PromptInputContextType {
  value: string
  onValueChange: (value: string) => void
  isLoading: boolean
  onSubmit: () => void
}

const PromptInputContext = React.createContext<PromptInputContextType>({
  value: "",
  onValueChange: () => {},
  isLoading: false,
  onSubmit: () => {},
})

// PromptInput
interface PromptInputProps {
  value: string
  onValueChange: (value: string) => void
  isLoading?: boolean
  onSubmit: () => void
  children: React.ReactNode
  className?: string
}

export function PromptInput({
  value,
  onValueChange,
  isLoading = false,
  onSubmit,
  children,
  className,
}: PromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <PromptInputContext.Provider
      value={{ value, onValueChange, isLoading, onSubmit }}
    >
      <div
        className={cn(
          "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4",
          className
        )}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </PromptInputContext.Provider>
  )
}

// PromptInputTextarea
interface PromptInputTextareaProps {
  placeholder?: string
  className?: string
}

export function PromptInputTextarea({
  placeholder = "Type a message...",
  className,
}: PromptInputTextareaProps) {
  const { value, onValueChange } = React.useContext(PromptInputContext)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      className={cn(
        "w-full resize-none bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-base",
        className
      )}
    />
  )
}

// PromptInputActions
interface PromptInputActionsProps {
  children: React.ReactNode
  className?: string
}

export function PromptInputActions({
  children,
  className,
}: PromptInputActionsProps) {
  return <div className={cn("flex items-center", className)}>{children}</div>
}

// PromptInputAction
interface PromptInputActionProps {
  children: React.ReactNode
  tooltip?: string
  className?: string
}

export function PromptInputAction({
  children,
  tooltip,
  className,
}: PromptInputActionProps) {
  return (
    <div className={cn("relative group", className)} title={tooltip}>
      {children}
    </div>
  )
}

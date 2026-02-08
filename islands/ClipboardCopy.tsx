import { useEffect, useState } from "preact/hooks";

interface ClipboardCopyProps {
  text: string;
  displayText?: string;
  className?: string;
}

export default function ClipboardCopy(
  { text, displayText, className }: ClipboardCopyProps,
) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tooltipText, setTooltipText] = useState(text);

  const shouldBeVisible = (isHovering && !isCopied) || isCopied;
  const animationDuration = 200;

  useEffect(() => {
    if (shouldBeVisible) {
      setIsRendered(true);
      const enterTimer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(enterTimer);
    } else {
      // Animate out
      setIsAnimating(false);
      const exitTimer = setTimeout(
        () => setIsRendered(false),
        animationDuration,
      );
      return () => clearTimeout(exitTimer);
    }
  }, [shouldBeVisible]);

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTooltipText("Copied to clipboard!");
      setIsHovering(false);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div
      class={`relative inline-block cursor-pointer ${className || ""}`}
      onMouseEnter={() => {
        setIsHovering(true);
        setTooltipText(text);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCopy}
    >
      <span>{displayText || text}</span>

      {isRendered && (
        <div
          class={`absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-dark-surfaceContainerHighest text-dark-onSurface text-xs rounded-md shadow-lg whitespace-nowrap z-10 font-mono break-all transition-all ease-out ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDuration: `${animationDuration}ms` }}
        >
          {tooltipText}
          <div class="absolute left-4 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-dark-surfaceContainerHighest">
          </div>
        </div>
      )}
    </div>
  );
}

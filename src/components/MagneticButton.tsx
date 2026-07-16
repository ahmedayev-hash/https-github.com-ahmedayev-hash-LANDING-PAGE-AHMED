import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  as?: "button" | "a";
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  as = "button",
  className = "",
  id,
  onClick,
  href,
  target,
  rel,
  disabled = false,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const translationRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const isActive = (isHovered || isFocused) && !disabled;

  // Track prefers-reduced-motion and touch devices on mount
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (disabled || prefersReducedMotion || isTouchDevice || !isActive) {
      if (translationRef.current) {
        translationRef.current.style.transform = "translate3d(0px, 0px, 0px)";
      }
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let vx = 0;
    let vy = 0;
    let isMouseInWindow = false;
    let rafId: number | null = null;

    // Dampened spring constants for smooth settling and no bouncing
    const stiffness = 0.12;
    const damping = 0.6;
    const threshold = 100; // Activation distance (px)
    const maxMove = 8; // Max movement in px

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseInWindow = true;
    };

    const handleMouseLeaveWindow = () => {
      isMouseInWindow = false;
    };

    const updatePosition = () => {
      if (!containerRef.current || !translationRef.current) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }

      let targetX = 0;
      let targetY = 0;

      if (isMouseInWindow) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold) {
          // Linear transition from 1 (center) to 0 (at threshold)
          const pullStrength = 1 - dist / threshold;
          
          // Move proportionally towards cursor, capped at maxMove
          targetX = dx * 0.08 * pullStrength;
          targetY = dy * 0.08 * pullStrength;

          // Cap the translation to ±maxMove
          targetX = Math.max(-maxMove, Math.min(maxMove, targetX));
          targetY = Math.max(-maxMove, Math.min(maxMove, targetY));
        }
      }

      // Spring physics equation: ax = (target - current) * stiffness
      const ax = (targetX - currentX) * stiffness;
      const ay = (targetY - currentY) * stiffness;

      // Update velocities with damping
      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;

      // Update positions
      currentX += vx;
      currentY += vy;

      // Apply GPU-accelerated transformation only
      translationRef.current.style.transform = `translate3d(${currentX.toFixed(3)}px, ${currentY.toFixed(3)}px, 0px)`;

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [disabled, prefersReducedMotion, isTouchDevice, isActive]);

  // Combined transition styles for high performance
  const innerStyle: React.CSSProperties = {
    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
    transform: isActive ? "scale(1.03)" : "scale(1)",
    filter: isActive ? "brightness(1.05)" : "brightness(1)",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const Element = as;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="inline-block"
      style={{ touchAction: "manipulation" }}
    >
      <div ref={translationRef} className="will-change-transform">
        <Element
          id={id}
          className={`${className} select-none outline-none focus-visible:ring-2 focus-visible:ring-[#EC6519] focus-visible:ring-offset-2`}
          style={innerStyle}
          onClick={onClick}
          href={href}
          target={target}
          rel={rel}
          disabled={as === "button" ? disabled : undefined}
          {...props}
        >
          {children}
        </Element>
      </div>
    </div>
  );
}

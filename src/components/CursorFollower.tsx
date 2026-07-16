import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorFollower() {
  const [isTabActive, setIsTabActive] = useState(true);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Setup multiple springs with different damping & stiffness to create the ultimate PARALLAX effect (3D lag depth)
  // Inner ring: fast & tight
  const springConfigInner = { stiffness: 450, damping: 28, mass: 0.2 };
  const innerX = useSpring(mouseX, springConfigInner);
  const innerY = useSpring(mouseY, springConfigInner);

  // Middle ring: medium flow
  const springConfigMid = { stiffness: 180, damping: 22, mass: 0.6 };
  const midX = useSpring(mouseX, springConfigMid);
  const midY = useSpring(mouseY, springConfigMid);

  // Outer glowing aura: heavy & laggy for a rich parallax feel
  const springConfigOuter = { stiffness: 65, damping: 16, mass: 1.4 };
  const outerX = useSpring(mouseX, springConfigOuter);
  const outerY = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isTabActive) return;

    // Only track mouse movement if the device supports a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isTabActive]);

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Outer Heavy Parallax Ambient Glow (Vibrant warm color following with heavy delay) */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#EC6519]/10 to-[#C53F28]/10 blur-2xl"
      />

      {/* 2. Middle Ring (Stretches & trails behind, creating 3D depth) */}
      <motion.div
        style={{
          x: midX,
          y: midY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-12 h-12 rounded-full border border-[#EC6519]/30 bg-[#EC6519]/5 blur-[1px]"
      />

      {/* 3. Inner Solid Focal Point (Crisp, moves fast and follows exactly, with a bright neon point) */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-2 h-2 rounded-full bg-[#EC6519] shadow-[0_0_12px_#EC6519,0_0_4px_#EC6519]"
      />
    </div>
  );
}

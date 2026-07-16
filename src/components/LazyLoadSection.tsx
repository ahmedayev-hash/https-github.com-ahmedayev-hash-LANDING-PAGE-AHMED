import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadSectionProps {
  children: ReactNode;
  height?: string;
  className?: string;
}

export default function LazyLoadSection({ children, height = "300px", className = "" }: LazyLoadSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force immediate load if event is triggered
    const handleForceLoad = () => {
      setIsInView(true);
    };

    window.addEventListener("ahmedayev-load-all-lazy", handleForceLoad, { passive: true });

    // If IntersectionObserver is not supported or if already loaded, we do not need observer
    if (isInView) {
      return () => {
        window.removeEventListener("ahmedayev-load-all-lazy", handleForceLoad);
      };
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return () => {
        window.removeEventListener("ahmedayev-load-all-lazy", handleForceLoad);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // load 300px before scrolling into view
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("ahmedayev-load-all-lazy", handleForceLoad);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <div ref={ref} className={`${className} ${isInView ? "content-visibility-auto" : ""}`} style={!isInView ? { minHeight: height } : undefined}>
      {isInView ? children : null}
    </div>
  );
}

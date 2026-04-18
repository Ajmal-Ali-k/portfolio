"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const from: gsap.TweenVars = {
      opacity: 0,
      filter: "blur(4px)",
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    };
    gsap.fromTo(ref.current, from, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      x: 0,
      duration: 0.7,
      ease: "power2.out",
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Batch reveal for lists of items
interface BatchRevealProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
}

export function BatchReveal({
  children,
  className = "",
  itemClassName = "",
  stagger = 0.08,
}: BatchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".batch-item");
    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
            stagger,
          }
        );
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, i) => (
        <div key={i} className={`batch-item ${itemClassName}`} style={{ opacity: 0 }}>
          {child}
        </div>
      ))}
    </div>
  );
}

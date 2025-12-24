"use client";
import React, { useEffect, useRef } from "react";

const GalaxyBackground = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetMousePos = useRef({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const isMouseActive = useRef(false);
  const mouseLeaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    const stars: { 
      x: number; 
      y: number; 
      size: number; 
      opacity: number; 
      factor: number; 
      distance: number; 
      baseAngle: number;
      originalDistance: number;
    }[] = [];

    const SMOOTH_FACTOR = 0.05;
    const PARALLAX_STRENGTH = 30;
    const ORBIT_SPEED = 0.0015;
    const MOUSE_LEAVE_SMOOTH_FACTOR = 0.02; // Slower for smoother return

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.length = 0;
      for (let i = 0; i < 400; i++) {
        const dx = Math.random() * canvas.width - centerX;
        const dy = Math.random() * canvas.height - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        stars.push({
          distance,
          originalDistance: distance, // Store original distance for calculations
          baseAngle: Math.atan2(dy, dx),
          x: 0,
          y: 0,
          size: Math.random() * 1.6,
          opacity: Math.random() * 0.8 + 0.2, // Start with reasonable opacity
          factor: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const animate = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += ORBIT_SPEED;

      // Use different smoothing factors based on mouse activity
      const smoothing = isMouseActive.current ? SMOOTH_FACTOR : MOUSE_LEAVE_SMOOTH_FACTOR;
      
      currentMousePos.current.x += (targetMousePos.current.x - currentMousePos.current.x) * smoothing;
      currentMousePos.current.y += (targetMousePos.current.y - currentMousePos.current.y) * smoothing;

      // Calculate parallax effect based on mouse position
      const parallaxX = currentMousePos.current.x * -PARALLAX_STRENGTH;
      const parallaxY = currentMousePos.current.y * -PARALLAX_STRENGTH;

      stars.forEach((s) => {
        // Orbital movement
        const orbitX = Math.cos(s.baseAngle + angle) * s.distance;
        const orbitY = Math.sin(s.baseAngle + angle) * s.distance;

        // Apply parallax effect - closer stars move more
        const parallaxFactor = 1 - (s.distance / Math.max(centerX, centerY));
        const finalX = centerX + orbitX + parallaxX * parallaxFactor * 0.5;
        const finalY = centerY + orbitY + parallaxY * parallaxFactor * 0.5;

        // Draw star
        ctx.beginPath();
        ctx.arc(finalX, finalY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        // Pulsing opacity effect
        s.opacity += 0.004 * s.factor;
        if (s.opacity > 0.9 || s.opacity < 0.2) s.factor *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initStars();
    animate();
    window.addEventListener("resize", initStars);

    return () => {
      window.removeEventListener("resize", initStars);
      cancelAnimationFrame(animationFrameId);
      if (mouseLeaveTimeout.current) {
        clearTimeout(mouseLeaveTimeout.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    
    // Normalize mouse position to -0.5 to 0.5 range
    targetMousePos.current.x = (e.clientX - left) / width - 0.5;
    targetMousePos.current.y = (e.clientY - top) / height - 0.5;
    
    // Activate mouse interaction
    isMouseActive.current = true;
    
    // Clear any pending mouse leave timeout
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current);
      mouseLeaveTimeout.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Set target back to center smoothly
    targetMousePos.current = { x: 0, y: 0 };
    
    // Delay setting isMouseActive to false for smoother transition
    mouseLeaveTimeout.current = setTimeout(() => {
      isMouseActive.current = false;
    }, 300); // 300ms delay before stopping active tracking
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        // Clear timeout if mouse re-enters quickly
        if (mouseLeaveTimeout.current) {
          clearTimeout(mouseLeaveTimeout.current);
          mouseLeaveTimeout.current = null;
        }
        isMouseActive.current = true;
      }}
      className="relative w-full h-full overflow-hidden bg-[#02040a]"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-80 transition-opacity duration-300" 
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
};

export default GalaxyBackground;
"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedNumber({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format,
  onAnimationStart,
  onAnimationComplete,
}) {
  const spring = useSpring(value, { mass, stiffness, damping });
  const display = useTransform(spring, (current) => {
    if (format) return format(current);
    
    // Limits to max 100 
    const capped = Math.min(Math.max(current, 0), 100);
    // Pad start with zeros
    const [int, dec] = capped.toFixed(precision).split('.');
    if (precision > 0) {
      return `${int.padStart(2, '0')},${dec}`;
    }
    return `${int.padStart(2, '0')}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

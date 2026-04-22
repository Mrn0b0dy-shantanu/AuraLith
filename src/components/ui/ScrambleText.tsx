import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      clearInterval(intervalRef.current as number);

      intervalRef.current = window.setInterval(() => {
        setDisplayText(() =>
          text
            .split('')
            .map((_, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(intervalRef.current as number);
        }

        iteration += 1 / 3;
      }, 30);
    } else {
      clearInterval(intervalRef.current as number);
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current as number);
  }, [isHovered, text]);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{ display: 'inline-block', cursor: 'default' }}
    >
      {displayText}
    </motion.span>
  );
}

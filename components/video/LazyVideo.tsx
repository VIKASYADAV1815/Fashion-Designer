"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export default function LazyVideo({ src, poster, className, autoPlay = true, muted = true, loop = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded) {
            el.src = src;
            setLoaded(true);
            if (autoPlay) el.play().catch(() => {});
          } else if (!entry.isIntersecting && loaded) {
            el.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, autoPlay, loaded]);

  return (
    <video
      ref={ref}
      playsInline
      autoPlay={false}
      muted={muted}
      loop={loop}
      preload="none"
      poster={poster}
      className={className}
    />
  );
}

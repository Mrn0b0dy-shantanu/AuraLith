import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { useScroll as useThreeScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Magnetic from "../ui/Magnetic";

const ModelGraphic = ({
  id,
  color,
  isVisible,
}: {
  id: string;
  color: string;
  isVisible: boolean;
}) => {
  if (id === "coding") {
    return (
      <div className="absolute inset-0 flex flex-col gap-[6px] p-4 pt-10 opacity-60">
        <motion.div
          className="h-1 w-[40%] rounded-full"
          style={{ backgroundColor: color }}
          animate={isVisible ? { width: ["0%", "40%", "20%"] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="h-1 w-[70%] rounded-full bg-white/20 ml-2"
          animate={isVisible ? { opacity: [0.3, 0.8, 0.3] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-1 w-[25%] rounded-full"
          style={{ backgroundColor: color }}
          animate={isVisible ? { width: ["0%", "25%", "10%"] } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div className="h-1 w-[50%] rounded-full bg-white/10 ml-4" />
      </div>
    );
  }
  if (id === "research") {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div
          className="absolute w-[80%] h-[80%] border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[50%] h-[50%] border border-[transparent] border-t-white/30 border-b-white/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="w-2 h-2 rounded-full absolute"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    );
  }
  if (id === "vision") {
    return (
      <div className="absolute inset-0 p-4 opacity-50 flex items-center justify-center">
        <div className="w-full h-full border border-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
            style={{ backgroundColor: color }}
            animate={isVisible ? { top: ["0%", "100%", "0%"] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px]"
            style={{ borderColor: color }}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px]"
            style={{ borderColor: color }}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px]"
            style={{ borderColor: color }}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px]"
            style={{ borderColor: color }}
          />
        </div>
      </div>
    );
  }
  if (id === "audio") {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-[3px] p-4 opacity-60 mt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full"
            style={{ backgroundColor: color }}
            animate={
              isVisible
                ? { height: ["10%", `${40 + Math.random() * 60}%`, "10%"] }
                : {}
            }
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    );
  }
  if (id === "reasoning") {
    return (
      <div className="absolute inset-0 flex justify-center items-center opacity-50 mt-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0"
        >
          <motion.path
            d="M20,50 Q40,20 50,50 T80,50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
          />
          <motion.path
            d="M20,50 Q40,20 50,50 T80,50"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="10,90"
            animate={isVisible ? { strokeDashoffset: [100, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div
          className="w-1.5 h-1.5 rounded-full absolute left-[20%] z-10"
          style={{ backgroundColor: color }}
        />
        <div className="w-2 h-2 rounded-full absolute z-10 bg-white" />
        <div
          className="w-1.5 h-1.5 rounded-full absolute right-[20%] z-10"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }
  return null;
};

const aiModels = [
  {
    id: "coding",
    name: "SYS.CODE_GEN",
    description: "Optimized for complex logic and architecture.",
    color: "#22c55e", // green
    x: "-38vw",
    y: "-22vh",
    rotate: -7.5,
    delay: 0,
    floatDuration: 4.5,
    floatY: [0, -15, 0],
    initialScale: 0.45,
    initialX: -20,
    initialY: -20,
    hoverScale: 1.08,
    statDuration: 1.2,
    statEase: "circOut",
    stats: [
      { label: "Speed", value: 98 },
      { label: "Accuracy", value: 95 },
      { label: "Context", value: 85 },
    ],
  },

  {
    id: "research",
    name: "SYS.SYNTHESIS",
    description: "Deep data extraction and fact-checking.",
    color: "#3b82f6", // blue
    x: "34vw",
    y: "-18vh",
    rotate: 5.2,
    delay: 0.15,
    floatDuration: 6.2,
    floatY: [0, -8, 0],
    initialScale: 0.55,
    initialX: 20,
    initialY: -10,
    hoverScale: 1.05,
    statDuration: 0.8,
    statEase: "backOut",
    stats: [
      { label: "Depth", value: 96 },
      { label: "Factuality", value: 99 },
      { label: "Speed", value: 82 },
    ],
  },
  {
    id: "vision",
    name: "SYS.VISION",
    description: "Advanced image and spatial analysis.",
    color: "#f59e0b", // amber
    x: "38vw",
    y: "24vh",
    rotate: 3.8,
    delay: 0.35,
    floatDuration: 5.4,
    floatY: [0, -12, 0],
    initialScale: 0.5,
    initialX: 10,
    initialY: 30,
    hoverScale: 1.1,
    statDuration: 1.5,
    statEase: "easeOut",
    stats: [
      { label: "Resolution", value: 92 },
      { label: "Recognition", value: 97 },
      { label: "Speed", value: 85 },
    ],
  },
  {
    id: "audio",
    name: "SYS.AUDIO",
    description: "Real-time speech and acoustic processing.",
    color: "#ec4899", // pink
    x: "2vw",
    y: "42vh",
    rotate: -1.5,
    delay: 0.45,
    floatDuration: 5.8,
    floatY: [0, -10, 0],
    initialScale: 0.4,
    initialX: -5,
    initialY: 40,
    hoverScale: 1.07,
    statDuration: 1.0,
    statEase: "easeInOut",
    stats: [
      { label: "Clarity", value: 95 },
      { label: "Latency", value: 98 },
      { label: "Fidelity", value: 91 },
    ],
  },
  {
    id: "reasoning",
    name: "SYS.REASONING",
    description: "Multi-step logical deduction and planning.",
    color: "#06b6d4", // cyan
    x: "-34vw",
    y: "20vh",
    rotate: -4.2,
    delay: 0.25,
    floatDuration: 5.1,
    floatY: [0, -14, 0],
    initialScale: 0.6,
    initialX: -30,
    initialY: 10,
    hoverScale: 1.06,
    statDuration: 1.3,
    statEase: "anticipate",
    stats: [
      { label: "Logic", value: 99 },
      { label: "Planning", value: 94 },
      { label: "Speed", value: 78 },
    ],
  },
];

function ModelShowcase({ isVisible }: { isVisible: boolean }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const getPosition = (model: any, index: number) => {
    if (isMobile || isTablet) {
      // Semi-circle arching over the title for smaller screens
      const angleDeg = 180 - index * 36;
      const angleRad = (angleDeg * Math.PI) / 180;
      const rx = isMobile ? 28 : 40; // tighter vw to prevent cutoff
      const ry = isMobile ? 38 : 30; // taller arch to avoid text
      return {
        x: `${Math.cos(angleRad) * rx}vw`,
        y: `${-Math.sin(angleRad) * ry - 5}vh`,
        scale: isMobile ? 0.45 : 0.8,
        rotate: model.rotate,
      };
    }
    return { x: model.x, y: model.y, scale: 1, rotate: model.rotate };
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
      {aiModels.map((model, index) => {
        const pos = getPosition(model, index);
        return (
          <motion.div
            key={model.id}
            className="absolute pointer-events-auto"
            initial={{
              opacity: 0,
              scale: model.initialScale,
              x: model.initialX,
              y: model.initialY,
              rotate: index % 2 === 0 ? -10 : 10,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    scale: pos.scale,
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                  }
                : {
                    opacity: 0,
                    scale: model.initialScale,
                    x: model.initialX,
                    y: model.initialY,
                    rotate: index % 2 === 0 ? -10 : 10,
                  }
            }
            whileHover={{
              scale: pos.scale * model.hoverScale,
              zIndex: 50,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{
              duration: 0.9,
              delay: isVisible ? model.delay : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              animate={
                isVisible
                  ? {
                      y: model.floatY,
                      rotate: [
                        model.rotate,
                        model.rotate + (index % 2 === 0 ? 1.5 : -1.5),
                        model.rotate,
                      ],
                    }
                  : {}
              }
              transition={{
                duration: model.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-56 md:w-64 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md relative rounded-2xl flex flex-col group overflow-hidden transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                {/* Subtle top border glow specific to the model */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                  style={{
                    backgroundColor: model.color,
                    boxShadow: `0 0 10px ${model.color}`,
                  }}
                />

                {/* The Visual Identity Section */}
                <div className="h-28 w-full relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent p-4 flex flex-col justify-between border-b border-white/[0.05]">
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at top right, ${model.color}, transparent 80%)`,
                    }}
                  />

                  <ModelGraphic
                    id={model.id}
                    color={model.color}
                    isVisible={isVisible}
                  />

                  {/* Card Header overlaying graphic */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-sm"
                        style={{
                          backgroundColor: model.color,
                          boxShadow: `0 0 6px ${model.color}`,
                        }}
                      />
                      <span className="font-mono text-[10px] text-white/90 tracking-widest uppercase font-semibold">
                        {model.name}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] text-white/30 tracking-wider">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3 flex flex-col gap-3 relative z-10">
                  <p className="text-[11px] text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {model.description}
                  </p>

                  {/* Layered inner stats section */}
                  <div className="bg-white/[0.02] rounded-lg p-3 flex flex-col gap-2.5 border border-white/[0.05] group-hover:bg-white/[0.04] transition-colors duration-300">
                    {model.stats.map((stat, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <div className="w-14 text-[9px] font-mono text-white/50 uppercase tracking-wider">
                          {stat.label}
                        </div>
                        <div className="flex-1 flex gap-[2px]">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-[6px] flex-1 rounded-[1px]"
                              style={{
                                backgroundColor:
                                  i < Math.round(stat.value / 10)
                                    ? model.color
                                    : "rgba(255,255,255,0.08)",
                              }}
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={
                                isVisible
                                  ? { opacity: 1, scaleY: 1 }
                                  : { opacity: 0, scaleY: 0 }
                              }
                              transition={{
                                delay: isVisible
                                  ? model.delay + 0.3 + i * 0.04
                                  : 0,
                                duration: 0.2,
                              }}
                            />
                          ))}
                        </div>
                        <div
                          className="w-6 text-right text-[9px] font-mono font-medium tracking-wider"
                          style={{ color: model.color }}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function Globe({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // As user scrolls down, globe moves up slowly, then scrolls out with the content
  const y = useTransform(scrollYProgress, [0, 0.7, 1], ["70%", "40%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.85], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; z: number; isLand: boolean }[] = [];
    let phi = 0;

    // Generate initial uniform points so the globe is visible immediately
    const numPoints = 12000;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi_angle = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const x = Math.cos(theta) * Math.sin(phi_angle);
      const y_coord = Math.sin(theta) * Math.sin(phi_angle);
      const z = Math.cos(phi_angle);
      if (Math.random() > 0.8) {
        points.push({ x, y: y_coord, z, isLand: false });
      }
    }

    // Data Lines State
    interface DataLine {
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      controlX: number;
      controlY: number;
      progress: number;
      speed: number;
      length: number;
      color: string;
    }
    let dataLines: DataLine[] = [];
    let ripples: {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }[] = [];
    let mousePos = { x: -1000, y: -1000 };
    let lastRippleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const dpr = window.devicePixelRatio || 1;

      mousePos.x = ((e.clientX - rect.left) * scaleX) / dpr;
      mousePos.y = ((e.clientY - rect.top) * scaleY) / dpr;

      const now = Date.now();
      if (now - lastRippleTime > 100) {
        // Throttle ripples
        const cx = 1200 / 2;
        const cy = 1200 / 2;
        const radius = 1200 * 0.42;

        // Check if mouse is over the globe
        const dist = Math.sqrt(
          Math.pow(mousePos.x - cx, 2) + Math.pow(mousePos.y - cy, 2),
        );
        if (dist < radius) {
          const colors = [
            "244, 114, 182",
            "251, 146, 60",
            "56, 189, 248",
            "167, 139, 250",
            "34, 197, 94",
          ];
          ripples.push({
            x: mousePos.x,
            y: mousePos.y,
            radius: 0,
            maxRadius: 15 + Math.random() * 20,
            alpha: 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
          lastRippleTime = now;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => {
      mousePos = { x: -1000, y: -1000 };
    });

    const initGlobe = async () => {
      try {
        // 1. Fetch Earth topology
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json",
        );
        const topology = await response.json();
        const world = feature(topology, topology.objects.countries);

        // 2. Draw to offscreen canvas to get land/water map
        const mapWidth = 512;
        const mapHeight = 256;
        const offscreen = document.createElement("canvas");
        offscreen.width = mapWidth;
        offscreen.height = mapHeight;
        const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
        if (!offCtx) return;

        const projection = geoEquirectangular()
          .scale(mapWidth / (2 * Math.PI))
          .translate([mapWidth / 2, mapHeight / 2]);

        const path = geoPath(projection, offCtx);

        offCtx.fillStyle = "#fff";
        offCtx.beginPath();
        path(world as any);
        offCtx.fill();

        const imageData = offCtx.getImageData(0, 0, mapWidth, mapHeight).data;

        // 3. Generate points on a sphere (Fibonacci lattice)
        const numPoints = 12000;
        const newPoints = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < numPoints; i++) {
          const theta = (2 * Math.PI * i) / goldenRatio;
          const phi_angle = Math.acos(1 - (2 * (i + 0.5)) / numPoints);

          const x = Math.cos(theta) * Math.sin(phi_angle);
          const y_coord = Math.sin(theta) * Math.sin(phi_angle);
          const z = Math.cos(phi_angle);

          const lat = 90 - (phi_angle * 180) / Math.PI;
          const lon = ((theta * 180) / Math.PI) % 360;
          const normalizedLon = lon > 180 ? lon - 360 : lon;

          const projected = projection([normalizedLon, lat]);
          let isLand = false;
          if (projected) {
            const px = Math.floor(projected[0]);
            const py = Math.floor(projected[1]);
            if (px >= 0 && px < mapWidth && py >= 0 && py < mapHeight) {
              const index = (py * mapWidth + px) * 4;
              isLand = imageData[index] > 128;
            }
          }

          // Density filtering: Denser in continental regions, sparse in ocean
          if (isLand) {
            if (Math.random() > 0.15)
              newPoints.push({ x, y: y_coord, z, isLand });
          } else {
            if (Math.random() > 0.92)
              newPoints.push({ x, y: y_coord, z, isLand });
          }
        }

        points = newPoints;
      } catch (error) {
        console.error("Failed to initialize globe data:", error);
      }
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const logicalWidth = 1200;
      const logicalHeight = 1200;

      if (canvas.width !== logicalWidth * dpr) {
        canvas.width = logicalWidth * dpr;
        canvas.height = logicalHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      const radius = logicalWidth * 0.42;
      const cx = logicalWidth / 2;
      const cy = logicalHeight / 2;

      // Soft background glow
      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.5,
        cx,
        cy,
        radius * 1.1,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);
      const tilt = 0.15;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      const projectedPoints = points.map((p) => {
        const x1 = p.x * cosPhi - p.z * sinPhi;
        const z1 = p.x * sinPhi + p.z * cosPhi;
        const y2 = p.y * cosTilt - z1 * sinTilt;
        const z2 = p.y * sinTilt + z1 * cosTilt;
        return { x: x1, y: y2, z: z2, isLand: p.isLand };
      });

      // Sort back-to-front (z2 > 0 is front, z2 < 0 is back)
      projectedPoints.sort((a, b) => a.z - b.z);

      for (const p of projectedPoints) {
        const perspective = 2.5;
        const zOffset = perspective - p.z;
        const scale = perspective / zOffset;

        const screenX = cx + p.x * radius * scale;
        const screenY = cy + p.y * radius * scale;

        const depth = (p.z + 1) / 2; // 0 (back) to 1 (front)

        const opacity = p.isLand ? 0.1 + depth * 0.9 : 0.05 + depth * 0.3;

        const size = p.isLand ? 1.0 + depth * 1.5 : 0.8 + depth * 0.8;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(screenX - size / 2, screenY - size / 2, size, size);
      }

      // --- DATA LINES LOGIC ---
      // Spawn new lines
      if (Math.random() > 0.95 && dataLines.length < 15) {
        const frontPoints = projectedPoints.filter((p) => p.z > 0 && p.isLand);
        if (frontPoints.length > 1) {
          const startPoint =
            frontPoints[Math.floor(Math.random() * frontPoints.length)];
          const targetPoint =
            frontPoints[Math.floor(Math.random() * frontPoints.length)];

          const perspective = 2.5;
          const startScale = perspective / (perspective - startPoint.z);
          const startX = cx + startPoint.x * radius * startScale;
          const startY = cy + startPoint.y * radius * startScale;

          const targetScale = perspective / (perspective - targetPoint.z);
          const targetX = cx + targetPoint.x * radius * targetScale;
          const targetY = cy + targetPoint.y * radius * targetScale;

          // Create an arc that curves outward from the globe
          const midX = (startX + targetX) / 2;
          const midY = (startY + targetY) / 2;

          const vecX = midX - cx;
          const vecY = midY - cy;
          const vecLen = Math.sqrt(vecX * vecX + vecY * vecY) || 1;

          const dist = Math.sqrt(
            Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2),
          );
          const arcHeight = dist * 0.4; // Curve height based on distance

          const controlX = midX + (vecX / vecLen) * arcHeight;
          const controlY = midY + (vecY / vecLen) * arcHeight;

          const colors = [
            "244, 114, 182",
            "251, 146, 60",
            "56, 189, 248",
            "167, 139, 250",
          ]; // pink, orange, sky, purple
          const color = colors[Math.floor(Math.random() * colors.length)];

          dataLines.push({
            startX,
            startY,
            targetX,
            targetY,
            controlX,
            controlY,
            progress: 0,
            speed: 0.003 + Math.random() * 0.005,
            length: 0.3 + Math.random() * 0.4,
            color,
          });

          // Ripple at spawn point
          ripples.push({
            x: startX,
            y: startY,
            radius: 0,
            maxRadius: 6 + Math.random() * 6,
            alpha: 0.4,
            color: color,
          });
        }
      }

      // Update and draw lines
      ctx.lineCap = "round";
      for (let i = dataLines.length - 1; i >= 0; i--) {
        const line = dataLines[i];
        line.progress += line.speed;

        if (line.progress > 1 + line.length) {
          ripples.push({
            x: line.targetX,
            y: line.targetY,
            radius: 0,
            maxRadius: 8 + Math.random() * 12,
            alpha: 0.6,
            color: line.color,
          });
          dataLines.splice(i, 1);
          continue;
        }

        const head = Math.min(1, line.progress);
        const tail = Math.max(0, line.progress - line.length);

        if (head > 0 && tail < 1) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${line.color}, 0.8)`;

          const segments = 40;
          for (let j = 0; j < segments; j++) {
            const t1 = tail + (head - tail) * (j / segments);
            const t2 = tail + (head - tail) * ((j + 1) / segments);

            const x1 =
              Math.pow(1 - t1, 2) * line.startX +
              2 * (1 - t1) * t1 * line.controlX +
              Math.pow(t1, 2) * line.targetX;
            const y1 =
              Math.pow(1 - t1, 2) * line.startY +
              2 * (1 - t1) * t1 * line.controlY +
              Math.pow(t1, 2) * line.targetY;

            const x2 =
              Math.pow(1 - t2, 2) * line.startX +
              2 * (1 - t2) * t2 * line.controlX +
              Math.pow(t2, 2) * line.targetX;
            const y2 =
              Math.pow(1 - t2, 2) * line.startY +
              2 * (1 - t2) * t2 * line.controlY +
              Math.pow(t2, 2) * line.targetY;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

            // Opacity fades towards the tail
            const opacity = Math.pow(j / segments, 2);
            ctx.strokeStyle = `rgba(${line.color}, ${opacity})`;
            ctx.lineWidth = 1 + (j / segments) * 1.5;
            ctx.stroke();
          }
          ctx.shadowBlur = 0; // reset
        }
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.4;
        r.alpha -= 0.015;
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      // --- END DATA LINES LOGIC ---

      ctx.restore();

      phi += 0.0015; // Slow, continuous, mechanical rotation
      animationFrameId = requestAnimationFrame(render);
    };

    initGlobe().then(() => {
      render();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none z-10 flex items-center justify-center"
    >
      {/* Mathematical / Data Viz Grid Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.06]" />
        <div className="absolute w-[900px] h-[900px] rounded-full border border-white/[0.04]" />
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/[0.02]" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: 1200, height: 1200, maxWidth: "100%", aspectRatio: 1 }}
        className="relative z-10 pointer-events-auto cursor-crosshair"
      />
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const threeScroll = useThreeScroll();
  const scrollYProgress = useMotionValue(0);

  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.95], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0vh", "0vh", "-100vh"],
  );
  useFrame(() => {
    const progress = threeScroll.offset * (6.45 / 0.75);
    scrollYProgress.set(Math.min(Math.max(progress, 0), 1));
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[125vh] font-sans selection:bg-[#22c55e]/30"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
        {/* Globe with Parallax */}
        <Globe scrollYProgress={scrollYProgress} />

        {/* Model Showcase (Triggered by Hover) */}
        <ModelShowcase isVisible={isHovered} />

        {/* Main Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-7xl mt-[-10vh]"
        >
          <motion.h1
            className="text-[14vw] md:text-[12vw] font-black tracking-tighter text-white leading-none cursor-default relative z-30 drop-shadow-2xl flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(!isHovered)}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {"kontenta".split("").map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", damping: 14, stiffness: 100 },
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  color: "#22c55e",
                  textShadow: "0px 0px 20px rgba(34, 197, 94, 0.5)",
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
                className="inline-block origin-bottom transition-colors duration-300"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-white/90 mt-8 z-30 relative font-light tracking-wide max-w-4xl leading-relaxed"
          >
            We empower humans to create stories at the Pulse of{" "}
            <br className="hidden md:block" />
            <motion.span
              className="relative inline-block font-normal text-white mx-2 cursor-default"
              whileHover={{ scale: 1.05, color: "#22c55e" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Culture
              <motion.svg
                className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] text-[#22c55e]/80 pointer-events-none"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                animate={{
                  filter: [
                    "drop-shadow(0px 0px 0px rgba(34,197,94,0))",
                    "drop-shadow(0px 0px 8px rgba(34,197,94,0.6))",
                    "drop-shadow(0px 0px 0px rgba(34,197,94,0))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2.8,
                }}
              >
                <motion.ellipse
                  cx="50"
                  cy="20"
                  rx="48"
                  ry="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  transform="rotate(-3 50 20)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.span>{" "}
            and the{" "}
            <motion.span
              className="relative inline-block font-normal text-white mx-2 cursor-default"
              whileHover={{ scale: 1.05, color: "#8b5cf6" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Speed
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#8b5cf6]/90 pointer-events-none"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                animate={{
                  filter: [
                    "drop-shadow(0px 0px 0px rgba(139,92,246,0))",
                    "drop-shadow(0px 0px 8px rgba(139,92,246,0.6))",
                    "drop-shadow(0px 0px 0px rgba(139,92,246,0))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 3.2,
                }}
              >
                <motion.path
                  d="M0 5 L 10 0 L 20 10 L 30 0 L 40 10 L 50 0 L 60 10 L 70 0 L 80 10 L 90 0 L 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
                />
              </motion.svg>
            </motion.span>{" "}
            of AI.
          </motion.p>

          <Magnetic>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 2.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(34,197,94,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-14 px-8 py-4 bg-[#22c55e] text-white rounded-full font-semibold text-lg z-30 relative shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              Join the waitlist
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}

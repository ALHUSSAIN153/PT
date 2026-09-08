import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Project {
  title: string;
  image: string;
  bgClass: string;
}

const projectsData: Project[] = [
  {
    title: "Coursewise",
    image: "/5.avif",
    bgClass: "bg-[#e2e4e7]",
  },
  {
    title: "LanderOS",
    image: "/6.avif",
    bgClass:
      "bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-purple-400/10",
  },
  {
    title: "Alter",
    image: "/7.avif",
    bgClass:
      "bg-gradient-to-br from-teal-900/40 via-emerald-800/30 to-cyan-900/40",
  },
  {
    title: "Portfoy",
    image: "/8.avif",
    bgClass: "bg-gradient-to-br from-cyan-500/20 to-teal-500/10",
  },
];

const Hero = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const starCount = window.innerWidth < 768 ? 50 : 100; // تقليل العدد في الهواتف لتحسين الأداء
    const stars: Star[] = [];
    const centerSafeZone = window.innerWidth < 768 ? 100 : 160;

    class Star {
      x!: number;
      y!: number;
      opacity!: number;
      size!: number;
      speed!: number;
      isInitial: boolean;

      constructor(isInitial = false) {
        this.isInitial = isInitial;
        this.init(isInitial);
      }

      init(isInitial: boolean) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (isInitial) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.opacity = Math.random();
        } else {
          const side = Math.floor(Math.random() * 4);
          if (side === 0) {
            this.x = Math.random() * width;
            this.y = -10;
          } else if (side === 1) {
            this.x = Math.random() * width;
            this.y = height + 10;
          } else if (side === 2) {
            this.x = -10;
            this.y = Math.random() * height;
          } else {
            this.x = width + 10;
            this.y = Math.random() * height;
          }
          this.opacity = 0;
        }
        this.size = Math.random() * 1.1 + 0.2;
        this.speed = Math.random() * 0.25 + 0.15;
      }

      update(centerX: number, centerY: number) {
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > centerSafeZone) {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
          if (this.opacity < 1) this.opacity += 0.005;
        } else {
          this.opacity -= 0.02;
          if (this.opacity <= 0) {
            this.init(false);
          }
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star(true));
    }

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach((star) => {
        star.update(centerX, centerY);
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#030303] overflow-hidden flex flex-col items-center justify-between pt-20 pb-8 sm:pt-28 sm:pb-12">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Hero Content Box */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 relative z-30 px-4 sm:px-6 text-center my-auto">
        <h1
          className="w-full bg-linear-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-tight text-transparent"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
          }}
        >
          {t("pages.Hero.heroTitleLine1")} <br /> {t("pages.Hero.heroTitleLine2")}
        </h1>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-neutral-300 max-w-xs sm:max-w-md lg:max-w-lg leading-relaxed">
          {t("pages.Hero.heroDescription")}
        </p>

        <div className="gap-3 sm:gap-4 flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none">
          <a href="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-40 gap-2 rounded-lg px-5 py-3 text-xs sm:text-[13px] font-semibold flex items-center justify-center bg-white text-black shadow-lg hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="text-black rtl:rotate-180"
              >
                <path d="M200,64V168a8,8,0,0,1-13.66,5.66L140,127.31,69.66,197.66a8,8,0,0,1-11.32-11.32L128.69,116,82.34,69.66A8,8,0,0,1,88,56H192A8,8,0,0,1,200,64Z"></path>
              </svg>
              {t("pages.Hero.heroTalkToMe")}
            </button>
          </a>
          <a href="/portfolio" className="w-full sm:w-auto">
            <button className="w-full sm:w-40 gap-2 rounded-lg border border-white/10 px-5 py-3 text-xs sm:text-[13px] font-medium flex items-center justify-center bg-white/5 text-white backdrop-blur-md hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="rtl:rotate-180"
              >
                <path d="M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
              {t("pages.Hero.heroViewMyWork")}
            </button>
          </a>
        </div>
      </div>

      {/* Infinite Slider */}
      <div
        className="relative w-full overflow-hidden mt-8 sm:mt-12 z-30 
        mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <div className="flex flex-col gap-6">
          <Row projects={projectsData} speed="35s" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

interface RowProps {
  projects: Project[];
  reverse?: boolean;
  speed?: string;
}

function Row({ projects, reverse = false, speed = "40s" }: RowProps) {
  return (
    <div className="relative flex overflow-hidden py-2 sm:py-4">
      <div
        className={`flex min-w-max gap-4 sm:gap-6 ${
          reverse ? "animate-scrollReverse" : "animate-scroll"
        }`}
        style={{
          animationDuration: speed,
        }}
      >
        {[...projects, ...projects].map((project, index) => (
          <div
            key={index}
            className="group relative w-65 h-55 sm:w-95 sm:h-75 md:w-120 md:h-90 bg-neutral-900/40 rounded-lg p-2 sm:p-2.5 border border-white/5 shadow-2xl shrink-0 transition-all duration-500 hover:border-white/10"
          >
            <div
              className={`relative h-40 sm:h-57.5 md:h-70 w-full rounded-lg overflow-hidden flex items-center justify-center p-3 sm:p-5 transition-transform duration-500 group-hover:scale-[0.99] ${project.bgClass}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-black/10 to-transparent opacity-40 pointer-events-none" />

              <div className="relative w-full h-full rounded-lg overflow-hidden transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1.5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="mt-1 sm:mt-2 flex items-center justify-between px-1 sm:px-2">
              <h3 className="text-sm sm:text-[16px] font-semibold text-neutral-200 tracking-wide">
                {project.title}
              </h3>

              <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-neutral-400 transition-all duration-300">
                <ArrowUpRight
                  size={18}
                  className="sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
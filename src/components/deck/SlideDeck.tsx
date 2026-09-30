"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, TouchEvent } from "react";
import Image from "next/image";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  FileText,
  PawPrint,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  TrendingUp,
  X,
} from "lucide-react";
import {
  BMC_CANVAS,
  FB_POST_IMAGES,
  PAPER_PASSPORT_LEAD,
  PROBLEM_POINTS,
  PROBLEM_STATS,
  ROADMAP,
  SOLUTION_PILLARS,
  PETTI_TAG_DOG_IMAGE,
  VALUE_COMPARISONS,
  type ValueComparisonRow as ValueComparison,
  type BmcBlock,
  type Phase,
} from "./deckContent";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function SlideIntro({
  eyebrow,
  title,
  lead,
  compact,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  compact?: boolean;
}) {
  return (
    <header className={cx("deck-intro", compact && "deck-intro--compact")}>
      <p className="deck-eyebrow">{eyebrow}</p>
      <h2
        className={cx(
          "deck-title max-w-2xl leading-tight",
          compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl",
        )}
      >
        {title}
      </h2>
      {lead && !compact ? (
        <p className="deck-lead max-w-2xl px-2 text-sm leading-relaxed sm:text-base">{lead}</p>
      ) : null}
    </header>
  );
}

function AccentPill({ children }: { children: ReactNode }) {
  return (
    <span className="deck-pill">
      <span className="deck-pill__dot" aria-hidden />
      {children}
    </span>
  );
}

function PhaseBadge({ phase }: { phase: Phase }) {
  return (
    <span className={cx("deck-phase", phase === "v1" ? "deck-phase--v1" : "deck-phase--v2")}>
      {phase}
    </span>
  );
}

function Card({
  children,
  className = "",
  variant = "default",
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "warm";
  compact?: boolean;
}) {
  return (
    <div
      className={cx(
        "deck-card",
        compact && "deck-card--compact",
        variant === "muted" && "deck-card--muted",
        variant === "warm" && "deck-card--warm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function IconSquare({
  icon: I,
  small,
  filled,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  small?: boolean;
  filled?: boolean;
}) {
  return (
    <div className={cx("deck-icon", small && "deck-icon--sm", filled && "deck-icon--filled")}>
      <I className={small ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2} />
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="deck-list">
      {items.map((it) => (
        <li key={it}>
          <span className="deck-check">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function BmcItemText({ text }: { text: string }) {
  const dash = text.indexOf(" — ");
  if (dash === -1) return <>{text}</>;
  return (
    <>
      <span className="deck-bmc-item__label">{text.slice(0, dash)}</span>
      <span className="deck-bmc-item__desc">{text.slice(dash + 3)}</span>
    </>
  );
}

function PhaseList({
  items,
  dense,
  bmc,
}: {
  items: { text: string; phase: Phase }[];
  dense?: boolean;
  bmc?: boolean;
}) {
  return (
    <ul className={cx("deck-list", dense && "deck-list--bmc", bmc && "deck-list--bmc-readable")}>
      {items.map((it) => (
        <li key={it.text}>
          {!bmc ? (
            <span className="deck-check">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          ) : null}
          <span className={bmc ? "deck-bmc-item" : undefined}>
            <PhaseBadge phase={it.phase} />
            {bmc ? <BmcItemText text={it.text} /> : it.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ImageLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const src = FB_POST_IMAGES[index];
  const alt = `Facebook pet listing screenshot ${index + 1}`;
  const hasPrev = index > 0;
  const hasNext = index < FB_POST_IMAGES.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    document.body.classList.add("deck-lightbox-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("deck-lightbox-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="deck-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <div className="deck-lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="deck-lightbox__close"
          aria-label="Хаах"
          onClick={onClose}
        >
          <X className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <p className="deck-lightbox__counter font-mono text-xs tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(FB_POST_IMAGES.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          className="deck-lightbox__nav deck-lightbox__nav--prev"
          aria-label="Өмнөх зураг"
          disabled={!hasPrev}
          onClick={goPrev}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          className="deck-lightbox__nav deck-lightbox__nav--next"
          aria-label="Дараагийн зураг"
          disabled={!hasNext}
          onClick={goNext}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <Image
          key={src}
          src={src}
          alt={alt}
          width={1376}
          height={1556}
          className="deck-lightbox__img"
          sizes="420px"
        />
      </div>
    </div>
  );
}

function FacebookFeedWall() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="deck-fb-wall">
      <div className="deck-fb-wall__badges">
        <span className="deck-tag">Алдагдсан</span>
        <span className="deck-tag">Олдсон</span>
        <span className="deck-tag">Үрчлүүлэх</span>
        <span className="deck-tag">Зарна</span>
      </div>
      <div className="deck-fb-wall__scroll" aria-label="Facebook pet listing screenshots">
        {FB_POST_IMAGES.map((src, i) => {
          const alt = `Facebook pet listing screenshot ${i + 1}`;
          return (
            <button
              key={src}
              type="button"
              className="deck-fb-wall__slide"
              aria-label={`${alt} — томруулж харах`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={src}
                alt={alt}
                width={1376}
                height={1556}
                className="deck-fb-wall__img"
                sizes="(max-width: 768px) 78vw, 300px"
                priority={i < 2}
              />
            </button>
          );
        })}
      </div>
      <div className="deck-fb-wall__hint">
        <span>← → гулсуулж үзнэ · дарж томруулна, modal дотор сум гүйлгэнэ</span>
        <span className="deck-fb-wall__more-pill">+ мянган ижил төстэй зар</span>
      </div>
      {lightboxIndex !== null ? (
        <ImageLightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}

function BmcCell({ block, cellClass }: { block: BmcBlock; cellClass: string }) {
  const isValue = cellClass.includes("--value");
  return (
    <Card
      compact
      variant={isValue ? "warm" : "muted"}
      className={cx("deck-bmc-cell", cellClass, "deck-card--bmc", "!shadow-none", isValue && "!bg-[var(--deck-accent-softer)]")}
    >
      <p className="deck-bmc-block__title">{block.title}</p>
      <PhaseList items={block.items} dense bmc />
    </Card>
  );
}

function Slide1() {
  return (
    <div className="flex flex-col items-center text-center">
      <AccentPill>Mongolia&apos;s integrated pet ecosystem · v1 → v2</AccentPill>

      <h1 className="deck-title mt-5 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
        Petti
      </h1>

      <p className="deck-lead mt-4 max-w-2xl px-3 text-base font-semibold leading-relaxed text-[var(--deck-text)] sm:text-lg">
        Улаанбаатарын тэжээвэр амьтны олон асуудлыг шийдсэн, бүх үйлчилгээг холбож нэг
        дор төвлөрүүлсэн цогц платформ.
      </p>

      <div className="deck-metrics mt-6">
        {(
          [
            [PawPrint, "120,000+", "Тэжээвэр амьтан (Улаанбаатар)"],
            [Building2, "1000+", "FB зар, пост — өдөрт"],
            [TrendingUp, "1", "Нэгдсэн платформ (одоо 0)"],
          ] as const
        ).map(([Icon, val, lbl]) => (
          <Card key={lbl} compact className="flex flex-col items-center text-center">
            <div className="deck-icon deck-icon--sm mb-2">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="deck-title text-2xl font-extrabold sm:text-3xl">{val}</p>
            <p className="deck-lead mt-2 text-sm leading-snug">{lbl}</p>
          </Card>
        ))}
      </div>

      <p className="deck-lead mt-5 max-w-2xl px-3 text-sm leading-relaxed sm:text-base">
        Дижитал паспорт, алдагдсан/олсон/үрчлүүлэх амьтадын нэгдсэн бүртгэл, онлайн
        дэлгүүр, өвчний түүх болон эмнэлгийн үйлчилгээ, ухаалаг нэмэлт бүтээгдэхүүн
        хүртэл — бүгдийг нэг апп дээр.
      </p>
    </div>
  );
}

function PaperVsQr() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="flex flex-col items-center rounded-[1.25rem] bg-[var(--deck-surface-muted)] px-3 py-5">
        <FileText className="h-9 w-9 text-[var(--deck-text-muted)]" strokeWidth={1.5} />
        <p className="mt-2 text-center text-xs font-semibold text-[var(--deck-text-secondary)]">
          Цаасан дэвтэр · алдагдах эрсдэл
        </p>
      </div>
      <div className="flex flex-col items-center rounded-[1.25rem] bg-[var(--deck-accent-softer)] px-3 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[var(--deck-shadow-card)]">
          <QrCode className="h-7 w-7 text-[var(--deck-accent)]" strokeWidth={2} />
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-[var(--deck-accent)]">
          Petti digital ID
        </p>
      </div>
    </div>
  );
}

function Slide2() {
  return (
    <div>
      <SlideIntro
        eyebrow="Бодит нөхцөл байдал"
        title="Facebook дээр зар дүүрэн — систем байхгүй"
        lead="Алдагдсан, олдсон, үрчлүүлэх, худалдааны зар групп бүрт давхар давтагдан нийтэлэгддэг. Нэгдсэн хайлт, баталгаажсан профайл, notification байхгүй."
      />
      <Card className="mb-3">
        <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconSquare icon={AlertCircle} small filled />
            <h3 className="deck-title text-base sm:text-lg">Social feed chaos</h3>
          </div>
          <AccentPill>Бодит скриншот</AccentPill>
        </div>
        <FacebookFeedWall />
        <div className="deck-stat-row">
          {PROBLEM_STATS.map((s) => (
            <div key={s.label} className="deck-stat-row__item">
              <p className="deck-title text-lg font-extrabold sm:text-xl">{s.value}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-[var(--deck-text-muted)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Card>
      <div className="deck-grid-2">
        <Card compact variant="muted">
          <h3 className="deck-title text-sm">Ямар асуудал үүсдэг вэ?</h3>
          <Checks items={[...PROBLEM_POINTS]} />
        </Card>
        <Card compact>
          <h3 className="deck-title text-sm">Цаасан паспортын эрин</h3>
          <p className="deck-lead mt-2 text-xs leading-relaxed">{PAPER_PASSPORT_LEAD}</p>
          <PaperVsQr />
        </Card>
      </div>
    </div>
  );
}

function ValueComparisonBlock({ row }: { row: ValueComparison }) {
  return (
    <div className="deck-value-row">
      <h3 className="deck-value-row__title">{row.title}</h3>
      <div className="deck-value-row__grid">
        <div className="deck-value-row__cell deck-value-row__cell--now">
          <p className="deck-value-row__label">Одоогийн нөхцөл</p>
          <p className="deck-value-row__text">{row.now}</p>
        </div>
        <div
          className="deck-value-row__cell deck-value-row__cell--target"
          aria-hidden
        >
          <span className="deck-value-row__arrow">→</span>
        </div>
        <div className="deck-value-row__cell deck-value-row__cell--petti">
          <p className="deck-value-row__label">Petti-р шийдэх нь</p>
          <p className="deck-value-row__text">
            <PhaseBadge phase="v1" />
            <span className="deck-value-row__phase-tag">MVP</span>
            {row.targetV1}
          </p>
          <p className="deck-value-row__text deck-value-row__text--v2">
            <PhaseBadge phase="v2" />
            {row.targetV2}
          </p>
        </div>
      </div>
    </div>
  );
}

const PILLAR_ICONS = {
  marketplace: ShoppingBag,
  passport: QrCode,
  vet: Stethoscope,
  insurance: ShieldCheck,
} as const;

function SolutionFeatureList({
  items,
}: {
  items: readonly { label: string; text: string }[];
}) {
  return (
    <ul className="deck-solution-features">
      {items.map((item) => (
        <li key={item.label}>
          <span className="deck-check">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          <span>
            <strong className="deck-solution-features__label">{item.label}:</strong>{" "}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

const SOLUTION_HUB_ORDER = ["marketplace", "passport", "vet", "insurance"] as const;

function SolutionPillarCard({
  pillar,
}: {
  pillar: (typeof SOLUTION_PILLARS)[number];
}) {
  const Icon = PILLAR_ICONS[pillar.key];

  return (
    <Card
      compact
      className={cx("deck-solution-card", `deck-solution-card--${pillar.key}`)}
    >
      <div className="deck-solution-card__icon-corner">
        <IconSquare icon={Icon} small filled />
      </div>
      <div className="deck-solution-card__body">
        <div className="deck-solution-card__head">
          <h3 className="deck-title text-sm leading-snug">{pillar.title}</h3>
          <p className="deck-solution-tagline">{pillar.tagline}</p>
        </div>
        <SolutionFeatureList items={pillar.items} />
      </div>
    </Card>
  );
}

function SlideSolutions() {
  return (
    <div className="deck-slide-solutions">
      <SlideIntro
        eyebrow="Шийдэл"
        title="Problem-ийн дараах 4 багана — Petti product pillars"
        lead="Асуудлыг feature биш, бодит үйлчилгээ болгон шийднэ: дэлгүүр, цахим паспорт, эмнэлэг, даатгал — нэг апп, нэг итгэл."
      />
      <div className="deck-solutions-hub">
        <div className="deck-solutions-hub__grid">
          {SOLUTION_HUB_ORDER.map((key) => {
            const pillar = SOLUTION_PILLARS.find((p) => p.key === key);
            if (!pillar) return null;
            return <SolutionPillarCard key={key} pillar={pillar} />;
          })}
        </div>
        <div className="deck-solutions-hub__center" aria-hidden>
          <div className="deck-solutions-hub__ring">
            <Image
              src={PETTI_TAG_DOG_IMAGE}
              alt=""
              width={400}
              height={400}
              className="deck-solutions-hub__photo"
              sizes="(min-width:768px) 180px, 140px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideValue() {
  return (
    <div className="deck-slide-value">
      <SlideIntro
        eyebrow="Үнэ цэнэ"
        title="Одоо vs Petti — v1 суурь, v2 ухаалаг экосистем"
        lead="Solutions-ийн дараах алхам: таван чиглэлээр өнөөдрийн салсгалттай орчин → v1 MVP → v2-ийн ухаалаг давхарга."
      />
      <div className="deck-value-legend">
        <span className="deck-value-legend__chip deck-value-legend__chip--now">Одоогийн нөхцөл</span>
        <span className="deck-value-legend__arrow">→</span>
        <span className="deck-value-legend__chip deck-value-legend__chip--petti">
          Petti-р шийдэх (v1 MVP + v2)
        </span>
      </div>
      <div className="deck-value-compare">
        {VALUE_COMPARISONS.map((row) => (
          <ValueComparisonBlock key={row.title} row={row} />
        ))}
      </div>
    </div>
  );
}

function SlideBmc() {
  return (
    <div className="deck-slide-bmc">
      <SlideIntro compact eyebrow="Business Model Canvas" title="BMC · 9 блок" />
      <div className="deck-bmc-viewport">
        <div className="deck-bmc-board">
          <div className="deck-bmc-canvas">
            <BmcCell
              cellClass="deck-bmc-cell--partners"
              block={BMC_CANVAS.keyPartners}
            />
            <div className="deck-bmc-stack deck-bmc-stack--mid-left">
              <BmcCell
                cellClass="deck-bmc-cell--activities"
                block={BMC_CANVAS.keyActivities}
              />
              <BmcCell
                cellClass="deck-bmc-cell--resources"
                block={BMC_CANVAS.keyResources}
              />
            </div>
            <BmcCell
              cellClass="deck-bmc-cell--value"
              block={BMC_CANVAS.valuePropositions}
            />
            <div className="deck-bmc-stack deck-bmc-stack--mid-right">
              <BmcCell
                cellClass="deck-bmc-cell--relationships"
                block={BMC_CANVAS.customerRelationships}
              />
              <BmcCell cellClass="deck-bmc-cell--channels" block={BMC_CANVAS.channels} />
            </div>
            <BmcCell
              cellClass="deck-bmc-cell--segments"
              block={BMC_CANVAS.customerSegments}
            />
            <BmcCell
              cellClass="deck-bmc-cell--cost"
              block={BMC_CANVAS.costStructure}
            />
            <BmcCell
              cellClass="deck-bmc-cell--revenue"
              block={BMC_CANVAS.revenueStreams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideRoadmap() {
  return (
    <div>
      <SlideIntro
        eyebrow="Roadmap"
        title="Хөгжүүлэлтийн 3 үе шат"
        lead="MVP-ээс SaaS & IoT хүртэл — таны өгсөн v1/v2 төлөвлөгөөтэй нийцнэ."
      />
      <div className="deck-grid-3">
        {ROADMAP.map((s) => (
          <Card key={s.step} compact className="relative overflow-hidden">
            <span aria-hidden className="deck-watermark">
              {s.step}
            </span>
            <div className="relative">
              <AccentPill>{s.status}</AccentPill>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[var(--deck-text-muted)]">
                {s.label}
              </p>
              <h3 className="deck-title mt-1 text-lg">{s.title}</h3>
              <Checks items={[...s.items]} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const SLIDES = [Slide1, Slide2, SlideSolutions, SlideValue, SlideBmc, SlideRoadmap];
const NAV = ["Home", "Problem", "Solutions", "Value", "BMC", "Roadmap"] as const;
const BMC_SLIDE_IDX = 4;

export default function SlideDeck() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  const [animKey, setKey] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (next: number, d: "up" | "down") => {
      const c = Math.max(0, Math.min(SLIDES.length - 1, next));
      if (c === idx) return;
      setDir(d);
      setIdx(c);
      setKey((k) => k + 1);
      mainRef.current?.scrollTo({ top: 0 });
    },
    [idx],
  );

  const prev = useCallback(() => goTo(idx - 1, "down"), [goTo, idx]);
  const next = useCallback(() => goTo(idx + 1, "up"), [goTo, idx]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (document.body.classList.contains("deck-lightbox-open")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const onTouchStart = useCallback((e: TouchEvent<HTMLElement>) => {
    const t = e.changedTouches[0] ?? e.touches[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent<HTMLElement>) => {
      const start = touchStartRef.current;
      const t = e.changedTouches[0];
      if (!start || !t) return;
      touchStartRef.current = null;

      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX < 48 || absX < absY * 1.2) return;

      if (dx < 0) next();
      else prev();
    },
    [next, prev],
  );

  const Slide = SLIDES[idx];
  const pageLabel = `${String(idx + 1).padStart(2, "0")} / ${String(SLIDES.length).padStart(2, "0")}`;

  return (
    <div className="deck-app relative flex h-[100dvh] w-full flex-col overflow-hidden">
      <p
        className="deck-page-counter font-mono text-sm tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        {pageLabel}
      </p>
      <header className="shrink-0 pt-3 sm:pt-4">
        <div className="deck-shell">
          <div className="deck-chrome deck-bar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="deck-logo-mark">
                <PawPrint className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="deck-title text-base font-extrabold">Petti</span>
            </div>
            <nav className="flex flex-wrap gap-1">
              {NAV.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => goTo(i, i > idx ? "up" : "down")}
                  className={cx("deck-nav-btn", i === idx && "deck-nav-btn--active")}
                >
                  <span className="deck-nav-num mr-1.5 font-mono text-[10px] opacity-80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden sm:inline">{name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main
        ref={mainRef}
        className={cx(
          "relative min-h-0 flex-1 overflow-x-hidden touch-pan-y",
          idx === BMC_SLIDE_IDX ? "overflow-y-auto overscroll-contain" : "overflow-y-auto",
        )}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          disabled={idx === 0}
          className="deck-arrow deck-arrow--prev"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          disabled={idx === SLIDES.length - 1}
          className="deck-arrow deck-arrow--next"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <div
          className={cx(
            "deck-shell deck-main",
            idx === BMC_SLIDE_IDX && "deck-main--bmc !py-1",
          )}
        >
          <div
            key={animKey}
            className={dir === "up" ? "anim-slide-up" : "anim-slide-down"}
          >
            <Slide />
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { FB_SHOTS as FB_POST_IMAGES } from "@/components/petti/content";
import { Logo, SLIDES } from "@/components/petti/slides";

const W = 1920;
const H = 1080;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const pad = (n: number) => String(n).padStart(2, "0");

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const last = FB_POST_IMAGES.length - 1;
  const go = useCallback(
    (d: number) => onNavigate(Math.max(0, Math.min(last, index + d))),
    [index, last, onNavigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      else return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [go, onClose]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Зарын скриншот" onClick={onClose}>
      <div className="lb__panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb__btn lb__close" aria-label="Хаах" onClick={onClose}>
          <X size={18} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          className="lb__btn lb__prev"
          aria-label="Өмнөх"
          disabled={index === 0}
          onClick={() => go(-1)}
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          className="lb__btn lb__next"
          aria-label="Дараагийн"
          disabled={index === last}
          onClick={() => go(1)}
        >
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>
        <Image
          key={FB_POST_IMAGES[index]}
          src={FB_POST_IMAGES[index]}
          alt={`Facebook зарын скриншот ${index + 1}`}
          width={1376}
          height={1556}
          sizes="640px"
          className="lb__img"
        />
        <p className="lb__count">
          {pad(index + 1)} / {pad(FB_POST_IMAGES.length)}
        </p>
      </div>
    </div>
  );
}

function Overview({
  current,
  onPick,
  onClose,
}: {
  current: number;
  onPick: (i: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "g") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div className="ov" role="dialog" aria-modal="true" aria-label="Слайдын жагсаалт" onClick={onClose}>
      <div className="ov__panel" onClick={(e) => e.stopPropagation()}>
        <div className="ov__head">
          <span>Бүх слайд</span>
          <button type="button" className="ov__close" aria-label="Хаах" onClick={onClose}>
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>
        <div className="ov__grid">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={cx("ov__item", i === current && "ov__item--on", s.tone === "dark" && "ov__item--dark")}
              onClick={() => onPick(i)}
            >
              <span className="ov__n">{pad(i + 1)}</span>
              <span className="ov__l">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SlideDeck() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [scale, setScale] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [overview, setOverview] = useState(false);
  const [full, setFull] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const total = SLIDES.length;

  /* Canvas-ийг цонхонд тааруулж томруулах/багасгах */
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  /* URL hash (#5) → слайд */
  useEffect(() => {
    const fromHash = () => {
      const n = parseInt(window.location.hash.slice(1), 10);
      if (n >= 1 && n <= total) setIdx(n - 1);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [total]);

  useEffect(() => {
    const url = `${window.location.pathname}#${idx + 1}`;
    window.history.replaceState(null, "", url);
    document.title = `${SLIDES[idx].label} · Petti`;
  }, [idx]);

  const goTo = useCallback(
    (n: number) => {
      const c = Math.max(0, Math.min(total - 1, n));
      if (c === idx) return;
      setDir(c > idx ? 1 : -1);
      setIdx(c);
    },
    [idx, total],
  );
  const next = useCallback(() => goTo(idx + 1), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1), [goTo, idx]);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null || overview) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "ArrowRight" || k === "ArrowDown" || k === "PageDown" || k === " " || k === "Enter") {
        e.preventDefault();
        next();
      } else if (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp" || k === "Backspace") {
        e.preventDefault();
        prev();
      } else if (k === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (k === "End") {
        e.preventDefault();
        goTo(total - 1);
      } else if (k.toLowerCase() === "f") {
        e.preventDefault();
        toggleFull();
      } else if (k.toLowerCase() === "g") {
        e.preventDefault();
        setOverview(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, overview, next, prev, goTo, toggleFull, total]);

  /* Хяналтын самбар хулганы хөдөлгөөнгүй бол нуугдана */
  const poke = useCallback(() => {
    setUiVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 2600);
  }, []);
  useEffect(() => {
    hideTimer.current = setTimeout(() => setUiVisible(false), 2600);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [poke]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touch.current;
    const t = e.changedTouches[0];
    touch.current = null;
    if (!s || !t || lightbox !== null) return;
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) next();
    else prev();
  };

  const def = SLIDES[idx];
  const Slide = def.Component;

  return (
    <div
      className="stage"
      onMouseMove={poke}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      data-ready={scale > 0}
    >
      <div
        className="canvas"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale || 1})` }}
      >
        <section
          key={def.id}
          className={cx("slide", `slide--${def.tone}`, def.bare && "slide--bare", dir === 1 ? "slide--fwd" : "slide--back")}
          aria-roledescription="slide"
          aria-label={`${idx + 1} / ${total}: ${def.label}`}
        >
          <Slide onOpenImage={setLightbox} />
        </section>

        {!def.bare ? (
          <footer className={cx("foot", `foot--${def.tone}`)}>
            <span className="foot__brand">
              <Logo />
            </span>
            <span className="foot__label">{def.label}</span>
            <span className="foot__page">
              {pad(idx + 1)} <i>/ {pad(total)}</i>
            </span>
          </footer>
        ) : null}

        <div className={cx("progress", `progress--${def.tone}`)} aria-hidden>
          <div className="progress__bar" style={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className={cx("ctl", !uiVisible && "ctl--hide")}>
        <button type="button" className="ctl__btn" aria-label="Өмнөх слайд" onClick={prev} disabled={idx === 0}>
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>
        <span className="ctl__count" aria-live="polite">
          {pad(idx + 1)} / {pad(total)}
        </span>
        <button
          type="button"
          className="ctl__btn"
          aria-label="Дараагийн слайд"
          onClick={next}
          disabled={idx === total - 1}
        >
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>
        <span className="ctl__sep" />
        <button type="button" className="ctl__btn" aria-label="Бүх слайд (G)" onClick={() => setOverview(true)}>
          <LayoutGrid size={18} strokeWidth={2.2} />
        </button>
        <button type="button" className="ctl__btn" aria-label="Дэлгэц дүүргэх (F)" onClick={toggleFull}>
          {full ? <Minimize size={18} strokeWidth={2.2} /> : <Maximize size={18} strokeWidth={2.2} />}
        </button>
      </div>

      {overview ? (
        <Overview
          current={idx}
          onPick={(i) => {
            setOverview(false);
            goTo(i);
          }}
          onClose={() => setOverview(false)}
        />
      ) : null}
      {lightbox !== null ? (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";
import {
  Check,
  Fingerprint,
  Heart,
  Languages,
  Layers,
  Network,
  PawPrint,
  QrCode,
  Radio,
  Repeat,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Syringe,
  X,
  Zap,
} from "lucide-react";
import {
  BMC,
  BUSINESS,
  FB_POST_IMAGES,
  IMAGES,
  MARKET,
  NEXT,
  PASSPORT,
  PROBLEM,
  SHOP,
  SOLUTION,
  STATUS,
  VISION,
  WHAT_IS,
  type BmcBlock,
  type Phase,
} from "./deckContent";
import {
  ComplySlide,
  DataSlide,
  IotSlide,
  LawSlide,
  MatrixSlide,
  MeetSlide,
  ProductsSlide,
  PhasesSlide,
  SourcesSlide,
  WsMapSlide,
} from "./slides2";

export type SlideProps = { onOpenImage: (index: number) => void };
export type SlideDef = {
  id: string;
  /** Footer болон overview дээр харагдах товч нэр */
  label: string;
  tone: "light" | "dark";
  /** true бол footer-ийг нуух (cover) */
  bare?: boolean;
  Component: ComponentType<SlideProps>;
};

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const ICONS: Record<string, IconType> = {
  passport: Fingerprint,
  find: ScanSearch,
  shop: ShoppingBag,
  vet: Stethoscope,
  iot: Radio,
  insurance: ShieldCheck,
  profile: PawPrint,
  health: Syringe,
  qr: QrCode,
  fast: Zap,
  sparkle: Sparkles,
  repeat: Repeat,
  loyalty: Heart,
  network: Network,
  flag: Languages,
  layers: Layers,
};

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");
/** Staggered reveal: i дарааллаар гарч ирнэ */
const rv = (i: number): CSSProperties => ({ ["--i" as string]: i });

function Icon({ name, className }: { name: string; className?: string }) {
  const I = ICONS[name] ?? PawPrint;
  return <I className={className} strokeWidth={1.9} />;
}

function Head({
  kicker,
  title,
  lead,
  compact,
}: {
  kicker: string;
  title: string;
  lead?: string;
  compact?: boolean;
}) {
  return (
    <header className={cx("head", compact && "head--compact")}>
      <p className="kicker rv" style={rv(0)}>
        <span className="kicker__dot" />
        {kicker}
      </p>
      <h2 className="h1 rv" style={rv(1)}>
        {title}
      </h2>
      {lead ? (
        <p className="lead rv" style={rv(2)}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}

function PhaseTag({ phase }: { phase: Phase }) {
  return <span className={cx("ptag", `ptag--${phase}`)}>{phase}</span>;
}

function Tick({ tone = "orange" }: { tone?: "orange" | "green" | "light" }) {
  return (
    <span className={cx("tick", `tick--${tone}`)}>
      <Check className="tick__i" strokeWidth={3.2} />
    </span>
  );
}

/* ═════════════ 01 · Cover ═════════════ */

function Cover() {
  return (
    <div className="cover">
      <div className="cover__left">
        <div className="brand rv" style={rv(0)}>
          <span className="brand__mark">
            <PawPrint className="brand__icon" strokeWidth={2.4} />
          </span>
          <span className="brand__word">Petti</span>
        </div>

        <div className="cover__main">
          <p className="pill rv" style={rv(1)}>
            Монголын тэжээвэр амьтны экосистем
          </p>
          <h1 className="cover__title rv" style={rv(2)}>
            Амьтан бүр
            <br />
            өөрийн ID-тай.
            <br />
            Алдагдсан ч <em>олдог.</em>
          </h1>
          <p className="cover__lead rv" style={rv(3)}>
            Дижитал паспорт, зургаар таних AI хайлт, шуурхай хүргэлттэй дэлгүүр — нэг аппд.
          </p>
          <div className="cover__verbs rv" style={rv(4)}>
            <span>Таних</span>
            <i />
            <span>Олох</span>
            <i />
            <span>Авах</span>
          </div>
        </div>

        <p className="cover__meta rv" style={rv(5)}>
          Pitch deck · 2026 оны 10-р сар · Улаанбаатар
        </p>
      </div>

      <div className="cover__right">
        <Image
          src={IMAGES.cover}
          alt="Petti QR хүзүүвчтэй нохой"
          fill
          priority
          sizes="860px"
          className="cover__img"
        />
      </div>
    </div>
  );
}

/* ═════════════ 02 · Petti гэж юу вэ ═════════════ */

function WhatIs() {
  return (
    <>
      <Head kicker={WHAT_IS.kicker} title={WHAT_IS.title} lead={WHAT_IS.lead} />
      <div className="what">
        {WHAT_IS.pillars.map((p, i) => (
          <article key={p.name} className="card what__card rv" style={rv(3 + i)}>
            <div className="what__top">
              <span className="what__verb">{p.verb}</span>
              <span className="iconbox">
                <Icon name={p.icon} className="iconbox__i" />
              </span>
            </div>
            <h3 className="what__name">{p.product}</h3>
            <p className="what__sub">{p.name}</p>
            <p className="what__text">{p.text}</p>
          </article>
        ))}
      </div>
      <div className="what__foot rv" style={rv(7)}>
        {WHAT_IS.foot.map((f) => (
          <span key={f.text} className="what__foot-item">
            <PhaseTag phase={f.phase} />
            {f.text}
          </span>
        ))}
      </div>
    </>
  );
}

/* ═════════════ 03 · Асуудал ═════════════ */

function Problem({ onOpenImage }: SlideProps) {
  return (
    <>
      <Head kicker={PROBLEM.kicker} title={PROBLEM.title} lead={PROBLEM.lead} />
      <div className="problem">
        <div className="problem__wall rv" style={rv(3)}>
          <div className="wall">
            {FB_POST_IMAGES.map((src, i) => (
              <button
                key={src}
                type="button"
                className="wall__item"
                aria-label={`Facebook зар ${i + 1} — томруулах`}
                onClick={() => onOpenImage(i)}
              >
                <Image
                  src={src}
                  alt={`Facebook pet зарын скриншот ${i + 1}`}
                  width={1376}
                  height={1556}
                  sizes="260px"
                  className="wall__img"
                  priority
                />
              </button>
            ))}
          </div>
          <p className="wall__hint">
            <span className="wall__live" />
            {PROBLEM.wallHint}
          </p>
        </div>

        <div className="problem__side">
          {PROBLEM.pains.map((p, i) => (
            <div key={p.who} className="pain card rv" style={rv(4 + i)}>
              <span className="pain__who">{p.who}</span>
              <p className="pain__text">{p.text}</p>
            </div>
          ))}
          <p className="problem__root rv" style={rv(7)}>
            {PROBLEM.root}
          </p>
          <div className="stats rv" style={rv(8)}>
            {PROBLEM.stats.map((s) => (
              <div key={s.label} className="stats__item">
                <p className="stats__v">{s.value}</p>
                <p className="stats__l">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="note">{PROBLEM.statsNote}</p>
        </div>
      </div>
    </>
  );
}

/* ═════════════ 04 · Сценар ═════════════ */

function Solution() {
  // Холбогч зураасууд: 1696×536 хайрцгийн дотор (картууд 168px өндөр, 16px зайтай)
  const ys = [84, 268, 452];
  return (
    <>
      <Head kicker={SOLUTION.kicker} title={SOLUTION.title} lead={SOLUTION.lead} />
      <div className="hub">
        <svg className="hub__lines" viewBox="0 0 1696 536" aria-hidden>
          {ys.map((y) => (
            <path key={`l${y}`} d={`M540 ${y} C 610 ${y}, 610 268, 678 268`} className="hub__line" />
          ))}
          {ys.map((y) => (
            <path key={`r${y}`} d={`M1156 ${y} C 1086 ${y}, 1086 268, 1018 268`} className="hub__line hub__line--v2" />
          ))}
        </svg>

        <div className="hub__col hub__col--l">
          <p className="hub__label">
            <PhaseTag phase="v1" /> Эхний хувилбар
          </p>
          {SOLUTION.v1.map((c, i) => (
            <div key={c.title} className="hub__card hub__card--v1 rv" style={rv(3 + i)}>
              <span className="iconbox iconbox--fill">
                <Icon name={c.icon} className="iconbox__i" />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hub__center rv" style={rv(2)}>
          <div className="hub__ring">
            <Image
              src={IMAGES.closing}
              alt=""
              fill
              sizes="380px"
              className="hub__photo"
            />
          </div>
          <span className="hub__badge">{SOLUTION.centerLabel}</span>
        </div>

        <div className="hub__col hub__col--r">
          <p className="hub__label">
            <PhaseTag phase="v2" /> Дараагийн хувилбар
          </p>
          {SOLUTION.v2.map((c, i) => (
            <div key={c.title} className="hub__card hub__card--v2 rv" style={rv(6 + i)}>
              <span className="iconbox">
                <Icon name={c.icon} className="iconbox__i" />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═════════════ 06 · Дижитал паспорт ═════════════ */

function Passport() {
  return (
    <>
      <Head kicker={PASSPORT.kicker} title={PASSPORT.title} />
      <div className="pass">
        <div className="pass__left">
          <div className="pass__grid">
            {PASSPORT.points.map((p, i) => (
              <div key={p.title} className="card pass__card rv" style={rv(2 + i)}>
                <span className="iconbox iconbox--fill">
                  <Icon name={p.icon} className="iconbox__i" />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="cmp rv" style={rv(6)}>
            <div className="cmp__col cmp__col--old">
              <p className="cmp__h">Цаасан дэвтэр</p>
              <ul>
                {PASSPORT.compare.paper.map((t) => (
                  <li key={t}>
                    <X className="cmp__i" strokeWidth={2.6} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cmp__col cmp__col--new">
              <p className="cmp__h">Petti паспорт</p>
              <ul>
                {PASSPORT.compare.petti.map((t) => (
                  <li key={t}>
                    <Check className="cmp__i" strokeWidth={3} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pass__img rv" style={rv(3)}>
          <Image
            src={IMAGES.passport}
            alt="QR хүзүүвчтэй нохойн зураг"
            fill
            sizes="560px"
            className="pass__photo"
          />
        </div>
      </div>
    </>
  );
}

/* ═════════════ 07 · AI Vision ═════════════ */

function Vision() {
  return (
    <>
      <Head compact kicker={VISION.kicker} title={VISION.title} />
      <div className="vis">
        <div className="vis__left rv" style={rv(2)}>
          <div className="vis__frame">
            <Image
              src={IMAGES.visionPipeline}
              alt="AI-ийн алхмууд: хайх, таслах, онцлог гаргах, ангилах"
              width={1180}
              height={794}
              sizes="760px"
              className="vis__img"
            />
          </div>
        </div>

        <div className="vis__right">
          <p className="vis__lead rv" style={rv(3)}>
            {VISION.lead}
          </p>
          <ol className="vis__steps">
            {VISION.steps.map((s, i) => (
              <li key={s.n} className="rv" style={rv(4 + i)}>
                <span className="vis__n">{s.n}</span>
                <span>
                  <strong>{s.title}</strong>
                  <em>{s.text}</em>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="vis__metrics">
        {VISION.metrics.map((m, i) => (
          <div key={m.label} className="metric rv" style={rv(9 + i)}>
            <p className="metric__v">{m.value}</p>
            <p className="metric__l">{m.label}</p>
            <p className="metric__s">{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="vis__foot rv" style={rv(13)}>
        <p className="vis__local">
          <PawPrint className="vis__local-i" strokeWidth={2} />
          {VISION.local}
        </p>
        <p className="vis__caveat">{VISION.caveat}</p>
      </div>
    </>
  );
}

/* ═════════════ 08 · Дэлгүүр ═════════════ */

function Shop() {
  return (
    <>
      <Head kicker={SHOP.kicker} title={SHOP.title} lead={SHOP.lead} />
      <div className="shop">
        <div className="card shop__built rv" style={rv(3)}>
          <p className="chip chip--green">
            <span className="chip__dot" />
            {SHOP.built.label}
          </p>
          <ul className="shop__list">
            {SHOP.built.items.map((t) => (
              <li key={t}>
                <Tick tone="green" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="shop__next">
          <p className="chip rv" style={rv(3)}>
            <PhaseTag phase="v2" />
            {SHOP.next.label}
          </p>
          {SHOP.next.items.map((c, i) => (
            <div key={c.title} className="card shop__nitem rv" style={rv(4 + i)}>
              <span className="iconbox">
                <Icon name={c.icon} className="iconbox__i" />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="shop__brands rv" style={rv(8)}>
        {SHOP.brands}
      </p>
    </>
  );
}

/* ═════════════ 09 · Одоогийн байдал ═════════════ */

function Status() {
  return (
    <>
      <Head compact kicker={STATUS.kicker} title={STATUS.title} />
      <div className="stt">
        <div className="stt__col">
          <p className="chip chip--green rv" style={rv(2)}>
            <span className="chip__dot" />
            {STATUS.built.label}
          </p>
          {STATUS.built.items.map((c, i) => (
            <div key={c.title} className="card stt__big rv" style={rv(3 + i)}>
              <Tick tone="green" />
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="stt__col">
          <p className="chip rv" style={rv(2)}>
            <span className="chip__dot chip__dot--orange" />
            {STATUS.todo.label}
          </p>
          {STATUS.todo.items.map((c, i) => (
            <div key={c.title} className="card stt__small rv" style={rv(3 + i)}>
              <span className="stt__num">{i + 1}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="stt__col stt__col--team">
          <p className="chip rv" style={rv(2)}>
            {STATUS.team.label}
          </p>
          <div className="team rv" style={rv(3)}>
            {STATUS.team.names.map((n) => (
              <div key={n} className="team__p">
                <span className="team__av">{n.slice(0, 1)}</span>
                <span className="team__n">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═════════════ 10 · Давуу тал ═════════════ */

function Market() {
  return (
    <>
      <Head kicker={MARKET.kicker} title={MARKET.title} />
      <div className="mkt">
        <div className="mkt__left">
          <div className="mkt__big rv" style={rv(2)}>
            <PawPrint className="mkt__big-i" strokeWidth={1.4} />
            <p className="mkt__big-v">{MARKET.bigStat.value}</p>
            <p className="mkt__big-l">{MARKET.bigStat.label}</p>
            <p className="mkt__big-n">{MARKET.bigStat.note}</p>
          </div>
          <div className="card mkt__start rv" style={rv(3)}>
            <p className="mkt__start-h">{MARKET.start.title}</p>
            <p>{MARKET.start.text}</p>
          </div>
        </div>

        <div className="mkt__grid">
          {MARKET.segments.map((s, i) => (
            <div key={s.name} className={cx("card mkt__seg rv", s.phase === "v1" && "mkt__seg--v1")} style={rv(3 + i)}>
              <PhaseTag phase={s.phase} />
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═════════════ 12 · Бизнес модель ═════════════ */

function Business() {
  return (
    <>
      <Head kicker={BUSINESS.kicker} title={BUSINESS.title} />
      <div className="biz">
        <div className="biz__rev">
          <p className="biz__h rv" style={rv(2)}>
            Орлогын эх үүсвэр
          </p>
          <div className="biz__grid">
            {BUSINESS.revenue.map((r, i) => (
              <div key={r.title} className={cx("card biz__card rv", r.phase === "v1" && "biz__card--v1")} style={rv(3 + i)}>
                <PhaseTag phase={r.phase} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="biz__cost card rv" style={rv(4)}>
          <p className="biz__h">{BUSINESS.costs.title}</p>
          <ul>
            {BUSINESS.costs.items.map((c) => (
              <li key={c.text}>
                <PhaseTag phase={c.phase} />
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ═════════════ 13 · Roadmap ═════════════ */

function BmcCell({ block, area, i, accent }: { block: BmcBlock; area: string; i: number; accent?: boolean }) {
  return (
    <div className={cx("bmc__cell rv", `bmc__cell--${area}`, accent && "bmc__cell--accent")} style={rv(i)}>
      <p className="bmc__t">{block.title}</p>
      <ul>
        {block.items.map((it) => (
          <li key={it.text}>
            <span className={cx("bmc__dot", `bmc__dot--${it.phase}`)} />
            {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bmc() {
  return (
    <>
      <header className="head head--compact head--row">
        <div>
          <p className="kicker rv" style={rv(0)}>
            <span className="kicker__dot" />
            Хавсралт · Business Model Canvas
          </p>
          <h2 className="h1 rv" style={rv(1)}>
            Business Model Canvas
          </h2>
        </div>
        <p className="bmc__legend rv" style={rv(2)}>
          <span className="bmc__dot bmc__dot--v1" /> v1 · MVP
          <span className="bmc__dot bmc__dot--v2" /> v2 · Scale
        </p>
      </header>
      <div className="bmc">
        <BmcCell area="partners" block={BMC.partners} i={3} />
        <BmcCell area="activities" block={BMC.activities} i={4} />
        <BmcCell area="resources" block={BMC.resources} i={5} />
        <BmcCell area="value" block={BMC.value} i={6} accent />
        <BmcCell area="relationships" block={BMC.relationships} i={7} />
        <BmcCell area="channels" block={BMC.channels} i={8} />
        <BmcCell area="segments" block={BMC.segments} i={9} />
        <BmcCell area="cost" block={BMC.cost} i={10} />
        <BmcCell area="revenue" block={BMC.revenue} i={11} />
      </div>
    </>
  );
}

/* ═════════════ 16 · Дараагийн алхам ═════════════ */

function Next() {
  return (
    <div className="next">
      <div className="next__left">
        <p className="kicker rv" style={rv(0)}>
          <span className="kicker__dot" />
          {NEXT.kicker}
        </p>
        <h2 className="h1 next__title rv" style={rv(1)}>
          {NEXT.title}
        </h2>

        <div className="next__cols">
          <div className="rv" style={rv(2)}>
            <p className="next__label">{NEXT.decisionsLabel}</p>
            <ul className="next__list">
              {NEXT.decisions.map((t) => (
                <li key={t}>
                  <Tick tone="light" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rv" style={rv(3)}>
            <p className="next__label">{NEXT.planLabel}</p>
            <ol className="next__plan">
              {NEXT.plan.map((t, i) => (
                <li key={t}>
                  <span>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="cover__verbs next__verbs rv" style={rv(4)}>
          <span>Таних</span>
          <i />
          <span>Олох</span>
          <i />
          <span>Авах</span>
        </div>
      </div>

      <div className="next__right">
        <Image
          src={IMAGES.closing}
          alt="Petti QR хүзүүвчтэй нохой"
          fill
          sizes="560px"
          className="next__img"
        />
        <div className="next__brand">
          <span className="brand__mark">
            <PawPrint className="brand__icon" strokeWidth={2.4} />
          </span>
          Petti
        </div>
      </div>
    </div>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "cover", label: "Petti", tone: "light", bare: true, Component: Cover },
  { id: "what", label: "Petti гэж юу вэ", tone: "light", Component: WhatIs },
  { id: "problem", label: "Асуудал", tone: "light", Component: Problem },
  { id: "data", label: "Тоо баримт", tone: "light", Component: DataSlide },
  { id: "solution", label: "Шийдэл", tone: "light", Component: Solution },
  { id: "products", label: "3 бүтээгдэхүүн", tone: "light", Component: ProductsSlide },
  { id: "passport", label: "Дижитал паспорт", tone: "light", Component: Passport },
  { id: "vision", label: "AI зургийн хайлт", tone: "dark", Component: Vision },
  { id: "shop", label: "Дэлгүүр", tone: "light", Component: Shop },
  { id: "status", label: "Одоогийн байдал", tone: "light", Component: Status },
  { id: "market", label: "Хэрэглэгч", tone: "light", Component: Market },
  { id: "law", label: "Хууль эрх зүй", tone: "light", Component: LawSlide },
  { id: "business", label: "Бизнес модель", tone: "light", Component: Business },
  { id: "meet", label: "Багийн хурал", tone: "dark", Component: MeetSlide },
  { id: "wsmap", label: "5 урсгал", tone: "light", Component: WsMapSlide },
  { id: "phases", label: "6 phase", tone: "light", Component: PhasesSlide },
  { id: "matrix", label: "Урсгал × Phase", tone: "light", Component: MatrixSlide },
  { id: "next", label: "Дараагийн алхам", tone: "dark", bare: true, Component: Next },
  { id: "comply", label: "Хавсралт · Хууль", tone: "light", Component: ComplySlide },
  { id: "iot", label: "Хавсралт · GPS", tone: "light", Component: IotSlide },
  { id: "bmc", label: "Хавсралт · BMC", tone: "light", Component: Bmc },
  { id: "sources", label: "Эх сурвалж", tone: "light", Component: SourcesSlide },
];

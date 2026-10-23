/* eslint-disable @next/next/no-img-element */
import type { ComponentType, CSSProperties } from "react";
import { ArrowRight, X } from "lucide-react";
import {
  ARCH,
  COVER,
  FB_SHOTS,
  GPS,
  IMAGES,
  JOURNEY,
  MARKET,
  MATRIX,
  PARTS,
  PROBLEM,
  RISKS,
  ROADMAP,
  SOLUTION,
  START,
  STRUCTURE,
  TEAM,
  ORDER,
  VISION,
  WHY_NOW,
  type ProductId,
} from "./content";

export type SlideProps = { onOpenImage: (index: number) => void };
export type SlideDef = {
  id: string;
  label: string;
  tone: "light" | "dark";
  bare?: boolean;
  Component: ComponentType<SlideProps>;
};

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const d = (i: number) => ({ "--i": i }) as CSSProperties;

/* ───────── Лого: «pettı» + i-гийн цэг (таг). Feature бүр цэгийн хэлбэрээр ялгарна ───────── */

type Glyph = "dot" | ProductId;

export function Logo({ glyph = "dot", className, word }: { glyph?: Glyph; className?: string; word?: string }) {
  return (
    <span className={cx("lg", className)} aria-label={word ? `petti ${word}` : "petti"}>
      <span className="lg__mark" aria-hidden>
        pett
        <span className="lg__i">
          ı
          {glyph === "passport" ? (
            <svg className="lg__g lg__g--passport" viewBox="0 0 20 27">
              <circle cx="10" cy="9" r="9" />
              <path d="M6.5 13L4.5 27h11l-2-14z" />
            </svg>
          ) : (
            <span className={`lg__g lg__g--${glyph}`} />
          )}
        </span>
      </span>
      {word ? <span className="lg__word">{word}</span> : null}
    </span>
  );
}

function Head({ n, kicker, title, part = "intro" }: { n: number; kicker: string; title: string; part?: "intro" | "plan" }) {
  return (
    <header className="hd">
      <div className="hd__k rv" style={d(0)}>
        <span>{String(n).padStart(2, "0")} — {kicker}</span>
        <i />
        <span>{PARTS[part]}</span>
      </div>
      <h2 className="hd__t rv" style={d(1)}>
        {title}
      </h2>
    </header>
  );
}

const Src = ({ children }: { children: string }) => <p className="src">{children}</p>;

/* ───────── 01 · Нүүр ───────── */

function Cover() {
  return (
    <div className="cv">
      <div className="cv__l">
        <Logo className="cv__logo rv" />
        <div className="cv__mid">
          <h1 className="cv__t rv" style={d(1)}>
            {COVER.title}
          </h1>
          <p className="cv__lead rv" style={d(2)}>
            {COVER.lead}
          </p>
          <div className="cv__trio rv" style={d(3)}>
            <Logo glyph="passport" word="passport" />
            <Logo glyph="vision" word="vision" />
            <Logo glyph="shop" word="shop" />
          </div>
        </div>
        <p className="cv__meta rv" style={d(4)}>
          {COVER.meta}
        </p>
      </div>
      <figure className="cv__r">
        <img src={IMAGES.cover} alt="Улаан хүзүүвч, таг зүүсэн нохой" />
        <figcaption>{COVER.figure}</figcaption>
      </figure>
    </div>
  );
}

/* ───────── 02 · Асуудал ───────── */

function Problem({ onOpenImage }: SlideProps) {
  return (
    <>
      <Head n={2} kicker={PROBLEM.kicker} title={PROBLEM.title} />
      <div className="body pb">
        <div className="pb__stats">
          {PROBLEM.stats.map((s, i) => (
            <div key={s.value} className={cx("bigrow rv", s.accent && "bigrow--red")} style={d(2 + i)}>
              <span className="bigrow__v">{s.value}</span>
              <span className="bigrow__l">
                {s.label}
                <em>{s.note}</em>
              </span>
            </div>
          ))}
        </div>
        <div className="pb__lost card rv" style={d(3)}>
          <p className="mono">{PROBLEM.lostTitle}</p>
          <ol className="steps">
            {PROBLEM.lost.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <div className="shots">
            {FB_SHOTS.slice(0, 3).map((src, i) => (
              <button key={src} type="button" className="shot" onClick={() => onOpenImage(i)} aria-label={`Зарын скриншот ${i + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <p className="mono mono--muted">{PROBLEM.shotsHint}</p>
          <p className="pb__root">{PROBLEM.root}</p>
        </div>
      </div>
      <Src>{PROBLEM.source}</Src>
    </>
  );
}

/* ───────── 03 · Яагаад одоо ───────── */

function WhyNow() {
  return (
    <>
      <Head n={3} kicker={WHY_NOW.kicker} title={WHY_NOW.title} />
      <div className="body wn">
        <div className="wn__law card rv" style={d(2)}>
          <span className="tag">{WHY_NOW.law.tag}</span>
          <table className="tbl">
            <thead>
              <tr>
                <th>Хуулийн шаардлага</th>
                <th>Хугацаа</th>
                <th>Petti</th>
              </tr>
            </thead>
            <tbody>
              {WHY_NOW.law.rows.map((r) => (
                <tr key={r.req}>
                  <td className="strong">{r.req}</td>
                  <td className="mono-cell">{r.when}</td>
                  <td>
                    <span className="arrow">
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </span>
                    {r.petti}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="wn__gap">
            <span className="wn__gapv">{WHY_NOW.gap.value}</span>
            <span>
              {WHY_NOW.gap.label}
              <em>{WHY_NOW.gap.note}</em>
            </span>
          </div>
        </div>
        <div className="wn__world">
          <p className="mono rv" style={d(3)}>
            Бусад улсад
          </p>
          {WHY_NOW.world.map((w, i) => (
            <div key={w.country} className="wcard rv" style={d(4 + i)}>
              <span className="mono mono--muted">{w.country}</span>
              <span className="wcard__v">{w.value}</span>
              <span className="wcard__t">{w.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Src>{WHY_NOW.source}</Src>
    </>
  );
}

/* ───────── 04 · Шийдэл ───────── */

function Solution() {
  return (
    <>
      <Head n={4} kicker={SOLUTION.kicker} title={SOLUTION.title} />
      <div className="body sol">
        <div className="sol__grid">
          {SOLUTION.products.map((p, i) => (
            <article key={p.id} className={cx("pcard rv", `pcard--${p.id}`)} style={d(2 + i)}>
              <div className="pcard__top">
                <Logo glyph={p.id} word={p.name} />
                <span className="pcard__role">{p.role}</span>
              </div>
              <p className="pcard__one">{p.one}</p>
              <ul className="ticks">
                {p.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="pcard__state">{p.state}</span>
            </article>
          ))}
        </div>
        <div className="flow rv" style={d(5)}>
          {SOLUTION.flow.map((t, i) => (
            <span key={t} className="flow__i">
              {i > 0 ? <ArrowRight size={22} strokeWidth={2.2} /> : null}
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ───────── 05 · Хэрэглэгчийн аялал ───────── */

function Journey() {
  return (
    <>
      <Head n={5} kicker={JOURNEY.kicker} title={JOURNEY.title} />
      <div className="body jr">
        <div className="jr__col jr__col--before rv" style={d(2)}>
          <span className="tag tag--line">{JOURNEY.before.label}</span>
          <ol className="jr__steps">
            {JOURNEY.before.steps.map((t) => (
              <li key={t}>
                <X size={22} strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ol>
          <p className="jr__res">{JOURNEY.before.result}</p>
        </div>
        <div className="jr__col jr__col--after rv" style={d(3)}>
          <span className="tag tag--red">{JOURNEY.after.label}</span>
          <ol className="jr__steps">
            {JOURNEY.after.steps.map((t, i) => (
              <li key={t}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {t}
              </li>
            ))}
          </ol>
          <p className="jr__res">{JOURNEY.after.result}</p>
        </div>
      </div>
    </>
  );
}

/* ───────── 06 · Petti Vision ───────── */

function Vision() {
  return (
    <>
      <Head n={6} kicker={VISION.kicker} title={VISION.title} />
      <div className="body vs">
        <figure className="vs__fig rv" style={d(2)}>
          <img src={IMAGES.vision} alt="Хар дэвсгэр дээрх нохойн хөрөг" />
          <span className="br br--tl" />
          <span className="br br--tr" />
          <span className="br br--bl" />
          <span className="br br--br" />
          <span className="vs__tag">{VISION.tag}</span>
          <figcaption>{VISION.credit}</figcaption>
        </figure>
        <div className="vs__r">
          <div className="vs__steps">
            {VISION.steps.map((s, i) => (
              <div key={s.n} className="vstep rv" style={d(3 + i)}>
                <span className="vstep__n">{s.n}</span>
                <span className="vstep__t">{s.title}</span>
                <span className="vstep__s">{s.text}</span>
              </div>
            ))}
          </div>
          <div className="vs__metrics">
            {VISION.metrics.map((m, i) => (
              <div key={m.label} className="metric rv" style={d(5 + i)}>
                <span className="metric__v">{m.value}</span>
                <span className="metric__l">{m.label}</span>
                <span className="metric__s">{m.sub}</span>
              </div>
            ))}
          </div>
          <div className="vs__local rv" style={d(8)}>
            <span className="vs__localv">{VISION.local.value}</span>
            <span>{VISION.local.text}</span>
          </div>
          <p className="vs__cav">{VISION.caveat}</p>
        </div>
      </div>
    </>
  );
}

/* ───────── 07 · Зах зээл ба орлого ───────── */

function Market() {
  return (
    <>
      <Head n={7} kicker={MARKET.kicker} title={MARKET.title} />
      <div className="body mk">
        <div className="mk__size">
          {MARKET.size.map((s, i) => (
            <div key={s.value} className={cx("bigrow bigrow--sm rv", i === 1 && "bigrow--red")} style={d(2 + i)}>
              <span className="bigrow__v">{s.value}</span>
              <span className="bigrow__l">
                {s.label}
                <em>{s.note}</em>
              </span>
            </div>
          ))}
        </div>
        <div className="mk__r">
          <div className="card rv" style={d(3)}>
            <p className="mono">Хэрэглэгч</p>
            {MARKET.segments.map((s) => (
              <div key={s.name} className="li">
                <span className={cx("ph", s.phase === "v2" && "ph--later")}>{s.phase}</span>
                <span className="li__t">{s.name}</span>
                <span className="li__s">{s.text}</span>
              </div>
            ))}
          </div>
          <div className="card card--ink rv" style={d(4)}>
            <p className="mono">Орлогын эх үүсвэр</p>
            {MARKET.revenue.map((s) => (
              <div key={s.name} className="li">
                <span className={cx("ph", s.phase === "v2" && "ph--later")}>{s.phase}</span>
                <span className="li__t">{s.name}</span>
                <span className="li__s">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Src>{MARKET.source}</Src>
    </>
  );
}

/* ───────── 08 · GPS хүзүүвч ───────── */

function Gps() {
  const max = Math.max(...GPS.prices.map((p) => p.usd));
  return (
    <>
      <Head n={8} kicker={GPS.kicker} title={GPS.title} />
      <div className="body gp">
        <div className="card gp__prices rv" style={d(2)}>
          <p className="mono">{GPS.priceTitle}</p>
          {GPS.prices.map((p) => (
            <div key={p.name} className="bar">
              <span className="bar__n">
                {p.name}
                <em>{p.sub}</em>
              </span>
              <span className="bar__track">
                <span className="bar__fill" style={{ width: `${(p.usd / max) * 100}%` }} />
              </span>
              <span className="bar__v">${p.usd}</span>
            </div>
          ))}
          <p className="gp__insight">{GPS.insight}</p>
        </div>
        <div className="gp__r">
          {GPS.stages.map((s, i) => (
            <div key={s.title} className={cx("stage3 rv", s.now && "stage3--now")} style={d(3 + i)}>
              <span className="mono">{s.range}</span>
              <span className="stage3__t">{s.title}</span>
              <span className="stage3__s">{s.text}</span>
              {s.now ? <span className="tag tag--red stage3__now">Одоо</span> : null}
            </div>
          ))}
          <p className="gp__next rv" style={d(6)}>
            {GPS.next}
          </p>
        </div>
      </div>
      <Src>{GPS.source}</Src>
    </>
  );
}

/* ───────── 09 · Төслийн бүтэц ───────── */

function Structure() {
  return (
    <>
      <Head n={9} kicker={STRUCTURE.kicker} title={STRUCTURE.title} part="plan" />
      <div className="body sx">
        <div className="sx__goal rv" style={d(2)}>
          <span className="mono">{STRUCTURE.goalLabel}</span>
          <span className="sx__goalt">{STRUCTURE.goal}</span>
          <Logo />
        </div>
        <div className="sx__products">
          {STRUCTURE.products.map((p, i) => (
            <article key={p.id} className={cx("sxp rv", `sxp--${p.id}`)} style={d(3 + i)}>
              <div className="sxp__top">
                <Logo glyph={p.id} word={p.name} />
                <span className="sxp__num">{p.num}</span>
              </div>
              <p className="sxp__m">{p.mission}</p>
              <ul className="ticks">
                {p.scope.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="sxp__kpi">
                <span className="mono">Зорилт</span>
                <b>{p.kpi}</b>
              </div>
            </article>
          ))}
        </div>
        <div className="sx__base rv" style={d(6)}>
          <span className="mono sx__baselabel">{STRUCTURE.baseLabel}</span>
          {STRUCTURE.base.map((b) => (
            <div key={b.num} className="sxb">
              <span className="sxb__num">{b.num}</span>
              <p className="sxb__name">{b.name}</p>
              <ul>
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ───────── 10 · Roadmap ───────── */
function Roadmap() {
  const n = ROADMAP.months.length;
  return (
    <>
      <Head n={10} kicker={ROADMAP.kicker} title={ROADMAP.title} part="plan" />
      <div className="body rm">
        <div className="rm__chart rv" style={d(2)}>
          <div className="rm__years" style={{ gridTemplateColumns: `260px repeat(${n}, 1fr)` }}>
            <span />
            {ROADMAP.years.map((y) => (
              <span key={y.label} style={{ gridColumn: `span ${y.span}` }}>
                {y.label}
              </span>
            ))}
          </div>
          <div className="rm__months" style={{ gridTemplateColumns: `260px repeat(${n}, 1fr)` }}>
            <span />
            {ROADMAP.months.map((m, i) => (
              <span key={i} className={i === 0 ? "rm__today" : undefined}>
                {m}
              </span>
            ))}
          </div>
          {ROADMAP.phases.map((p, i) => {
            const inside = p.end - p.start >= 5;
            return (
              <div key={p.id} className="rm__row" style={{ gridTemplateColumns: `260px repeat(${n}, 1fr)` }}>
                <span className="rm__label">
                  <b>{p.id}</b>
                  {p.name}
                </span>
                <span
                  className={cx("rm__bar rv", p.now && "rm__bar--now")}
                  style={{ gridColumn: `${p.start + 2} / ${p.end + 2}`, ...d(3 + i) }}
                >
                  <span className="rm__when">{p.when}</span>
                  {inside ? <span className="rm__exit">{p.exit}</span> : null}
                </span>
                {!inside ? (
                  <span className="rm__exit rm__exit--out" style={{ gridColumn: `${p.end + 2} / -1` }}>
                    {p.exit}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="note">{ROADMAP.note}</p>
      </div>
    </>
  );
}

/* ───────── 11 · Урсгал × Phase ───────── */

function Matrix() {
  return (
    <>
      <Head n={11} kicker={MATRIX.kicker} title={MATRIX.title} part="plan" />
      <div className="body mx">
        <table className="mx__t rv" style={d(2)}>
          <thead>
            <tr>
              <th />
              {ROADMAP.phases.map((p) => (
                <th key={p.id} className={p.now ? "mx__now" : undefined}>
                  <b>{p.id}</b>
                  <span>{p.name}</span>
                  <em>{p.when}</em>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.rows.map((r) => (
              <tr key={r.name}>
                <th scope="row">
                  {r.glyph ? <Logo glyph={r.glyph} word={r.name.toLowerCase()} /> : <span className="mx__base">{r.name}</span>}
                </th>
                {r.cells.map((c, i) => (
                  <td key={i} className={i === 0 ? "mx__now" : undefined}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">{MATRIX.note}</p>
      </div>
    </>
  );
}

/* ───────── 12 · Баг ба төсөв ───────── */

function Team() {
  return (
    <>
      <Head n={12} kicker={TEAM.kicker} title={TEAM.title} part="plan" />
      <div className="body tm">
        <div className="card tm__team rv" style={d(2)}>
          <p className="mono">{TEAM.teamLabel}</p>
          {TEAM.members.map((m) => (
            <div key={m.name} className="tm__row">
              <span className="tm__n">{m.name}</span>
              <span className="tm__r">
                <b>{m.role}</b>
                <em>{m.sub}</em>
              </span>
            </div>
          ))}
          <div className="tm__need">
            <span className="mono">{TEAM.needLabel}</span>
            {TEAM.need.map((t) => (
              <span key={t} className="tm__chip">
                {t}
              </span>
            ))}
          </div>
          <p className="tm__plan">{TEAM.plan}</p>
        </div>
        <div className="card card--ink tm__bud rv" style={d(3)}>
          <p className="mono">{TEAM.budgetLabel}</p>
          <p className="tm__total">{TEAM.total}</p>
          {TEAM.lines.map((l) => (
            <div key={l.name} className="bar bar--b">
              <span className="bar__n">
                {l.name}
                <em>{l.sub}</em>
              </span>
              <span className="bar__track">
                <span className="bar__fill" style={{ width: `${l.w}%` }} />
              </span>
              <span className="bar__v">{l.v}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ───────── 13 · Эхний орлого ───────── */

function Order() {
  return (
    <>
      <Head n={13} kicker={ORDER.kicker} title={ORDER.title} part="plan" />
      <div className="body od">
        <figure className="od__hero rv" style={d(2)}>
          <img src={IMAGES.cover} alt="QR тагтай улаан нохойн хүзүүвч" />
          <div className="od__ht">
            <p className="mono">{ORDER.hero.label}</p>
            <p className="od__title">{ORDER.hero.title}</p>
            <p className="od__text">{ORDER.hero.text}</p>
            <div className="od__tags">
              {ORDER.hero.tags.map((t) => (
                <span key={t} className="tag tag--red">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </figure>
        <div className="od__r">
          <p className="mono rv" style={d(3)}>
            {ORDER.stepsLabel}
          </p>
          {ORDER.steps.map((s, i) => (
            <div key={s.n} className="od__step rv" style={d(3 + i)}>
              <span className="od__sn">{s.n}</span>
              <span className="od__st">{s.t}</span>
              <span className="od__ss">{s.s}</span>
            </div>
          ))}
          <p className="gp__next rv" style={d(8)}>
            {ORDER.next}
          </p>
        </div>
      </div>
    </>
  );
}

/* ───────── 14 · Vision архитектур ───────── */

function Arch() {
  return (
    <>
      <Head n={14} kicker={ARCH.kicker} title={ARCH.title} part="plan" />
      <div className="body ar">
        <div className="ar__diag rv" style={d(2)}>
          {ARCH.layers.map((l, i) => (
            <div key={l.name} className="ar__layer">
              <span className="ar__ln">{l.name}</span>
              <div className="ar__boxes">
                {l.boxes.map((b) => (
                  <span key={b.t} className={`ar__box ar__box--p${b.p}`}>
                    <b>{b.t}</b>
                    <em>{b.s}</em>
                    <i>{b.p}</i>
                  </span>
                ))}
              </div>
              {i < ARCH.layers.length - 1 ? <span className="ar__down" aria-hidden /> : null}
            </div>
          ))}
        </div>
        <div className="ar__r">
          {ARCH.stages.map((s, i) => (
            <div key={s.p} className={`ar__stage ar__stage--p${s.p} rv`} style={d(3 + i)}>
              <span className="ar__sn">{s.p}</span>
              <div>
                <p className="ar__st">{s.name}</p>
                <p className="ar__ss">{s.text}</p>
              </div>
            </div>
          ))}
          <div className="ar__dec rv" style={d(6)}>
            <p className="mono">Гол шийдвэр</p>
            {ARCH.decisions.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <Src>{ARCH.source}</Src>
    </>
  );
}

/* ───────── 15 · Эрсдэл ───────── */

function Risks() {
  return (
    <>
      <Head n={15} kicker={RISKS.kicker} title={RISKS.title} part="plan" />
      <div className="body">
        <table className="tbl tbl--risk rv" style={d(2)}>
          <thead>
            <tr>
              {RISKS.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RISKS.rows.map((r) => (
              <tr key={r.risk}>
                <td className="strong">{r.risk}</td>
                <td>{r.answer}</td>
                <td className="mono-cell">{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ───────── 16 · Эхлэх цэг ───────── */

function Start() {
  return (
    <div className="nx">
      <div className="nx__main">
        <div className="hd__k rv">
          <span>16 — {START.kicker}</span>
          <i />
          <span>{PARTS.plan}</span>
        </div>
        <h2 className="hd__t rv" style={d(1)}>
          {START.title}
        </h2>
        <div className="nx__months">
          {START.months.map((m, i) => (
            <div key={m.when} className={cx("nxm rv", i === 0 && "nxm--now")} style={d(2 + i)}>
              <div className="nxm__h">
                <span className="nxm__when">{m.when}</span>
                <span className="mono">{m.phase}</span>
              </div>
              <ul>
                {m.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <aside className="nx__side">
        <p className="mono">{START.readyLabel}</p>
        <ul>
          {START.ready.map((r) => (
            <li key={r.title}>
              <b>{r.title}</b>
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
        <p className="mono nx__teaml">Баг · {START.team.length} хүн</p>
        <p className="nx__team">{START.team.join(" · ")}</p>
        <div className="nx__end">
          <Logo />
          <p>{START.tagline}</p>
        </div>
      </aside>
    </div>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "cover", label: "Petti", tone: "light", bare: true, Component: Cover },
  { id: "problem", label: "Асуудал", tone: "light", Component: Problem },
  { id: "why-now", label: "Яагаад одоо", tone: "light", Component: WhyNow },
  { id: "solution", label: "Шийдэл", tone: "light", Component: Solution },
  { id: "journey", label: "Хэрхэн ажилладаг", tone: "light", Component: Journey },
  { id: "vision", label: "Petti Vision", tone: "dark", Component: Vision },
  { id: "market", label: "Зах зээл ба орлого", tone: "light", Component: Market },
  { id: "gps", label: "GPS хүзүүвч", tone: "light", Component: Gps },
  { id: "structure", label: "Төслийн бүтэц", tone: "light", Component: Structure },
  { id: "roadmap", label: "Roadmap", tone: "light", Component: Roadmap },
  { id: "matrix", label: "Урсгал × Phase", tone: "light", Component: Matrix },
  { id: "team", label: "Баг ба төсөв", tone: "light", Component: Team },
  { id: "order", label: "Эхний орлого", tone: "light", Component: Order },
  { id: "arch", label: "Vision архитектур", tone: "light", Component: Arch },
  { id: "risks", label: "Эрсдэл", tone: "light", Component: Risks },
  { id: "start", label: "Эхний 90 хоног", tone: "dark", bare: true, Component: Start },
];

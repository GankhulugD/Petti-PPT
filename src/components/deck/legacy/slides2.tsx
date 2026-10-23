"use client";

import type { ComponentType, CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  Cpu,
  Fingerprint,
  Handshake,
  Lock,
  Megaphone,
  Network,
  PawPrint,
  Radio,
  ScanSearch,
  ShoppingBag,
  ShoppingCart,
  Syringe,
  TriangleAlert,
} from "lucide-react";
import {
  COMPLY,
  DATA,
  IOT,
  LAW,
  MATRIX,
  PRODUCTS,
  MEET,
  PHASES,
  PLAN,
  SOURCES,
  WS,
  WSMAP,
  WS_DETAIL,
  type WsDetail,
} from "./content2";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const ICONS: Record<string, IconType> = {
  passport: Fingerprint,
  find: ScanSearch,
  shop: ShoppingBag,
  health: Syringe,
  network: Network,
  privacy: Lock,
  photo: Camera,
  cart: ShoppingCart,
  building: Building2,
  ai: Cpu,
  radio: Radio,
  megaphone: Megaphone,
  handshake: Handshake,
};

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");
const rv = (i: number): CSSProperties => ({ ["--i" as string]: i });
const fmt = (n: number) => n.toLocaleString("en-US");

function Ico({ name, className }: { name: string; className?: string }) {
  const I = ICONS[name] ?? PawPrint;
  return <I className={className} strokeWidth={1.9} />;
}

function Head({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <header className="head head--compact">
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

function Src({ text, dark }: { text: string; dark?: boolean }) {
  return <p className={cx("srcline", dark && "srcline--dark")}>{text}</p>;
}

/* ═════════ Тоо баримт ═════════ */

function Donut({ parts }: { parts: { label: string; value: number }[] }) {
  const R = 64;
  const C = 2 * Math.PI * R;
  const colors = ["var(--orange)", "var(--ink-2)", "#dcc6ae"];
  const offsets = parts.map((_, i) => parts.slice(0, i).reduce((a, q) => a + (q.value / 100) * C, 0));
  return (
    <svg viewBox="0 0 180 180" className="dt__donut" role="img" aria-label="Эзэнгүй нохойн байршил">
      <circle cx="90" cy="90" r={R} fill="none" stroke="var(--sand)" strokeWidth="26" />
      {parts.map((p, i) => {
        const len = (p.value / 100) * C;
        return (
          <circle
            key={p.label}
            cx="90"
            cy="90"
            r={R}
            fill="none"
            stroke={colors[i]}
            strokeWidth="26"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offsets[i]}
            transform="rotate(-90 90 90)"
          />
        );
      })}
      <text x="90" y="88" textAnchor="middle" className="dt__donut-v">
        70%
      </text>
      <text x="90" y="112" textAnchor="middle" className="dt__donut-l">
        гэр хороолол
      </text>
    </svg>
  );
}

export function DataSlide() {
  const max = DATA.districts[0].value;
  const total = DATA.districts.reduce((s, d) => s + d.value, 0);
  const colors = ["var(--orange)", "var(--ink-2)", "#dcc6ae"];
  return (
    <>
      <Head kicker={DATA.kicker} title={DATA.title} />
      <div className="dt">
        <div className="card dt__chart rv" style={rv(2)}>
          <p className="dt__h">{DATA.chartTitle}</p>
          <div className="dt__bars">
            {DATA.districts.map((d, i) => (
              <div key={d.name} className="dt__row">
                <span className="dt__name">{d.name}</span>
                <span className="dt__track">
                  <span
                    className={cx("dt__bar", i < 2 && "dt__bar--hot")}
                    style={{ width: `${(d.value / max) * 100}%` }}
                  />
                </span>
                <span className="dt__val">
                  {fmt(d.value)}
                  <i>{Math.round((d.value / total) * 100)}%</i>
                </span>
              </div>
            ))}
          </div>
          <p className="dt__note">{DATA.chartNote}</p>
        </div>

        <div className="dt__right">
          <div className="dt__tiles">
            {DATA.tiles.map((t, i) => (
              <div key={t.label} className={cx("dt__tile rv", `dt__tile--${t.tone}`)} style={rv(3 + i)}>
                <p className="dt__tv">{t.value}</p>
                <p className="dt__tl">{t.label}</p>
              </div>
            ))}
          </div>
          <div className="card dt__loc rv" style={rv(7)}>
            <Donut parts={DATA.donut.parts} />
            <div className="dt__legend">
              <p className="dt__h">{DATA.donut.title}</p>
              {DATA.donut.parts.map((p, i) => (
                <p key={p.label} className="dt__lg">
                  <span className="dt__sw" style={{ background: colors[i] }} />
                  {p.label}
                  <b>{p.value}%</b>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="dt__insight rv" style={rv(8)}>
        <PawPrint strokeWidth={2.2} />
        {DATA.insight}
      </p>
      <Src text={DATA.source} />
    </>
  );
}

/* ═════════ Хууль · 1 ═════════ */

export function LawSlide() {
  return (
    <>
      <Head kicker={LAW.kicker} title={LAW.title} />
      <p className="pill pill--sm law__pill rv" style={rv(2)}>
        {LAW.passed}
      </p>
      <div className="law">
        <div className="law__row law__row--head rv" style={rv(3)}>
          {LAW.head.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {LAW.rows.map((r, i) => (
          <div key={r.req} className="law__row rv" style={rv(4 + i)}>
            <span className="law__req">{r.req}</span>
            <span className="law__when">{r.when}</span>
            <span className="law__ans">
              <ArrowRight strokeWidth={2.6} />
              <Ico name={r.icon} className="law__ai" />
              {r.answer}
            </span>
          </div>
        ))}
      </div>
      <div className="law__bottom">
        <div className="law__opp rv" style={rv(9)}>
          <p className="law__opp-h">{LAW.opp.title}</p>
          <p>{LAW.opp.text}</p>
        </div>
        <div className="law__cav rv" style={rv(10)}>
          <TriangleAlert strokeWidth={2.2} />
          <p>{LAW.caveat}</p>
        </div>
      </div>
      <Src text={LAW.source} />
    </>
  );
}

/* ═════════ Хууль · 2 ═════════ */

export function ComplySlide() {
  return (
    <>
      <Head kicker={COMPLY.kicker} title={COMPLY.title} />
      <div className="cpl">
        {COMPLY.cards.map((c, i) => (
          <div key={c.title} className="card cpl__card rv" style={rv(2 + i)}>
            <div className="cpl__top">
              <span className="cpl__ico">
                <Ico name={c.icon} className="cpl__i" />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p className="cpl__law">{c.law}</p>
              </div>
            </div>
            <ul>
              {c.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="cpl__foot">
              <span className="cpl__task">{c.owner}</span>
              <span className="cpl__due">{c.phase}</span>
              <span className={cx("cpl__lvl", `cpl__lvl--${c.level}`)}>{COMPLY.levelLabel[c.level]}</span>
            </div>
          </div>
        ))}
      </div>
      <Src text={COMPLY.source} />
    </>
  );
}

/* ═════════ GPS хүзүүвч ═════════ */

function mnt(usd: number) {
  const n = usd * 3597;
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)} сая ₮` : `${Math.round(n / 1000)} мянган ₮`;
}

export function IotSlide() {
  const max = IOT.prices[IOT.prices.length - 1].usd;
  return (
    <>
      <Head kicker={IOT.kicker} title={IOT.title} />
      <div className="i2">
        <div className="i2__steps">
          {IOT.steps.map((s, i) => (
            <div key={s.range} className="i2__stepwrap">
              <div className={cx("card i2__step rv", s.now && "i2__step--now")} style={rv(2 + i)}>
                <p className="i2__range">
                  {s.range}
                  {s.now ? <span>эхлэх</span> : null}
                </p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              {i < IOT.steps.length - 1 ? <ArrowRight className="i2__arrow" strokeWidth={2.6} /> : null}
            </div>
          ))}
        </div>
        <div className="card iot__prices rv" style={rv(5)}>
          <p className="iot__ph">{IOT.priceTitle}</p>
          {IOT.prices.map((p) => (
            <div key={p.name} className="iot__prow">
              <div className="iot__pname">
                <b>{p.name}</b>
                <i>{p.sub}</i>
              </div>
              <span className="iot__ptrack">
                <span className="iot__pbar" style={{ width: `${(p.usd / max) * 100}%` }} />
              </span>
              <span className="iot__pv">
                ${p.usd}
                <i>≈ {mnt(p.usd)}</i>
              </span>
            </div>
          ))}
          <p className="iot__fx">{IOT.fx}</p>
        </div>
      </div>
      <p className="dt__insight rv" style={rv(7)}>
        <PawPrint strokeWidth={2.2} />
        {IOT.insight}
      </p>
      <Src text={IOT.source} />
    </>
  );
}

/* ═════════ Багийн хурал: agenda ═════════ */

export function MeetSlide() {
  const colors = ["#ff6b3d", "#ff9a78", "#e4511f", "#c9b3a4"];
  return (
    <>
      <Head kicker={MEET.kicker} title={MEET.title} />
      <div className="mt">
        <div className="mt__bar rv" style={rv(2)}>
          {MEET.blocks.map((b, i) => (
            <div key={b.title} className="mt__seg" style={{ flex: b.min, background: colors[i] }}>
              <b>{b.min}</b>
              <span>мин</span>
            </div>
          ))}
        </div>
        <div className="mt__grid">
          {MEET.blocks.map((b, i) => (
            <div key={b.title} className="mt__block rv" style={rv(3 + i)}>
              <span className="mt__dot" style={{ background: colors[i] }} />
              <div>
                <h3>
                  {b.title} <i>{b.min} мин</i>
                </h3>
                <p>{b.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt__lower">
          <div className="mt__fmt rv" style={rv(7)}>
            <p className="mt__h">{MEET.format.title}</p>
            <div className="mt__steps">
              {MEET.format.steps.map((s, i) => (
                <div key={s} className="mt__step">
                  <span>{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="mt__out rv" style={rv(8)}>
            <p className="mt__h">{MEET.outputs.title}</p>
            <ul>
              {MEET.outputs.items.map((o) => (
                <li key={o}>
                  <Check strokeWidth={3.2} />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═════════ 5 workstream: тойм ═════════ */

export function WsMapSlide() {
  return (
    <>
      <Head kicker={WSMAP.kicker} title={WSMAP.title} lead={WSMAP.lead} />
      <div className="wm">
        {WS.map((w, i) => (
          <div key={w.id} className={cx("card wm__card rv", w.id === "partners" && "wm__card--new")} style={rv(3 + i)}>
            <div className="wm__top">
              <span className="wm__num">{w.num}</span>
              <span className="wm__ico">
                <Ico name={w.icon} className="wm__i" />
              </span>
            </div>
            <h3>{w.name}</h3>
            <p className="wm__short">{w.short}</p>
            <p className="wm__mission">{w.mission}</p>
            <p className="wm__range">
              {WSMAP.firstLabel}: {w.first}
            </p>
            <p className="wm__dec">
              <b>Өнөө орой шийдэх</b>
              {WS_DETAIL.find((d) => d.id === w.id)?.decide[0]}
            </p>
            {w.id === "partners" ? <span className="wm__new">Шинэ</span> : null}
          </div>
        ))}
      </div>
      <div className="wm__bottom rv" style={rv(9)}>
        <div className="wm__five">
          <p className="wm__fh">{WSMAP.fifth.title}</p>
          <p>{WSMAP.fifth.text}</p>
        </div>
      </div>
    </>
  );
}

/* ═════════ Workstream тус бүр ═════════ */

export function WsSlide({ d }: { d: WsDetail }) {
  const cells = MATRIX[d.id];
  return (
    <>
      <Head kicker={d.kicker} title={d.title} lead={d.mission} />
      <div className="ws">
        <div className="ws__c1">
          <div className="card ws__card rv" style={rv(3)}>
            <p className="ws__h">Одоогийн байдал</p>
            <ul className="ws__done">
              {d.state.done.map((s) => (
                <li key={s}>
                  <Check strokeWidth={3.2} />
                  {s}
                </li>
              ))}
            </ul>
            <p className="ws__h ws__h--gap">Нээлттэй асуудал</p>
            <ul className="ws__gap">
              {d.state.gap.map((s) => (
                <li key={s}>
                  <TriangleAlert strokeWidth={2.4} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="ws__kpis rv" style={rv(4)}>
            <div className="ws__kpirow">
              {d.kpis.map((k) => (
                <div key={k.label}>
                  <b>{k.value}</b>
                  <span>{k.label}</span>
                </div>
              ))}
            </div>
            <p>{d.kpiNote}</p>
          </div>
        </div>

        <div className="card ws__card ws__ladder rv" style={rv(5)}>
          <p className="ws__h">Phase бүрийн гол үр дүн</p>
          {PHASES.map((p, i) => (
            <div key={p.id} className="ws__lrow">
              <span className="ws__lp">{p.id}</span>
              <div>
                <b>{cells[i].out}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ws__bottom rv" style={rv(8)}>
        <div className="ws__risk">
          <TriangleAlert strokeWidth={2.4} />
          <p>
            <b>Эрсдэл.</b> {d.risk}
          </p>
        </div>
        <div className="ws__dec">
          <p>Өнөө орой шийдэх</p>
          <ol>
            {d.decide.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

/* ═════════ 6 Phase ═════════ */

export function PhasesSlide() {
  return (
    <>
      <Head kicker={PLAN.kicker} title="6 phase: судалгаанаас экосистем хүртэл" lead={PLAN.note} />
      <div className="ph">
        {PHASES.map((p, i) => (
          <div key={p.id} className={cx("card ph__card rv", i === 0 && "ph__card--now")} style={rv(3 + i)}>
            <span className="ph__id">{p.short}</span>
            <h3>{p.name}</h3>
            <p className="ph__when">{p.when}</p>
            <p className="ph__exit-h">{PLAN.exitLabel}</p>
            <p className="ph__exit">{p.exit}</p>
          </div>
        ))}
      </div>
      <p className="ph__line rv" style={rv(9)}>
        Өмнөх phase-ийн гарах шалгуур биелсэн тохиолдолд л дараагийн phase эхэлнэ.
      </p>
      </>
  );
}

/* ═════════ 5 урсгал × 6 phase ═════════ */

export function MatrixSlide() {
  return (
    <>
      <Head kicker={PLAN.kicker} title="Хэн хэзээ юу хүргэх вэ" />
      <div className="mx rv" style={rv(2)}>
        <div className="mx__row mx__row--head">
          <span />
          {PHASES.map((p) => (
            <span key={p.id}>
              <b>{p.short}</b>
              <i>{p.name}</i>
            </span>
          ))}
        </div>
        {WS.map((w) => (
          <div key={w.id} className="mx__row">
            <span className="mx__ws">
              <em>{w.num}</em>
              {w.name}
            </span>
            {MATRIX[w.id].map((c, i) => (
              <span key={i} className="mx__cell">
                {c.out}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ═════════ Эх сурвалж ═════════ */

export function SourcesSlide() {
  return (
    <>
      <Head kicker={SOURCES.kicker} title={SOURCES.title} />
      <div className="sr">
        {SOURCES.groups.map((g, i) => (
          <div key={g.title} className={cx("card sr__card rv", `sr__card--${g.tone}`)} style={rv(2 + i)}>
            <p className="sr__h">{g.title}</p>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═════════ Гурван бүтээгдэхүүн ═════════ */

export function ProductsSlide() {
  return (
    <>
      <Head kicker={PRODUCTS.kicker} title={PRODUCTS.title} lead={PRODUCTS.lead} />
      <div className="pd">
        {PRODUCTS.items.map((p, i) => (
          <div key={p.id} className={cx("card pd__card rv", `pd__card--${p.id}`)} style={rv(3 + i)}>
            <div className="pd__top">
              <span className="pd__ico">
                <Ico name={p.icon} className="pd__i" />
              </span>
              <div>
                <h3>{p.name}</h3>
                <p className="pd__tag">{p.tag}</p>
              </div>
            </div>
            <p className="pd__what">{p.what}</p>
            <dl>
              <dt>Хэнд хэрэгтэй</dt>
              <dd>{p.who}</dd>
              <dt>Ямар асуудал шийднэ</dt>
              <dd>{p.solves}</dd>
            </dl>
            <p className={cx("pd__state", `pd__state--${p.stateTone}`)}>{p.state}</p>
          </div>
        ))}
      </div>
      <div className="pd__flow rv" style={rv(7)}>
        {PRODUCTS.flow.map((f, i) => (
          <span key={f}>
            {f}
            {i < PRODUCTS.flow.length - 1 ? <ArrowRight strokeWidth={2.8} /> : null}
          </span>
        ))}
      </div>
    </>
  );
}

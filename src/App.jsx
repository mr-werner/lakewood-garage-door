import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Clock, Mail, MapPin, Menu, Phone, ShieldCheck, Store, Wrench, X,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";

// -----------------------------------------------------------------------------
// CONTENT. Facts come from Lakewood Garage Door's current site
// (lakewoodgaragedoor.biz: home, repair, opener repair, gallery, showroom,
// about, warranty and contact pages), checked 2026-10-19.
// Photos and the logo are hotlinked from their Squarespace CDN.
// -----------------------------------------------------------------------------

const COMPANY = "Lakewood Garage Door";
const ABBR = "lgd";
const PHONE = "3032021233";
const PHONE_DISPLAY = "(303) 202-1233";
const EMAIL = "lakewoodgd@gmail.com";
const ADDRESS = "1315 Nelson St. #8";
const CITY = "Lakewood, CO 80215";
const SINCE = 1990;
const MAPS_QUERY = "Lakewood Garage Door, 1315 Nelson St #8, Lakewood, CO 80215";
const YELP_URL = "https://www.yelp.com/biz/lakewood-garage-door-lakewood";
const FACEBOOK_URL = "https://www.facebook.com/p/Lakewood-Garage-Doors-100063792229321/";
const END_DATE = "2026-11-23T23:59:59-07:00";

const CDN = "https://images.squarespace-cdn.com/content/v1/5e6aa248258607287e4c3afb/";
const LOGO = `${CDN}1584046693564-08F1FQ1UTEOV8XTME9DJ/translogo.png`;
const img = (path, w = 1000) => `${CDN}${path}?format=${w}w`;

const PHOTOS = {
  hero: img("1584566713263-3QMR4MMZN9D0UU6ARO10/steel_carriage_door.jpg", 1500),
  storefront: img("1584556473173-KMGQJP6PTQW1XGI9K04M/storefront.jpg", 1500),
  repair: img("1584048321309-Z5SG2A236YH4HBRJVANG/garage-door-repairs.jpg"),
  opener: img("1584047794152-4GFA32YJN1GR8WZOAC5T/motor-repair.jpg"),
  doorlink: img("1584047522626-PFYN94W34R1NMPDXQ5WK/doorlink.jpg"),
  liftmaster: img("1584047626876-8FQM5ZT0XXBJJMU4RKKX/liftmaster.jpg"),
};

const HOURS = [
  ["Monday – Friday", "7:00 am – 7:00 pm"],
  ["Saturday", "8:00 am – 3:00 pm"],
];

const AREAS = ["Denver", "Arvada", "Golden", "Littleton", "Lakewood", "Wheat Ridge"];

const SERVICES = [
  {
    id: "repair", option: "Garage door repair", no: "01", title: "Garage door repair", photo: PHOTOS.repair,
    desc: "Balance, tune-up and lube with a safety inspection, then a straight answer on what needs fixing. Nothing starts until you approve it.",
    points: ["Torsion and extension springs", "Bent or damaged sections", "Cables, rollers, hinges and tracks"],
  },
  {
    id: "opener", option: "Opener repair", no: "02", title: "Opener repair", photo: PHOTOS.opener,
    desc: "We service most openers in the Denver metro and give you a fair call on whether yours is worth repairing. Some problems we can solve over the phone.",
    points: ["Gears, travelers and limit switches", "Safety sensors", "Remotes, keypads and batteries"],
  },
  {
    id: "doors", option: "New garage door (DoorLink)", no: "03", title: "New garage doors", photo: PHOTOS.doorlink,
    desc: "Replacement doors from DoorLink, made in Kansas City. Raised panel, flush panel and carriage house styles, insulated or not, with or without windows.",
    points: ["Tear-out and haul-away", "Insulated steel options", "Windows and wood-look finishes"],
  },
  {
    id: "openers", option: "New opener (LiftMaster)", no: "04", title: "New openers", photo: PHOTOS.liftmaster,
    desc: "We install LiftMaster openers, one of the best-selling brands, and pass the full manufacturer warranty on to you.",
    points: ["Elite, Premium and Contractor series", "Lifetime motor warranty on Elite and Premium", "Installed and adjusted by our own crew"],
  },
];
const SERVICE_OPTIONS = ["Not sure yet", "Garage door repair", "Broken spring", "Opener repair", "New garage door (DoorLink)", "New opener (LiftMaster)", "Showroom visit"];

const TRUCK = {
  "Door parts": ["Torsion springs", "Extension springs", "Rollers", "Cables", "Hinges", "Tracks", "Sheave wheels", "Drums"],
  "Opener parts": ["Gears", "Travelers", "Sensors", "Limit switches", "Remotes", "Keyless entries", "Batteries"],
};

const CHECKS = [
  { light: "blink", title: "Sensor light flashing?", body: "The safety sensors at the bottom of the opening are usually just out of line. Loosen the wing nut, point the sensor straight at its partner, and tighten it again." },
  { light: "solid", title: "Light solid, door still won't close?", body: "That can mean something more serious. Stop using the door and give us a call." },
  { light: "spring", title: "One spring broke?", body: "Springs wear out together, so we recommend replacing both torsion springs (or both extension springs) at the same visit." },
];

const STYLES = [
  { name: "Raised panel", kind: "raised", note: "The classic. Steel, insulated or non-insulated, with optional windows." },
  { name: "Flush panel", kind: "flush", note: "Clean and modern. Solid colors or wood-look finishes like Driftwood plank." },
  { name: "Carriage house", kind: "carriage", note: "Groove-panel carriage doors with windows. Insulated steel, wood-look finish." },
];

// The current gallery has matching "before" and finished photos for these jobs (paired by file name).
const BEFORE_AFTER = [
  { label: "Tear-out to raised panel", before: img("1584566287680-36H2BYRNFZTPEVYKJLPO/tear_out.jpg"), after: img("1584566357186-71Z5A16LE4AOKJX6W0MU/tear_out_replacement.jpg") },
  { label: "Ozark Series 3700 panel", before: img("ff80c92b-e0fd-4024-8521-d934d7650dd5/before-ozark2.jpg"), after: img("c2ad03a1-5b61-485b-b83f-2e9c294ae4b4/Ozark-series2.jpg") },
  { label: "DoorLink groove-panel carriage door", before: img("a04b7975-3824-42e4-ac2e-05610310cae3/wood-windows-before.jpg"), after: img("1b93a0a6-aa35-488e-84a2-328cb9bba5bf/wood-windows.jpg") },
];

const GALLERY = [
  { src: img("1584567825439-WAYA5M9P4KOYKA79RBI3/flush-panel-blaci.jpg"), cap: "Black flush panel door with windows" },
  { src: img("1584567825797-WR0QZT9GQ9GMCNJOSWZC/flush-panel.jpg"), cap: "Driftwood plank door" },
  { src: img("1584566532684-D6CQI9OSF652C97ZHOEW/insulted_steel_door.jpg"), cap: "Insulated steel raised panel door with window" },
  { src: img("1584566980658-E0EBS4BT0GEF4WLSGUVE/wood_finish.jpg"), cap: "Flush panel replacement, wood finish and windows" },
  { src: img("1584568237875-QSNDJAN09GJ7UHZJ6VMY/wood_door_replacement.jpg"), cap: "Wood garage door replacement" },
  { src: img("1584566784639-B3WX0QYD0R9PTYKC49LC/bi-fold_replacement.jpg"), cap: "Old wood bi-fold door replaced" },
  { src: img("1584567163541-PI4ME9GXM6NK35929H1X/insulated_door.jpg"), cap: "Raised panel steel door replacement" },
  { src: img("1709656790367-O1I4HZTK35I1PFDU6B3F/ozark3700.jpg"), cap: "Ozark Series panel door" },
];

const OPENER_WARRANTY = [
  ["Elite Series", "Lifetime", "5 years"],
  ["Premium Series", "Lifetime", "1 year"],
  ["Contractor Series", "4 years", "1 year"],
];

const NAV = [["Services", "#services"], ["Doors", "#doors"], ["Gallery", "#gallery"], ["Warranty", "#warranty"], ["Showroom", "#showroom"]];

// -----------------------------------------------------------------------------
// MOTIFS: sectional door panels, a torsion spring, tracks and a pegboard.
// -----------------------------------------------------------------------------

function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${failed ? "is-missing" : ""} ${className}`}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
}

function Logo({ big = false }) {
  // Their own logo, hotlinked. Falls back to a small door mark if the file can't load.
  const [failed, setFailed] = useState(false);
  return (
    <span className={`brand-plate ${big ? "big" : ""}`}>
      {failed ? (
        <svg viewBox="0 0 64 64" aria-label={COMPANY} role="img"><path d="M8 26 32 9l24 17v4H8z" fill="var(--orange)" /><rect x="14" y="31" width="36" height="27" fill="var(--navy)" /><path d="M14 37.75h36M14 44.5h36M14 51.25h36" stroke="#fff" strokeWidth="2.2" /></svg>
      ) : <img src={LOGO} alt={COMPANY} onError={() => setFailed(true)} />}
    </span>
  );
}

function Spring({ className = "" }) {
  // A torsion spring on its shaft, used as a divider.
  return (
    <div className={`spring ${className}`} aria-hidden="true">
      <span className="spring-shaft" />
      <span className="spring-coil left" />
      <span className="spring-plate" />
      <span className="spring-coil right" />
    </div>
  );
}

function DoorPanels({ rows = 4, cols = 4, handle = true }) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <div className="panel" key={r}>
          {Array.from({ length: cols }, (_, c) => <span className="inset" key={c} />)}
          {handle && r === rows - 1 && <i className="handle" />}
        </div>
      ))}
    </>
  );
}

function StyleDoor({ kind }) {
  if (kind === "carriage") {
    return (
      <svg viewBox="0 0 160 110" className="style-door" aria-hidden="true">
        <rect x="2" y="2" width="156" height="106" rx="2" className="sd-frame" />
        <rect x="8" y="8" width="70" height="98" className="sd-face" /><rect x="82" y="8" width="70" height="98" className="sd-face" />
        {[0, 1, 2].map((i) => <rect key={`a${i}`} x={13 + i * 21} y="13" width="18" height="16" className="sd-glass" />)}
        {[0, 1, 2].map((i) => <rect key={`b${i}`} x={87 + i * 21} y="13" width="18" height="16" className="sd-glass" />)}
        {[0, 1, 2, 3, 4, 5].map((i) => <line key={`g${i}`} x1={18 + i * 10} y1="36" x2={18 + i * 10} y2="100" className="sd-groove" />)}
        {[0, 1, 2, 3, 4, 5].map((i) => <line key={`h${i}`} x1={92 + i * 10} y1="36" x2={92 + i * 10} y2="100" className="sd-groove" />)}
        <line x1="12" y1="36" x2="74" y2="100" className="sd-groove" /><line x1="148" y1="36" x2="86" y2="100" className="sd-groove" />
        <circle cx="72" cy="70" r="2.2" className="sd-pull" /><circle cx="88" cy="70" r="2.2" className="sd-pull" />
      </svg>
    );
  }
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 160 110" className="style-door" aria-hidden="true">
      <rect x="2" y="2" width="156" height="106" rx="2" className="sd-frame" />
      {rows.map((r) => (
        <g key={r}>
          <rect x="8" y={8 + r * 24.5} width="144" height="23.5" className="sd-face" />
          {kind === "raised" && [0, 1, 2, 3].map((c) => <rect key={c} x={13 + c * 34.5} y={12 + r * 24.5} width="30" height="15.5" rx="1" className={r === 0 ? "sd-glass" : "sd-inset"} />)}
          {kind === "flush" && [0, 1, 2, 3, 4, 5, 6].map((c) => <line key={c} x1={8 + (c + 1) * 18} y1={8 + r * 24.5} x2={8 + (c + 1) * 18} y2={31.5 + r * 24.5} className="sd-plank" />)}
        </g>
      ))}
      {kind === "flush" && <rect x="8" y="12" width="144" height="12" className="sd-glass-band" />}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// SECTIONS
// -----------------------------------------------------------------------------

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label={`${COMPANY} home`}>
          <Logo />
          <span className="brand-word"><strong>Lakewood Garage Door</strong><small>Since {SINCE} · Lakewood, CO</small></span>
        </a>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-book" href="#request" onClick={() => setOpen(false)}>Request service</a>
          <a className="nav-call" href={`tel:${PHONE}`}><Phone size={17} /> {PHONE_DISPLAY}</a>
        </nav>
        <a className="header-phone" href={`tel:${PHONE}`}><Phone size={17} /><span>{PHONE_DISPLAY}</span></a>
        <a className="btn btn-orange header-cta" href="#request">Request service</a>
        <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

function GarageOpening() {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setUp(true), reduce ? 0 : 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="garage">
      <div className="garage-header-beam"><Spring className="spring-beam" /></div>
      <div className="garage-bay">
        <span className="track left" aria-hidden="true" /><span className="track right" aria-hidden="true" />
        <div className="bay-inside">
          <Photo src={PHOTOS.hero} alt="Insulated steel carriage house door with windows, installed by Lakewood Garage Door" />
          <div className="bay-tag"><b>Our work</b> Insulated steel carriage house door with windows</div>
        </div>
        <div className={`door ${up ? "is-up" : ""}`} aria-hidden="true"><DoorPanels /></div>
      </div>
      <div className="garage-floor" />
      <button type="button" className="wall-button" onClick={() => setUp((v) => !v)} aria-label={up ? "Close the door" : "Open the door"}>
        <span className="wb-led" />{up ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        <small>{up ? "Close" : "Open"}</small>
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Denver metro garage doors · since {SINCE}</span>
          <h1>Stuck, broken or just plain tired? <em>We'll get it rolling.</em></h1>
          <p>Lakewood Garage Door repairs garage doors and openers, installs new DoorLink doors and LiftMaster openers, and does every job with our own crew, never subcontractors.</p>
          <div className="hero-actions">
            <a className="btn btn-orange" href="#request">Request service <ArrowRight size={18} /></a>
            <a className="btn btn-dark" href={`tel:${PHONE}`}><Phone size={17} /> {PHONE_DISPLAY}</a>
          </div>
          <ul className="hero-facts">
            <li><Clock size={16} /> Mon–Fri 7 am–7 pm · Sat 8 am–3 pm</li>
            <li><Wrench size={16} /> Parts on every truck</li>
            <li><ShieldCheck size={16} /> 90-day parts & labor warranty</li>
          </ul>
        </div>
        <GarageOpening />
      </div>
    </section>
  );
}

function AreaStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-inner">
        <span className="strip-label"><MapPin size={16} /> Serving</span>
        <ul>{AREAS.map((a) => <li key={a}>{a}</li>)}</ul>
        <span className="strip-more">and most of the Denver metro</span>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">What we do</span>
          <h2>Four things, <em>done right.</em></h2>
          <p>Repairs come first: a balance, tune and lube with a safety check, then a clear answer on what's worth fixing. When it's time for something new, we install the brands we trust.</p>
        </div>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <article className="service" key={s.id}>
              <div className="service-photo">
                <Photo src={s.photo} alt={s.title} />
                <span className="service-no">{s.no}</span>
              </div>
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <a className="service-go" href="#request" data-service={s.option}>
                  Request this <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Truck() {
  return (
    <section className="truck">
      <div className="wrap truck-inner">
        <div className="truck-copy">
          <span className="eyebrow light">On the truck</span>
          <h2>Most fixes happen <em>on the first visit.</em></h2>
          <p>Our trucks carry the parts that wear out, so a broken spring or a stripped opener gear usually gets fixed the same visit instead of waiting on an order.</p>
        </div>
        <div className="pegboard">
          {Object.entries(TRUCK).map(([group, parts]) => (
            <div className="peg-group" key={group}>
              <h3>{group}</h3>
              <ul>{parts.map((p, i) => <li key={p} style={{ "--tilt": `${(i % 3 - 1) * 2.2}deg` }}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Checks() {
  return (
    <section className="section checks">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">Before you call</span>
          <h2>Three quick checks <em>from our techs.</em></h2>
        </div>
        <div className="check-grid">
          {CHECKS.map((c) => (
            <article className="check" key={c.title}>
              <span className={`check-light ${c.light}`} aria-hidden="true" />
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        <div className="rule">
          <Spring className="spring-rule" />
          <p><b>Rule of thumb:</b> every time we vote for a president, have us out to balance, tune and lube your door. It keeps everything running smoothly.</p>
        </div>
      </div>
    </section>
  );
}

function Doors() {
  return (
    <section className="section doors" id="doors">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">New doors & openers</span>
          <h2>DoorLink doors. <em>LiftMaster openers.</em></h2>
          <p>For replacements we install DoorLink doors, made in Kansas City, and LiftMaster openers. Come see them in the showroom.</p>
        </div>
        <div className="style-row">
          {STYLES.map((s) => (
            <article className="style-card" key={s.name}>
              <StyleDoor kind={s.kind} />
              <h3>{s.name}</h3>
              <p>{s.note}</p>
            </article>
          ))}
        </div>
        <div className="brand-row">
          <div className="brand-card"><b>DoorLink</b><span>Garage doors · door sections warranted for as long as the original purchaser owns the home</span></div>
          <div className="brand-card"><b>LiftMaster</b><span>Garage door openers · lifetime motor and belt warranty on Elite and Premium series</span></div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ job }) {
  const [lift, setLift] = useState(55);
  return (
    <figure className="ba">
      <div className="ba-frame">
        <Photo src={job.after} alt={`${job.label}, after`} className="ba-after" />
        <div className="ba-before" style={{ clipPath: `inset(0 0 ${lift}% 0)` }}>
          <Photo src={job.before} alt={`${job.label}, before`} />
          <span className="ba-tag before">Before</span>
        </div>
        <span className="ba-tag after">After</span>
        <span className="ba-edge" style={{ top: `${100 - lift}%` }}><i /></span>
      </div>
      <label className="ba-control">
        <span>Raise the door</span>
        <input type="range" min="0" max="100" value={lift} onChange={(e) => setLift(Number(e.target.value))} aria-label={`Reveal the finished ${job.label}`} />
      </label>
      <figcaption>{job.label}</figcaption>
    </figure>
  );
}

function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="wrap">
        <div className="head head-split">
          <div>
            <span className="eyebrow">Job gallery</span>
            <h2>Thousands of doors installed. <em>A few favorites.</em></h2>
          </div>
          <p>Drag the slider to raise the old door and see the new one. Every photo is our own work around the Denver metro.</p>
        </div>
        <div className="ba-row">{BEFORE_AFTER.map((j) => <BeforeAfter job={j} key={j.label} />)}</div>
        <div className="gallery-grid">
          {GALLERY.map((g) => (
            <figure key={g.cap}><Photo src={g.src} alt={g.cap} /><figcaption>{g.cap}</figcaption></figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story">
      <div className="wrap story-inner">
        <div className="story-years" aria-hidden="true">
          <span>{SINCE}</span><small>In the garage door business</small>
          <span>2005</span><small>Becomes Lakewood Garage Door</small>
          <span>Today</span><small>Same family, same Nelson St. shop</small>
        </div>
        <div className="story-copy">
          <span className="eyebrow light">Our story</span>
          <h2>It started with a barn door <em>and a favor for a friend.</em></h2>
          <p>Stuart helped a friend install a garage door in a barn and liked the work enough to make it his career. He and his wife, Vonda, built the business as a husband-and-wife team serving the Denver metro, and it became Lakewood Garage Door in 2005.</p>
          <p>The idea hasn't changed: reliable service, quality work, fair prices and a warranty on what we sell. We'd like to be your garage door company for life.</p>
          <a className="btn btn-orange" href={YELP_URL} target="_blank" rel="noopener noreferrer">Read our reviews on Yelp <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Warranty() {
  return (
    <section className="section warranty" id="warranty">
      <div className="wrap warranty-inner">
        <div className="stamp" aria-hidden="true"><b>90</b><span>Day</span><small>Parts & labor</small></div>
        <div className="warranty-copy">
          <span className="eyebrow">Warranty</span>
          <h2>Ninety days on our work. <em>Every manufacturer warranty passed on to you.</em></h2>
          <p>A typical service call (balancing, tuning, lubricating and any parts we replace) is covered for 90 days. So are the boards, sensors, bearings and gears we replace on an opener. Damage that was already there, like a door that's been hit by a car, isn't covered.</p>
          <div className="warranty-table" role="table" aria-label="LiftMaster opener warranties">
            <div role="row" className="wt-head"><span role="columnheader">LiftMaster opener</span><span role="columnheader">Motor & belt</span><span role="columnheader">Parts</span></div>
            {OPENER_WARRANTY.map(([s, m, p]) => <div role="row" key={s}><span role="cell">{s}</span><span role="cell">{m}</span><span role="cell">{p}</span></div>)}
          </div>
          <p className="fine">DoorLink door sections are covered against defects, including rust-through, for as long as the original purchaser owns the home (residential, owner-occupied). Windows are covered for three years.</p>
        </div>
      </div>
    </section>
  );
}

function Showroom() {
  return (
    <section className="section showroom" id="showroom">
      <div className="wrap showroom-inner">
        <Photo src={PHOTOS.storefront} alt="The Lakewood Garage Door office and showroom on Nelson St." className="showroom-photo" />
        <div className="showroom-copy">
          <span className="eyebrow">Showroom</span>
          <h2>See the doors <em>before you choose.</em></h2>
          <p>Our office showroom has current DoorLink doors and LiftMaster openers on display, plus garage door parts and accessories for sale. Showroom hours vary, so call and let us know when you'd like to drop by.</p>
          <p className="showroom-address"><Store size={19} /><span>{ADDRESS}<br />{CITY}</span></p>
          <a className="btn btn-dark" href={`tel:${PHONE}`}><Phone size={17} /> Call to plan a visit</a>
        </div>
      </div>
    </section>
  );
}

function RequestForm() {
  const blank = { name: "", phone: "", email: "", city: "", service: "", date: "", notes: "", website: "" };
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="form done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? "This is where Lakewood Garage Door gets your request." : "Request received."}</h3>
        <p>{status === "demo"
          ? `In this concept preview, requests aren't sent anywhere. On the live site they'd arrive at ${EMAIL} with everything needed to call you back.`
          : `Thanks, ${form.name.split(" ")[0]}. We'll call to set up a time.`}</p>
        <button type="button" className="btn btn-dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>Name *<input value={form.name} onChange={update("name")} required maxLength={160} autoComplete="name" /></label>
        <label>Phone *<input type="tel" value={form.phone} onChange={update("phone")} required maxLength={40} autoComplete="tel" /></label>
      </div>
      <div className="form-row">
        <label>Email<input type="email" value={form.email} onChange={update("email")} maxLength={254} autoComplete="email" /></label>
        <label>City<select value={form.city} onChange={update("city")}><option value="">Choose…</option>{AREAS.map((a) => <option key={a}>{a}</option>)}<option>Other Denver metro</option></select></label>
      </div>
      <div className="form-row">
        <label>What do you need?<select value={form.service} onChange={update("service")}><option value="">Choose a service…</option>{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label>Preferred day<input type="date" value={form.date} onChange={update("date")} /></label>
      </div>
      <label>What's the door doing?<textarea rows={4} maxLength={3000} value={form.notes} onChange={update("notes")} placeholder="Won't open, loud bang, cable off the drum, sensor light blinking…" /></label>
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn btn-orange full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request service"} <ArrowUpRight size={18} /></button>
      <p className="form-note">We'll call to confirm a time. Door stuck open right now? Call <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Request() {
  return (
    <section className="section request" id="request">
      <div className="wrap request-inner">
        <div className="request-copy">
          <span className="eyebrow">Request service</span>
          <h2>Tell us what the door's doing. <em>We'll keep it simple.</em></h2>
          <p>Call, email or send the form. We'll set up a visit, look the door over and tell you what it needs before any work starts.</p>
          <div className="request-contact">
            <a href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}><Mail size={18} /> {EMAIL}</a>
          </div>
          <div className="hours-card">
            <h3><Clock size={18} /> Office hours</h3>
            {HOURS.map(([d, h]) => <div key={d}><span>{d}</span><b>{h}</b></div>)}
            <p>Showroom visits by appointment. Call ahead.</p>
          </div>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function Visit() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="visit" id="visit">
      <div className="map"><iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      <div className="visit-card">
        <span className="eyebrow">Office & showroom</span>
        <p className="visit-address"><MapPin size={19} /><span>{ADDRESS}<br />{CITY}</span></p>
        <a className="btn btn-dark" href={directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={17} /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo big />
          <p>Garage door repair, openers and new doors for the Denver metro since {SINCE}. Our own crew, never subcontractors.</p>
        </div>
        <div className="footer-cols">
          <div><h4>Explore</h4>{NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}<a href="#request">Request service</a></div>
          <div><h4>Contact</h4><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>{ADDRESS}</span><span>{CITY}</span></div>
          <div><h4>Hours</h4>{HOURS.map(([d, h]) => <span key={d}>{d}<br /><b>{h}</b></span>)}</div>
          <div><h4>Follow</h4><a href={YELP_URL} target="_blank" rel="noopener noreferrer">Yelp</a><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a></div>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent concept by Blueprint WebStudio · not affiliated with or endorsed by {COMPANY}.</span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
      <Header />
      <main>
        <Hero />
        <AreaStrip />
        <Services />
        <Truck />
        <Checks />
        <Doors />
        <Gallery />
        <Story />
        <Warranty />
        <Showroom />
        <Request />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

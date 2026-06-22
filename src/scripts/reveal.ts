// Motion enhancements: scroll reveals, count-up stats, nav scroll state,
// active-section highlight, and pointer-tracked card sheen.
// Everything degrades gracefully when prefers-reduced-motion is set.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── 1. Scroll reveal ── */
const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
if (!reduce && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ── 2. Count-up for stat numbers ── */
function animateCount(el: HTMLElement) {
  const text = el.dataset.countup ?? el.textContent ?? "";
  // Split into segments; animate each integer run from 0 to its value.
  const parts = text.split(/(\d+)/);
  const targets = parts.map((p) => (/^\d+$/.test(p) ? parseInt(p, 10) : null));
  const dur = 1200;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
  function frame(now: number) {
    const t = Math.min(1, (now - start) / dur);
    const k = ease(t);
    el.textContent = parts
      .map((p, i) => (targets[i] === null ? p : String(Math.round(targets[i]! * k))))
      .join("");
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = text;
  }
  requestAnimationFrame(frame);
}

const counters = document.querySelectorAll<HTMLElement>("[data-countup]");
if (!reduce && "IntersectionObserver" in window && counters.length) {
  const cio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          animateCount(e.target as HTMLElement);
          cio.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => cio.observe(el));
}

/* ── 3. Nav: shrink/elevate on scroll ── */
const nav = document.querySelector<HTMLElement>(".nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ── 4. Active-section highlight in nav ── */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav nav a[href^="#"]'));
const sections = navLinks
  .map((a) => document.querySelector<HTMLElement>(a.getAttribute("href")!))
  .filter((s): s is HTMLElement => !!s);
if ("IntersectionObserver" in window && sections.length) {
  const sio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = "#" + e.target.id;
          navLinks.forEach((a) =>
            a.toggleAttribute("data-active", a.getAttribute("href") === id)
          );
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sio.observe(s));
}

/* ── 5. Pointer-tracked sheen on cards ── */
if (!reduce && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll<HTMLElement>(".card-hover").forEach((card) => {
    card.addEventListener("pointermove", (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      card.style.setProperty("--my", `${ev.clientY - r.top}px`);
    });
  });
}

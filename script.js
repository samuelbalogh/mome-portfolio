const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const storedTheme = window.localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (storedTheme === "light" || (!storedTheme && prefersLight)) {
  root.classList.add("light");
}

toggle.addEventListener("click", () => {
  root.classList.toggle("light");
  window.localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".project, .timeline article, .skill-columns div").forEach((item) => {
  observer.observe(item);
});

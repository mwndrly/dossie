const pages = [
  ["index.html", "Início"],
  ["perfil.html", "Perfil"],
  ["diagnostico.html", "Diagnóstico"],
  ["contexto.html", "Contexto"],
  ["desenvolvimento.html", "Hipóteses"],
  ["experimentacao.html", "Experimentação"],
  ["projetos.html", "Projetos"],
  ["pos-faculdade.html", "Pós-Faculdade"],
  ["sintese.html", "Síntese"],
];

function currentPage() {
  const name = window.location.pathname.split("/").pop();
  return name || "index.html";
}

function buildShell() {
  const active = currentPage();
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");

  if (header) {
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="Página inicial">
        <span class="brand-mark">MF</span>
        <span>
          <strong>Mariana Ferreira</strong>
          <small>Dossiê Profissional</small>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
        <span class="material-symbols-rounded">menu</span>
      </button>
      <nav class="site-nav" aria-label="Navegação principal">
        ${pages
          .map(([href, label]) => `<a href="${href}" class="${href === active ? "active" : ""}">${label}</a>`)
          .join("")}
      </nav>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div>
        <strong>Mariana Ferreira</strong>
        <p>Desenvolvedora de Software Sênior em evolução para liderança técnica.</p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/mwndrly" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/mwndrly/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="projetos.html">Projetos</a>
      </div>
    `;
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector(".material-symbols-rounded").textContent = isOpen ? "close" : "menu";
    });
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function initAccordions() {
  document.querySelectorAll(".accordion button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      item.classList.toggle("open", !expanded);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildShell();
  initReveal();
  initAccordions();
});

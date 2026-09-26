import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { animate } from "animejs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  Focus,
  HeartHandshake,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Pause,
  Phone,
  Play,
  Plus,
  Sparkles,
  Target,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = { src: string; alt: string; label: string };

const SITE_CONFIG = {
  phone: "[Telefone da clínica]",
  address: "[Endereço da clínica]",
  hours: "[Horários de atendimento]",
  whatsapp: "",
  instagram: "",
  services: [
    { title: "[Especialidade]", description: "[Descrição do atendimento]", icon: Target },
    { title: "[Especialidade]", description: "[Descrição do atendimento]", icon: Compass },
    { title: "[Especialidade]", description: "[Descrição do atendimento]", icon: HeartHandshake },
  ],
};

const IMAGES = {
  hero: "/manus-storage/followkids_reabilitacao_1789395145_3986057513261116935_1360021055_255edae4.jpg",
  childBalance: "/manus-storage/followkids_reabilitacao_1789824995_3989663531547303156_1360021055_53f2c5ae.jpg",
  hammock: "/manus-storage/followkids_reabilitacao_1789395145_3986057590679636363_1360021055_52d4fe0d.jpg",
  breathing: "/manus-storage/followkids_reabilitacao_1789936665_3990600053125557707_1360021055_388edc57.jpg",
};

const GALLERY: GalleryItem[] = [
  { src: IMAGES.hero, alt: "Criança em atividade lúdica com profissional da Follow Kids", label: "Acolhimento em movimento" },
  { src: IMAGES.childBalance, alt: "Criança praticando equilíbrio com apoio do profissional", label: "Descobrir novas possibilidades" },
  { src: "/manus-storage/followkids_reabilitacao_1790009619_3991212226088705274_1360021055_7144d56f.jpg", alt: "Equipe acompanhando uma criança em atividade no espaço", label: "Cuidado em equipe" },
  { src: "/manus-storage/followkids_reabilitacao_1790009619_3991212338328323070_1360021055_23ccd26c.jpg", alt: "Criança sorrindo durante atividade suspensa", label: "Conquistas que fazem sentido" },
  { src: "/manus-storage/followkids_reabilitacao_1790009619_3991212351875907638_1360021055_cc2f1d32.jpg", alt: "Criança em equipamento de suspensão com profissionais", label: "Explorar com segurança" },
  { src: IMAGES.hammock, alt: "Criança brincando em equipamento de movimento", label: "Movimento com leveza" },
  { src: "/manus-storage/followkids_reabilitacao_1790009619_3991212346616236166_1360021055_93899c55.jpg", alt: "Profissional apoiando criança durante exercício", label: "Presença em cada etapa" },
  { src: IMAGES.breathing, alt: "Profissional acolhendo bebê durante atendimento", label: "Olhar atento" },
];

const NAV_ITEMS = [
  ["Sobre", "sobre"],
  ["Áreas de cuidado", "cuidados"],
  ["Nossa abordagem", "abordagem"],
  ["Espaço", "espaco"],
  ["Contato", "contato"],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="brand-mark" aria-label="Follow Kids">
      <span className="brand-symbol">F</span>
      <span className="brand-name" style={light ? { color: "#fffdf9" } : undefined}>
        Follow Kids
        <span className="brand-sub">Clínica de neuroreabilitação infantil</span>
      </span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".hero-kicker", { opacity: 0, y: 18, duration: .55 })
        .from(".hero-title-line", { opacity: 0, y: 32, stagger: .1, duration: .7 }, "-=.22")
        .from(".hero-copy", { opacity: 0, y: 18, duration: .55 }, "-=.28")
        .from(".hero-actions", { opacity: 0, y: 16, duration: .5 }, "-=.25")
        .from(".hero-photo", { clipPath: "inset(0 0 100% 0 round 46% 46% 10% 10%)", duration: 1.1, ease: "power4.out" }, "-=.7")
        .from(".hero-orbit, .float-label", { opacity: 0, scale: .94, stagger: .08, duration: .65 }, "-=.75");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
          opacity: 0,
          y: 28,
          duration: .7,
          ease: "power3.out",
        });
      });

      gsap.to(".hero-path", {
        strokeDashoffset: 0,
        duration: 1.8,
        delay: .55,
        ease: "power2.out",
      });

      gsap.to(".about-shape", {
        scrollTrigger: { trigger: ".about-visual", start: "top 80%", scrub: 1.2 },
        rotation: 8,
        y: -20,
        ease: "none",
      });
    }, heroRef);

    const pulse = animate(".floating-shape", {
      translateY: [-8, 8],
      rotate: [-2, 4],
      duration: 3600,
      direction: "alternate",
      loop: true,
      ease: "inOutSine",
    });

    return () => {
      ctx.revert();
      pulse.pause();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", motionPaused);
  }, [motionPaused]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlePending = (label: string) => {
    toast(`${label} será ativado quando os dados da clínica forem preenchidos.`, {
      description: "Este botão está preparado para receber o contato oficial.",
    });
  };

  return (
    <div className="page-shell" ref={heroRef}>
      <header className={`site-header fixed inset-x-0 top-0 z-40 px-0 py-5 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container flex items-center justify-between">
          <a href="#inicio" onClick={() => setMenuOpen(false)}><Brand /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {NAV_ITEMS.map(([label, id]) => <a className="header-link" href={`#${id}`} key={id}>{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button className="btn-small" onClick={() => scrollToId("contato")}>Fale com a equipe <ArrowUpRight size={15} /></button>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e1dc] bg-[#fffdf9] text-[#17334b] lg:hidden" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav lg:hidden" aria-label="Navegação mobile">
          {NAV_ITEMS.map(([label, id]) => <a className="header-link" href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="btn-small" onClick={() => { setMenuOpen(false); scrollToId("contato"); }}>Fale com a equipe <ArrowUpRight size={15} /></button>
        </nav>}
      </header>

      <main>
        <section className="hero-section" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <div className="hero-kicker">Clínica especializada em reabilitação infantil</div>
              <h1 className="hero-title" id="hero-title">
                <span className="hero-title-line block">Cuidado que</span>
                <span className="hero-title-line block">acolhe.</span>
                <span className="hero-title-line block"><em>Descobertas</em> que</span>
                <span className="hero-title-line block">transformam.</span>
              </h1>
              <p className="hero-copy">Um olhar atento para o movimento, a cognição e o desenvolvimento infantil, respeitando o tempo e as necessidades de cada criança.</p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => scrollToId("contato")}>Converse com nossa equipe <ArrowUpRight size={17} /></button>
                <button className="btn-secondary" onClick={() => scrollToId("sobre")}>Conheça a Follow Kids</button>
              </div>
              <div className="hero-note"><Check size={15} strokeWidth={2.5} /> Cada criança é acompanhada com atenção individual.</div>
            </div>

            <div className="hero-visual" aria-label="Atendimento acolhedor na Follow Kids">
              <div className="hero-orbit" aria-hidden="true" />
              <svg className="hero-path-wrap" viewBox="0 0 600 650" aria-hidden="true">
                <path className="hero-path" d="M62 472 C135 558, 173 572, 240 527 C327 468, 283 326, 390 250 C455 204, 524 224, 554 140" strokeDasharray="820" strokeDashoffset="820" />
              </svg>
              <div className="hero-photo image-frame soft-shadow"><img src={IMAGES.hero} alt="Menino realizando atividade de movimento com profissional da Follow Kids" /></div>
              <div className="floating-shape shape-coral" aria-hidden="true"><span className="shape-inner" /></div>
              <div className="floating-shape shape-yellow" aria-hidden="true"><span className="shape-inner" /></div>
              <div className="floating-shape shape-sage" aria-hidden="true"><span className="shape-inner" /></div>
              <span className="float-label label-movement">↗ Movimento</span>
              <span className="float-label label-cognition">✦ Cognição</span>
              <span className="float-label label-evolution">○ Evolução</span>
            </div>
          </div>
          <svg className="hero-bottom-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path fill="#fffdf9" d="M0,72 C325,136 792,-22 1440,58 L1440,120 L0,120 Z" /></svg>
        </section>

        <section className="section section-warm" id="sobre" aria-labelledby="sobre-title">
          <div className="container about-grid">
            <div className="about-visual reveal">
              <div className="about-shape" aria-hidden="true" />
              <div className="about-photo image-frame soft-shadow"><img src={IMAGES.childBalance} alt="Profissional apoiando uma criança durante uma atividade de equilíbrio" loading="lazy" /></div>
              <div className="about-stamp">+<span>respeito<br />ao tempo</span></div>
            </div>
            <div className="about-copy reveal">
              <div className="eyebrow">Acolhimento que se percebe</div>
              <h2 className="section-title" id="sobre-title">Cada criança tem seu tempo. Cada conquista tem seu valor.</h2>
              <p className="section-copy">Na Follow Kids, o cuidado começa antes do movimento: começa na escuta, no vínculo e na compreensão do que faz sentido para cada criança e sua família.</p>
              <p className="section-copy">Criamos experiências de atendimento que respeitam singularidades e abrem espaço para a curiosidade, a participação e a autonomia — sem pressa e sem fórmulas prontas.</p>
              <div className="quote-card">“A infância não precisa caber em um roteiro. O cuidado pode acompanhar o caminho.”</div>
              <div className="pillar-grid" aria-label="Pilares do cuidado Follow Kids">
                <article className="pillar-card"><div className="pillar-icon movement"><MoveUpRight size={18} /></div><h3>Movimento</h3><p>Corpo, espaço e confiança para explorar novas possibilidades.</p></article>
                <article className="pillar-card"><div className="pillar-icon cognition"><Focus size={18} /></div><h3>Cognição</h3><p>Conexões que ganham significado no brincar e no cotidiano.</p></article>
                <article className="pillar-card"><div className="pillar-icon evolution"><Sparkles size={18} /></div><h3>Evolução</h3><p>Um caminho singular, acompanhado com presença e cuidado.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-sage" id="cuidados" aria-labelledby="cuidados-title">
          <div className="container">
            <div className="center-heading reveal">
              <div className="eyebrow">Áreas de cuidado</div>
              <h2 className="section-title" id="cuidados-title">Um espaço para olhar o todo.</h2>
              <p className="section-copy">Os serviços abaixo estão preparados como estrutura editorial e aguardam validação da clínica antes de serem publicados.</p>
            </div>
            <div className="service-grid">
              {SITE_CONFIG.services.map(({ title, description, icon: Icon }, index) => <article className="service-card reveal" key={index}>
                <span className="service-number">0{index + 1}</span><span className="edit-badge">Em edição</span>
                <div className="service-icon"><Icon size={22} strokeWidth={1.8} /></div>
                <h3>{title}</h3><p>{description}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section section-navy" id="abordagem" aria-labelledby="abordagem-title">
          <div className="container approach-layout">
            <div className="approach-intro reveal">
              <div className="eyebrow">Nossa abordagem</div>
              <h2 className="section-title" id="abordagem-title">O caminho se constrói junto.</h2>
              <p className="section-copy">Uma proposta de etapas para orientar a experiência da família — a ser validada pela clínica e adaptada à realidade de cada atendimento.</p>
              <div className="approach-note"><CircleHelp size={16} /> O conteúdo desta seção é uma proposta de edição e deve ser validado pela equipe Follow Kids.</div>
            </div>
            <div className="path-list reveal">
              {["Acolher", "Compreender", "Planejar", "Acompanhar"].map((item, index) => <div className="path-item" key={item}>
                <div className="path-marker">0{index + 1}</div>
                <div className="path-copy"><h3>{item}</h3><p>{["Criar um primeiro encontro com escuta, vínculo e tranquilidade.", "Observar necessidades, interesses e contextos com atenção.", "Construir objetivos possíveis com a participação da família.", "Revisitar o caminho e celebrar cada pequena descoberta."][index]}</p></div>
              </div>)}
            </div>
          </div>
        </section>

        <section className="section section-warm" id="espaco" aria-labelledby="espaco-title">
          <div className="container">
            <div className="gallery-head reveal">
              <div><div className="eyebrow">Nosso espaço</div><h2 className="section-title" id="espaco-title">Onde o cuidado<br />ganha movimento.</h2></div>
              <p className="section-copy max-w-sm">Imagens reais da Follow Kids, com ambientes preparados para acolher diferentes formas de brincar, explorar e se desenvolver.</p>
            </div>
            <div className="gallery-grid reveal">
              {GALLERY.map((item) => <button className="gallery-card" key={item.src} onClick={() => setLightbox(item)} aria-label={`Ampliar: ${item.label}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="gallery-overlay"><span>{item.label} <ArrowUpRight size={14} className="ml-1 inline" /></span></span>
              </button>)}
            </div>
            <p className="gallery-footnote">A galeria apresenta registros fornecidos pela clínica. Fotos utilizadas com finalidade institucional.</p>
          </div>
        </section>

        <section className="section section-sage" id="faq" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro reveal"><div className="eyebrow">Perguntas frequentes</div><h2 className="section-title" id="faq-title">O primeiro passo pode ser simples.</h2><p className="section-copy">Reunimos perguntas para facilitar a conversa inicial. As respostas oficiais serão preenchidas pela clínica.</p></div>
            <div className="faq-list reveal">
              {["Como faço o primeiro contato?", "Como funciona a primeira conversa?", "Como os responsáveis participam?", "Onde a Follow Kids está localizada?"].map((question, index) => <details className="faq-item" key={question} open={index === 0}>
                <summary>{question}<Plus size={19} strokeWidth={1.7} /></summary>
                <div className="faq-answer">[Resposta da clínica — conteúdo a validar e preencher antes da publicação.]</div>
              </details>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-warm" id="contato" aria-labelledby="contato-title">
          <div className="container">
            <div className="contact-card reveal">
              <div className="contact-copy"><div className="eyebrow">Vamos conversar</div><h2 className="section-title" id="contato-title">Vamos conversar sobre o cuidado com seu filho?</h2><p className="section-copy">A equipe Follow Kids está preparando os canais oficiais de contato. Enquanto isso, deixe os dados abaixo prontos para a próxima etapa de publicação.</p><div className="contact-actions"><button className="btn-primary" onClick={() => handlePending("WhatsApp")}>Falar pelo WhatsApp <MessageCircle size={17} /></button>{SITE_CONFIG.instagram ? <a className="btn-secondary" href={SITE_CONFIG.instagram} target="_blank" rel="noreferrer">Instagram <Instagram size={16} /></a> : <button className="btn-secondary" onClick={() => handlePending("Instagram")}>Instagram <Instagram size={16} /></button>}</div></div>
              <div className="contact-details" aria-label="Dados de contato em edição">
                <div className="contact-detail"><Phone size={20} /><div><span>Telefone</span><strong className="placeholder-value">{SITE_CONFIG.phone}</strong></div></div>
                <div className="contact-detail"><Mail size={20} /><div><span>Endereço</span><strong className="placeholder-value">{SITE_CONFIG.address}</strong></div></div>
                <div className="contact-detail"><Check size={20} /><div><span>Horários</span><strong className="placeholder-value">{SITE_CONFIG.hours}</strong></div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top"><div className="footer-brand"><Brand light /><p className="footer-copy">Cuidado que acolhe, descobertas que transformam. Um espaço para a infância acontecer com respeito.</p></div><nav className="footer-links" aria-label="Links do rodapé">{NAV_ITEMS.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}<button onClick={() => toast("Política de privacidade será adicionada após a validação jurídica da clínica.")}>Privacidade</button></nav></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Follow Kids. Conteúdo institucional em edição.</span><button onClick={() => scrollToId("inicio")}>Voltar ao topo <ArrowDownRight size={13} className="ml-1 inline rotate-[-135deg]" /></button></div>
        </div>
      </footer>

      <button className="motion-control" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused}>{motionPaused ? <Play size={13} /> : <Pause size={13} />}{motionPaused ? "Retomar movimento" : "Pausar movimento"}</button>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} onClick={() => setLightbox(null)}><button className="lightbox-close" aria-label="Fechar imagem" onClick={() => setLightbox(null)}><X size={19} /></button><img className="lightbox-image" src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}

import Anthropic from "@lobehub/icons/es/Anthropic/components/Mono";
import Gemini from "@lobehub/icons/es/Gemini/components/Color";
import OpenAI from "@lobehub/icons/es/OpenAI/components/Mono";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  KeyRound,
  Layers3,
  Wallet,
} from "lucide-react";
import { useRef, useState } from "react";
import { Brand } from "./Brand";
import { LandingProduct } from "./LandingProduct";
import { providerPopularityRank } from "./model-order";
import "./landing.css";

type LandingProps = {
  onSignIn: () => void;
  heroUrl?: string;
  heroLightUrl?: string;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
};
const providers = [
  { name: "OpenAI", id: "openai", file: "openai.svg" },
  { name: "Anthropic", id: "anthropic", file: "anthropic.svg" },
  { name: "Google Gemini", id: "gemini", file: "gemini.svg" },
  { name: "DeepSeek", id: "deepseek", file: "deepseek.svg" },
  { name: "Qwen", id: "qwen", file: "qwen.png" },
  { name: "Mistral", id: "mistral", file: "mistral.svg" },
  { name: "Kimi", id: "kimi", file: "kimi.svg" },
  { name: "MiniMax", id: "minimax", file: "minimax.webp" },
  { name: "Seedance", id: "seedance", file: "" },
].sort((a, b) => providerPopularityRank(a.name) - providerPopularityRank(b.name));
const questions = [
  {
    question: "What am I purchasing?",
    answer:
      "Credit for your Vishwa workspace. One balance gives you access to the models in the catalog, with usage charged at each model’s input and output rates.",
  },
  {
    question: "Do I need to change my SDK?",
    answer:
      "Use an OpenAI-compatible SDK with the Vishwa endpoint and your API key. Select a model by its ID and keep your existing request structure.",
  },
  {
    question: "How is token usage priced?",
    answer:
      "Input and output tokens are priced separately for each model. Your activity view shows the token counts, applied rates, and cost of each request.",
  },
];
function ProviderMarquee() {
  return (
    <section className="lp-providers" aria-label="Model providers">
      <ul className="lp-sr-only">
        {providers.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
      <div className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee-track">
          {[0, 1].map((copy) => (
            <div className="lp-marquee-group" key={copy}>
              {providers.map(({ id, name, file }) => (
                <div className={"lp-provider lp-provider-" + id} key={id}>
                  {id === "seedance" ? (
                    <span className="lp-seedance-wordmark">Seedance</span>
                  ) : (
                    <img
                      src={"./provider-logos/" + file}
                      alt={name}
                      loading="eager"
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function CreditFlow() {
  return (
    <figure
      className="lp-credit-flow"
      aria-label="Fiat or crypto funds workspace credit. Your API key accesses multiple models and tracks input and output usage."
    >
      <div className="lp-funding">
        <span>
          <CreditCard size={17} />
          Fiat
        </span>
        <span>
          <Wallet size={17} />
          Crypto
        </span>
      </div>
      <div className="lp-flow-connector">
        <i />
      </div>
      <div className="lp-credit-core">
        <div className="lp-core-orbit" />
        <Layers3 size={26} />
        <strong>Credit</strong>
        <span className="lp-core-key">
          <KeyRound size={14} />
          API key
        </span>
      </div>
      <div className="lp-distribution">
        <svg viewBox="0 0 480 78" preserveAspectRatio="none" aria-hidden="true">
          <path d="M240 0v20Q240 36 224 36H54Q40 36 40 52v26M240 0v78M240 0v20Q240 36 256 36H426Q440 36 440 52v26" />
        </svg>
      </div>
      <div className="lp-model-nodes">
        <span>
          <OpenAI size={25} />
          OpenAI
        </span>
        <span>
          <Anthropic size={25} />
          Anthropic
        </span>
        <span>
          <Gemini size={25} />
          Gemini
        </span>
      </div>
      <div className="lp-meter-line">
        <span>
          <i />
          Input tokens
        </span>
        <span>
          <i />
          Output tokens
        </span>
      </div>
    </figure>
  );
}
export function Landing({ onSignIn }: LandingProps) {
  const product = useRef<HTMLElement>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const explore = () =>
    product.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  return (
    <div className="vg-landing lp-landing">
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <a href="#/" aria-label="Vishwa Gateway home">
            <Brand />
          </a>
          <button className="lp-nav-signin" onClick={onSignIn}>
            Sign in
            <ArrowUpRight size={16} />
          </button>
        </div>
      </header>
      <main>
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <div className="lp-hero-scene" aria-hidden="true">
            <img
              className="lp-orbital-background"
              src="./gateway-space-plate-v3.png"
              alt=""
              width="1672"
              height="941"
              fetchPriority="high"
            />
            <div className="lp-orbital-subject">
              <img
                src="./gateway-ring-detail-v3.png"
                alt=""
                width="1254"
                height="1254"
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="lp-container lp-hero-content">
            <div className="lp-hero-copy">
              <h1 id="lp-hero-title">
                Intelligence.
                <br />
                <span>On your terms.</span>
              </h1>
              <p className="lp-hero-description">
                One API for leading AI models.
                <br />
                One balance, billed by usage.
              </p>
              <div className="lp-hero-actions">
                <button className="lp-button lp-primary" onClick={onSignIn}>
                  Start building
                  <ArrowUpRight size={18} />
                </button>
                <button className="lp-button lp-secondary" onClick={explore}>
                  Explore the platform
                  <ArrowDown size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <ProviderMarquee />
        <section
          className="lp-container lp-product-section"
          ref={product}
          aria-labelledby="lp-product-title"
        >
          <div className="lp-section-intro">
            <h2 id="lp-product-title">
              Built for how
              <br />
              <span>you build.</span>
            </h2>
          </div>
          <LandingProduct />
        </section>
        <section className="lp-credit-section" aria-labelledby="lp-credit-title">
          <div className="lp-container lp-credit-layout">
            <div className="lp-credit-copy">
              <h2 id="lp-credit-title">
                Your models.
                <br />
                <span>One balance.</span>
              </h2>
              <ol className="lp-steps">
                <li>
                  <span>01</span>
                  <h3>Add credit</h3>
                </li>
                <li>
                  <span>02</span>
                  <h3>Connect with an API key</h3>
                </li>
                <li>
                  <span>03</span>
                  <h3>Track every token</h3>
                </li>
              </ol>
            </div>
            <CreditFlow />
          </div>
        </section>
        <section className="lp-container lp-faq" aria-labelledby="lp-faq-title">
          <div>
            <h2 id="lp-faq-title">
              Clarity,
              <br />
              <span>from the start.</span>
            </h2>
          </div>
          <div className="lp-faq-list">
            {questions.map((item, i) => (
              <div className="lp-faq-item" key={item.question}>
                <h3>
                  <button
                    aria-expanded={openQuestion === i}
                    aria-controls={"lp-answer-" + i}
                    id={"lp-question-" + i}
                    onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                  >
                    {item.question}
                    <ChevronDown size={20} />
                  </button>
                </h3>
                <div
                  id={"lp-answer-" + i}
                  role="region"
                  aria-labelledby={"lp-question-" + i}
                  hidden={openQuestion !== i}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="lp-container lp-closing">
          <div className="lp-closing-horizon" aria-hidden="true" />
          <h2>Build what comes next.</h2>
          <button className="lp-button lp-primary" onClick={onSignIn}>
            Start building
            <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="lp-container lp-footer">
        <Brand />
        <span>© {new Date().getFullYear()} Vishwa</span>
      </footer>
    </div>
  );
}

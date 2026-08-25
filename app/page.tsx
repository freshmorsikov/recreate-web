"use client";

import { Fragment, useEffect, useState } from "react";

type Slide = {
  id: string;
  collection: string;
  title: string[];
  image: string;
};

const slides: Slide[] = [
  {
    id: "browse",
    collection: "Browse",
    title: ["Explore curated photo collections"],
    image: "assets/recreate-step-1.jpg",
  },
  {
    id: "overlay",
    collection: "Overlay",
    title: ["Match the shot for the perfect photo"],
    image: "assets/recreate-step-2.jpg",
  },
  {
    id: "pose",
    collection: "Pose",
    title: ["From idea to photo in one tap"],
    image: "assets/recreate-step-3.jpg",
  },
  {
    id: "result",
    collection: "Shot",
    title: ["Spend less time searching and more time living"],
    image: "assets/recreate-step-4.jpg",
  },
];

const features = [
  {
    title: "Curated ideas",
    copy: "Browse ready-to-recreate photos instead of digging through endless saves.",
  },
  {
    title: "Transparent overlay",
    copy: "Place the reference directly over your camera view to match the pose and framing.",
  },
  {
    title: "Faster final shot",
    copy: "Know where to stand, how to angle, and when the composition is close enough.",
  },
];

const storeButtons = [
  {
    label: "Get ReCreate on Google Play",
    image: "assets/google-play-badge.svg",
    href: "#download",
  },
  {
    label: "Download ReCreate on the App Store",
    image: "assets/app-store-badge.svg",
    href: "#download",
  },
];

function StoreActions({ className = "" }: { className?: string }) {
  return (
    <div className={`store-actions ${className}`.trim()}>
      {storeButtons.map((button) => (
        <a
          className="store-badge-button"
          href={button.href}
          key={button.label}
          aria-label={button.label}
        >
          <img src={button.image} alt="" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function PhoneDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className="phone-demo" aria-label="Interactive ReCreate app preview">
      <div className="phone-shell">
        <div className="phone-screen">
          <img
            key={activeSlide.id}
            className="phone-photo"
            src={activeSlide.image}
            alt={`${activeSlide.title.join(" ")} preview`}
          />

          <div className="phone-status" aria-hidden="true">
            <span>20:31</span>
            <span className="status-icons">5G</span>
          </div>

          <div className="camera-cutout" aria-hidden="true" />

          <div className="phone-caption">
            <strong>
              {activeSlide.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </strong>
          </div>

          <button
            className="phone-nav phone-nav-previous"
            type="button"
            onClick={showPrevious}
            aria-label="Previous preview"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            className="phone-nav phone-nav-next"
            type="button"
            onClick={showNext}
            aria-label="Next preview"
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className="phone-controls">
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Preview progress"
              aria-valuemin={1}
              aria-valuemax={slides.length}
              aria-valuenow={activeIndex + 1}
            >
              <span
                style={{
                  width: `${((activeIndex + 1) / slides.length) * 100}%`,
                }}
              />
            </div>

            <div className="collection-tabs" role="tablist" aria-label="Photo collections">
              {slides.map((slide, index) => (
                <button
                  className={
                    index === activeIndex
                      ? "collection-tab collection-tab-active"
                      : "collection-tab"
                  }
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={slide.image} alt="" aria-hidden="true" />
                  <span>{slide.collection}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-note" aria-hidden="true">
        <span>Reference</span>
        <span>Overlay</span>
        <span>Shot</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ReCreate home">
          <img
            className="brand-mark"
            src="assets/recreate-logo.webp"
            alt=""
            aria-hidden="true"
          />
          <span>ReCreate</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#demo">Demo</a>
          <a href="#features">Features</a>
          <a href="#download">Get the app</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <h1>
            Recreate photos
            <span> you love</span>
          </h1>
          <p className="hero-description">
            Browse curated photo ideas, pick a reference, and use it as a
            transparent camera overlay to match the pose, angle, framing, and
            composition.
          </p>

          <StoreActions className="hero-actions" />
        </div>

        <PhoneDemo />
      </section>

      <section className="demo-section" id="demo" aria-labelledby="demo-title">
        <div className="section-copy">
          <p className="eyebrow">From idea to photo</p>
          <h2 id="demo-title">A reference you can actually shoot with.</h2>
          <p>
            ReCreate turns inspiration into a live camera guide, so matching the
            original photo feels natural instead of like guesswork.
          </p>
        </div>

        <div className="step-grid">
          <article>
            <span>01</span>
            <h3>Browse</h3>
            <p>Open collections built around poses, locations, and photo moods.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Choose</h3>
            <p>Pick the reference that matches the shot you want to recreate.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Align</h3>
            <p>Use the transparent overlay to match angle, pose, and composition.</p>
          </article>
        </div>
      </section>

      <section
        className="feature-section"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="section-copy">
          <p className="eyebrow">Simple by design</p>
          <h2 id="features-title">Everything points toward the shot.</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="download-section"
        id="download"
        aria-labelledby="download-title"
      >
        <div>
          <p className="eyebrow">Ready when the moment is</p>
          <h2 id="download-title">Spend less time searching. More time living.</h2>
        </div>
        <StoreActions className="download-actions" />
      </section>
    </main>
  );
}

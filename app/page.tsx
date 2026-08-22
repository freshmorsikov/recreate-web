"use client";

import { useEffect, useState } from "react";

type Slide = {
  id: string;
  collection: string;
  title: string;
  copy: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: "collections",
    collection: "Trending",
    title: "Explore curated collections",
    copy: "Find shoot ideas by mood, place, pose, and moment.",
    image: "/assets/slide-collections.jpg",
  },
  {
    id: "poses",
    collection: "Pose",
    title: "Pick a reference that feels right",
    copy: "Save the angle, stance, and framing before you shoot.",
    image: "/assets/slide-poses.jpg",
  },
  {
    id: "overlay",
    collection: "Overlay",
    title: "Match the composition live",
    copy: "Use a transparent guide to line up the shot faster.",
    image: "/assets/slide-overlay.jpg",
  },
  {
    id: "result",
    collection: "City",
    title: "Get the photo you pictured",
    copy: "From reference to camera roll with less trial and error.",
    image: "/assets/slide-result.jpg",
  },
  {
    id: "travel",
    collection: "Travel",
    title: "Spend less time searching",
    copy: "Keep moving and capture the moment while it is still yours.",
    image: "/assets/slide-travel.jpg",
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
    image: "/assets/google-play-badge.svg",
    href: "#download",
  },
  {
    label: "Download ReCreate on the App Store",
    image: "/assets/app-store-badge.svg",
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
            alt={`${activeSlide.title} preview`}
          />

          <div className="phone-status" aria-hidden="true">
            <span>9:41</span>
            <span className="status-icons">5G</span>
          </div>

          <div className="camera-cutout" aria-hidden="true" />

          <div className="phone-caption">
            <span>{activeSlide.collection}</span>
            <strong>{activeSlide.title}</strong>
            <p>{activeSlide.copy}</p>
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
          <span className="brand-mark">R</span>
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
          <p className="eyebrow">Photo inspiration + overlay camera</p>
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

          <div className="hero-points" aria-label="ReCreate highlights">
            <span>Curated ideas</span>
            <span>Live overlay</span>
            <span>Better framing</span>
          </div>
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

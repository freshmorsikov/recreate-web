"use client";

import { Fragment, useEffect, useState } from "react";
import { site } from "./site";

type Slide = {
  id: string;
  collection: string;
  title: string[];
  image: string;
};

const slides: Slide[] = [
  {
    id: "browse",
    collection: "Explore",
    title: ["Explore curated photo collections"],
    image: "assets/recreate-step-1.jpg",
  },
  {
    id: "overlay",
    collection: "Match",
    title: ["Match the shot for the perfect photo"],
    image: "assets/recreate-step-2.jpg",
  },
  {
    id: "pose",
    collection: "One tap",
    title: ["From idea to photo in one tap"],
    image: "assets/recreate-step-3.jpg",
  },
  {
    id: "result",
    collection: "Done",
    title: ["Spend less time searching and more time living"],
    image: "assets/recreate-step-4.jpg",
  },
];

const features = [
  {
    title: "Find your reference",
    copy: "Explore curated photo ideas for popular poses and settings, or choose your own reference photo.",
    image: slides[0].image,
    imageAlt: "ReCreate photo collection screen with pose reference ideas",
  },
  {
    title: "Match it live",
    copy: "See your reference directly over the camera view and adjust the opacity to match pose, angle, and framing.",
    image: slides[1].image,
    imageAlt: "Reference photo overlay aligned on a live camera view",
  },
  {
    title: "Get the shot faster",
    copy: "Capture, save, share, or retake without endless explanations and guesswork.",
    image: slides[2].image,
    imageAlt: "Finished recreated photo ready to save or share",
  },
];

const searchIntentGuides = [
  {
    title: "Camera overlay app for matching a reference photo",
    copy: "Use ReCreate when you already know the photo you want: a travel shot, a saved pose, a creator's frame, or an older photo you want to recreate. The reference sits over the live camera view so you can line up the subject, horizon, distance, and crop before you take the picture.",
  },
  {
    title: "Photo pose overlay app for fewer awkward retakes",
    copy: "A transparent pose overlay makes it easier for the person behind the camera and the person in the photo to understand the same goal. Instead of saying move left, tilt your head, or raise your hand again and again, you can compare the live shot to the pose reference in the moment.",
  },
  {
    title: "Recreate photo app for before-and-after shots",
    copy: "ReCreate helps with recreating childhood photos, vacation memories, friend group pictures, maternity shots, engagement photos, and social posts. Choose the original or inspiration image, adjust the overlay opacity, and capture a new version with the same framing.",
  },
  {
    title: "Photo composition reference app for framing and angles",
    copy: "Good photos are not only about posing. The app also helps you match composition details like where faces sit in the frame, how much background to include, whether the camera is high or low, and where hands, props, buildings, or scenery should land.",
  },
];

const ideaCollections = [
  {
    title: "Vacation",
    copy: "Beach days, golden-hour sand shots, poolside portraits, and relaxed vacation photo ideas are easier to recreate when the pose, crop, and sunlight are visible over the camera.",
    image: "assets/idea-vacation.jpeg",
    imageAlt: "Vacation photo pose on a sunny beach with flowers in hair",
  },
  {
    title: "Chilling at home",
    copy: "Turn cozy at-home moments into natural photo references: coffee by the window, kitchen light, soft sweaters, mirror shots, and calm everyday poses.",
    image: "assets/idea-chilling-at-home.jpeg",
    imageAlt: "Chilling at home photo pose holding coffee in a warm kitchen",
  },
  {
    title: "Traveling",
    copy: "Use travel photo pose ideas for balconies, landmarks, city views, hotel breakfasts, museums, and scenes where the background needs to line up with the subject.",
    image: "assets/idea-traveling.jpeg",
    imageAlt: "Traveling photo pose on a balcony with the Eiffel Tower in the background",
  },
  {
    title: "Mood",
    copy: "Save mood-based photo references for portraits with dramatic skies, soft expressions, seated poses, quiet landscapes, and composition built around atmosphere.",
    image: "assets/idea-mood.jpeg",
    imageAlt: "Mood portrait pose seated in grass beneath dramatic clouds and a rainbow",
  },
];

const storeButtons = [
  {
    label: "Get ReCreate on Google Play",
    image: "assets/google-play-badge.svg",
    href: site.googlePlayUrl,
  },
  {
    label: "Download ReCreate on the App Store",
    image: "assets/app-store-badge.svg",
    href: "#steps",
  },
];

const steps = [
  {
    step: "Step 1",
    title: "Find a reference",
    copy: "Choose a photo from curated collections or use your own.",
  },
  {
    step: "Step 2",
    title: "Open the camera",
    copy: "Use the reference as a transparent overlay while you frame the shot.",
  },
  {
    step: "Step 3",
    title: "Take the shot",
    copy: "Match the pose and composition, capture the photo, and save or share it.",
  },
];

const AUTO_SWIPE_DELAY_MS = 10000;

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
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_SWIPE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

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
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 2L3 6L7 10"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="phone-nav phone-nav-next"
            type="button"
            onClick={showNext}
            aria-label="Next preview"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 2L9 6L5 10"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="phone-controls">
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
          <a href="#features">Features</a>
          <a href="#guides">Guides</a>
          <a href="#ideas">Ideas</a>
          <a href="#faq">FAQ</a>
          <a href="#steps">Get started</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <h1>
            Recreate photos
            <span> you love</span>
          </h1>
          <p className="hero-description">
            Find the perfect pose and composition for any photo that inspires
            you, without endless explanations and retakes.
          </p>

          <StoreActions className="hero-actions" />
        </div>

        <PhoneDemo />
      </section>

      <section
        className="feature-section"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="section-copy">
          <h2 id="features-title">Key features</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title}>
              <img
                className="feature-image"
                src={feature.image}
                alt={feature.imageAlt}
              />
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section"
        id="guides"
        aria-labelledby="guides-title"
      >
        <div className="section-copy guide-intro">
          <h2 id="guides-title">Photo overlay guides</h2>
          <p>
            ReCreate is built around the search moments people actually have:
            finding a camera overlay app, lining up a photo pose overlay,
            recreating a picture, or using a composition reference while the
            camera is open.
          </p>
        </div>

        <div className="guide-list">
          {searchIntentGuides.map((guide) => (
            <article key={guide.title}>
              <h3>{guide.title}</h3>
              <p>{guide.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="ideas-section"
        id="ideas"
        aria-labelledby="ideas-title"
      >
        <div className="section-copy">
          <h2 id="ideas-title">Photo pose ideas to recreate</h2>
          <p>
            Start with a pose idea, then use the overlay to turn it into a
            real photo instead of another saved image that stays in your camera
            roll.
          </p>
        </div>

        <div className="ideas-grid">
          {ideaCollections.map((collection) => (
            <article key={collection.title}>
              <img
                className="idea-image"
                src={collection.image}
                alt={collection.imageAlt}
              />
              <div className="idea-card-copy">
                <h3>{collection.title}</h3>
                <p>{collection.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="section-copy faq-intro">
          <h1 id="faq-title">Frequently asked questions</h1>
        </div>

        <div className="faq-list">
          <article>
            <h2>What is ReCreate?</h2>
            <p>
              ReCreate helps you recreate photos you love. Pick a reference
              photo, open the camera, and use the transparent overlay to match
              the pose, angle, framing, and composition.
            </p>
          </article>
          <article>
            <h2>Who is ReCreate for?</h2>
            <p>
              ReCreate is for everyone who wants to take better photos without
              awkward posing, endless retakes, or trying to explain the exact
              shot they have in mind. Whether you&apos;re taking photos of your
              partner, friends, or yourself, ReCreate helps turn inspiration
              into a photo you can actually recreate.
            </p>
          </article>
          <article>
            <h2>How does ReCreate work?</h2>
            <p>
              Choose a photo you want to recreate, then open it in
              ReCreate&apos;s camera. The reference appears as a transparent
              overlay, helping you position the camera and subject more
              accurately.
            </p>
          </article>
          <article>
            <h2>Is ReCreate a camera overlay app?</h2>
            <p>
              Yes. ReCreate lets you place a reference photo over the camera
              preview, then change the opacity so you can match the pose,
              angle, framing, and composition before taking the picture.
            </p>
          </article>
          <article>
            <h2>Can ReCreate help with couple and travel photo pose ideas?</h2>
            <p>
              Yes. ReCreate is useful for couple photo pose ideas, travel photo
              pose ideas, solo portraits, group photos, and any shot where a
              visual reference is easier than explaining the pose from memory.
            </p>
          </article>
          <article>
            <h2>Can I use my own reference photos?</h2>
            <p>
              Yes. You can use your own photo inspiration and recreate the shot
              with ReCreate.
            </p>
          </article>
          <article>
            <h2>Does ReCreate include photo ideas?</h2>
            <p>
              Yes. You can explore curated collections of photo ideas for
              different situations, locations, and moods, then recreate the ones
              you like.
            </p>
          </article>
          <article>
            <h2>Do I need someone else to take the photo?</h2>
            <p>
              Not necessarily. ReCreate can help whether someone else is taking
              your photo or you&apos;re setting up the shot yourself. The
              overlay makes it much easier to explain exactly what you want.
            </p>
          </article>
          <article>
            <h2>Is ReCreate free?</h2>
            <p>
              ReCreate includes free functionality, with additional features
              available through ReCreate Pro.
            </p>
          </article>
        </div>
      </section>

      <section
        className="steps-section"
        id="steps"
        aria-labelledby="steps-title"
      >
        <div className="section-copy">
          <h2 id="steps-title">Get started</h2>
        </div>

        <div className="steps-grid">
          {steps.map((item) => (
            <article key={item.step}>
              <p className="step-label">{item.step}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <StoreActions className="steps-actions" />
      </section>
    </main>
  );
}

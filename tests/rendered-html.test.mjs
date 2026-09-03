import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the ReCreate landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ReCreate - Recreate photos you love<\/title>/i);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/recreate\.freshmorsikov\.com\/"/,
  );
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(
    html,
    /<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/recreate\.freshmorsikov\.com\/"/,
  );
  assert.doesNotMatch(html, /href="\/favicon\.svg"/);
  const linkTags = html.match(/<link\b[^>]*>/g) ?? [];
  assert.ok(
    linkTags.some(
      (tag) =>
        /rel="icon"/.test(tag) &&
        /href="\/favicon\.ico"/.test(tag) &&
        /sizes="48x48"/.test(tag) &&
        /type="image\/x-icon"/.test(tag),
    ),
    "expected a root favicon.ico link for search crawlers",
  );
  assert.ok(
    linkTags.some(
      (tag) =>
        /rel="icon"/.test(tag) &&
        /href="\/favicon-96x96\.png"/.test(tag) &&
        /sizes="96x96"/.test(tag) &&
        /type="image\/png"/.test(tag),
    ),
    "expected a crawlable 96x96 PNG favicon link",
  );
  assert.ok(
    linkTags.some(
      (tag) =>
        /rel="apple-touch-icon"/.test(tag) &&
        /href="\/apple-touch-icon\.png"/.test(tag) &&
        /sizes="180x180"/.test(tag),
    ),
    "expected an apple touch icon link",
  );
  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/,
  );
  assert.ok(jsonLdMatch, "expected MobileApplication JSON-LD to render");

  const jsonLd = JSON.parse(jsonLdMatch[1]);
  assert.deepEqual(jsonLd["@type"], ["SoftwareApplication", "MobileApplication"]);
  assert.equal(jsonLd.name, "ReCreate");
  assert.equal(jsonLd.operatingSystem, "Android");
  assert.equal(jsonLd.applicationCategory, "MultimediaApplication");
  assert.equal(
    jsonLd.installUrl,
    "https://play.google.com/store/apps/details?id=com.recreate.photo&referrer=utm_source%3Dwebsite",
  );
  assert.deepEqual(jsonLd.offers, {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    url: "https://play.google.com/store/apps/details?id=com.recreate.photo&referrer=utm_source%3Dwebsite",
    availability: "https://schema.org/InStock",
  });
  assert.equal(jsonLd.publisher.name, "ReCreate");
  assert.equal(jsonLd.screenshot.length, 4);
  assert.match(
    jsonLd.screenshot[0],
    /^https:\/\/recreate\.freshmorsikov\.com\/assets\/recreate-step-1\.webp$/,
  );
  assert.equal(jsonLd.aggregateRating, undefined);
  assert.equal(jsonLd.review, undefined);
  assert.match(html, /Recreate photos/);
  assert.doesNotMatch(html, /Photo inspiration \+ overlay camera/);
  assert.match(html, /Explore curated photo collections/);
  assert.match(html, /href="#steps">Get started/);
  assert.match(html, /href="#steps">Get started<\/a><a href="#faq">FAQ/);
  assert.match(
    html,
    /<section class="steps-section"[\s\S]*<section class="faq-section"/,
  );
  assert.doesNotMatch(html, /href="#guides"/);
  assert.doesNotMatch(html, /Photo overlay guides/);
  assert.match(html, /camera overlay app/i);
  assert.match(html, /photo pose overlay app/i);
  assert.match(html, /recreate photo app/i);
  assert.match(html, /photo composition reference app/i);
  assert.match(html, /Vacation/);
  assert.match(html, /Chilling at home/);
  assert.match(html, /Traveling/);
  assert.match(html, /Mood/);
  assert.match(html, /Browse inspiring photo ideas for wherever you are/);
  assert.match(html, /Each mood has a distinct visual character/);
  assert.match(html, /Vacation ideas focus on easy, sunlit photos/);
  assert.doesNotMatch(html, /dramatic skies/);
  assert.match(html, /assets\/idea-vacation\.webp/);
  assert.match(html, /assets\/idea-chilling-at-home\.webp/);
  assert.match(html, /assets\/idea-traveling\.webp/);
  assert.match(html, /assets\/idea-mood\.webp/);
  assert.match(html, /Find a reference/);
  assert.match(html, /Open the camera/);
  assert.match(html, /Take the shot/);
  assert.doesNotMatch(html, /Ready when the moment is/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("starter preview code is disconnected", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("static SEO files are exported", async () => {
  const [robots, sitemap, faviconIco, faviconPng, appleTouchIcon] =
    await Promise.all([
    readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/favicon.ico", import.meta.url)),
    readFile(new URL("../dist/client/favicon-96x96.png", import.meta.url)),
    readFile(new URL("../dist/client/apple-touch-icon.png", import.meta.url)),
  ]);

  assert.match(robots, /^User-agent: \*/);
  assert.match(
    robots,
    /Sitemap: https:\/\/recreate\.freshmorsikov\.com\/sitemap\.xml/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/recreate\.freshmorsikov\.com\/<\/loc>/,
  );
  assert.match(sitemap, /<lastmod>2026-08-29<\/lastmod>/);
  assert.ok(faviconIco.byteLength > 0);
  assert.equal(faviconPng.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(appleTouchIcon.subarray(1, 4).toString("ascii"), "PNG");
});

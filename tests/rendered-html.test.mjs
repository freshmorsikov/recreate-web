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
  assert.match(html, /Recreate photos/);
  assert.doesNotMatch(html, /Photo inspiration \+ overlay camera/);
  assert.match(html, /Explore curated photo collections/);
  assert.match(html, /href="#steps">Get started/);
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
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8"),
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
});

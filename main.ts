// Entry program for make.fun bounty post-x-promote-make-your-own-bounty-01
// ("Promote make.fun's make-your-own-bounty post on X").
//
// The entry itself is the X post: one post of our own quoting make.fun's
// make-your-own-bounty post (https://x.com/makefunai/status/2124915864336236646),
// with a photo of its own, make.fun / @makefunai and our play code in its text.
// The post is live at https://x.com/zhong01bnb/status/2125802264254439440
// (posted 2026-11-26 from @zhong01bnb) and its address is recorded in POST.json.
// This program only hands the post's address to the grader: it reads POST.json
// from the repository root, checks the address is a real, canonical X post URL
// (no placeholder, no tracking query), and writes the same bytes to
// /output/POST.json, where the gate reads it. Nothing else is written, and
// nothing about the post is scored from what this program writes — the house
// reads the post on X.
//
// Node 22, standard library only: no network, no wall clock, no files outside
// the repository, and the two grader runs write the same bytes.
//
// Run locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// A canonical X post address: https://x.com/<handle>/status/<id> (or the
// twitter.com form). The gate fetches the post at this address, so a
// placeholder or a link with tracking parameters would not resolve to it.
const POST_URL = /^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

const postFile = join(botDir, "POST.json");
const postJson = readFileSync(postFile, "utf8");
const post = JSON.parse(postJson) as { url?: unknown };

if (typeof post.url !== "string" || !POST_URL.test(post.url)) {
  console.error("POST.json must name the post with a canonical X post url");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POST.json"), postJson);

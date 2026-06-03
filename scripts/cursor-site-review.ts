// One-shot local agent: Webflow+Vite maintenance brief. Needs CURSOR_API_KEY.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Agent, CursorAgentError } from "@cursor/sdk";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const PROMPT = `You are reviewing a static marketing site that was exported from Webflow and wrapped in Vite + React.

Read these paths relative to the repo root and nothing else unless needed for cross-references:
- index.html
- vite.config.js
- src/App.jsx, src/PageContent.jsx, src/main.jsx

Produce a concise report with these sections only:
1. **Stack summary** (one short paragraph: how routing, Webflow CSS/JS, and React interact).
2. **Top 3 risks** (e.g. external Webflow asset URLs, analytics, IX2/Webflow.init assumptions) with file references.
3. **Next 3 concrete tasks** a maintainer should do (ordered, actionable).

Keep the whole answer under 400 words. Use markdown headings for the three sections.`;

async function main() {
  if (!process.env.CURSOR_API_KEY?.trim()) {
    console.error(
      "Set CURSOR_API_KEY in the environment (Cursor dashboard → Cloud Agents / API key).",
    );
    process.exit(1);
  }

  try {
    const result = await Agent.prompt(PROMPT, {
      apiKey: process.env.CURSOR_API_KEY,
      model: { id: "composer-2" },
      local: {
        cwd: repoRoot,
        settingSources: [],
      },
    });

    if (result.status === "error") {
      console.error("Agent run finished with error status. Inspect the run in Cursor.");
      process.exit(2);
    }

    console.log(result.result ?? "");
  } catch (err) {
    if (err instanceof CursorAgentError) {
      console.error(`Agent failed to start: ${err.message} (retryable=${err.isRetryable})`);
      process.exit(1);
    }
    throw err;
  }
}

await main();

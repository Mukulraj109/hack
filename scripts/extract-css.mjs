import fs from "fs";

const lines = fs.readFileSync("src/PageContent.jsx", "utf8").split("\n");
const start = lines.findIndex((l) => l.includes("<style>{"));
const end = lines.findIndex((l, i) => i > start && l.includes("</style>"));
let css = lines
  .slice(start + 1, end)
  .join("\n")
  .replace(/^        /gm, "")
  .replace(/^`/, "")
  .replace(/`$/, "");

fs.mkdirSync("src/styles", { recursive: true });
fs.writeFileSync("src/styles/_full-inline.css", css);
console.log("Extracted", css.length, "chars");

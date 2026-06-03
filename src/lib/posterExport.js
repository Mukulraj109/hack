import { toPng } from "html-to-image";
import { getApiBaseUrl } from "./api.js";

const EXPORT_SIZES = {
  instagram: { width: 1080, height: 1920 },
  linkedin: { width: 1080, height: 1080 },
};

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function isCrossOriginUrl(src) {
  if (!src || !src.startsWith("http")) return false;
  try {
    return new URL(src).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isFirebaseStorageUrl(src) {
  try {
    const { hostname } = new URL(src);
    return (
      hostname === "storage.googleapis.com" || hostname.endsWith(".firebasestorage.app")
    );
  } catch {
    return false;
  }
}

async function fetchImageBlob(src) {
  if (src.startsWith("blob:")) {
    return (await fetch(src)).blob();
  }

  if (isCrossOriginUrl(src) && isFirebaseStorageUrl(src)) {
    const cleanUrl = src.split("?")[0];
    const proxyUrl = `${getApiBaseUrl()}/api/assets/proxy?url=${encodeURIComponent(cleanUrl)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) {
      throw new Error(`Proxy fetch failed (${res.status})`);
    }
    return res.blob();
  }

  if (isCrossOriginUrl(src)) {
    throw new Error("Cross-origin image cannot be exported");
  }

  const res = await fetch(src, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Image fetch failed (${res.status})`);
  }
  return res.blob();
}

async function inlinePosterImages(root) {
  const imgs = root.querySelectorAll("img[src]");

  await Promise.all(
    [...imgs].map(async (img) => {
      const src = img.getAttribute("src");
      if (!src || src.startsWith("data:")) return;

      try {
        const blob = await fetchImageBlob(src);
        const dataUrl = await blobToDataUrl(blob);
        img.setAttribute("src", dataUrl);
        img.removeAttribute("srcset");
        await img.decode?.().catch(() => undefined);
      } catch (err) {
        console.warn("Failed to inline poster image:", src, err);
        img.setAttribute("src", TRANSPARENT_PIXEL);
      }
    })
  );
}

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

/**
 * WYSIWYG export: clone the visible preview, render at full resolution (1080×1920 / 1080×1080),
 * so the downloaded PNG matches the modal preview exactly.
 */
export async function exportPosterElement(element, platform) {
  const size = EXPORT_SIZES[platform];
  if (!element || !size) {
    throw new Error("Invalid poster export target");
  }

  const frame =
    element.classList?.contains("team-poster-modal__preview-frame") ||
    element.classList?.contains("team-poster-slot__frame")
      ? element
      : element.closest(".team-poster-modal__preview-frame, .team-poster-slot__frame");

  const source =
    frame?.querySelector(".poster-tpl") ||
    element.querySelector(".poster-tpl") ||
    element;

  if (!source) {
    throw new Error("Invalid poster export target");
  }

  await inlinePosterImages(source);

  // Capture at the EXACT rendered size of the visible preview so the browser
  // lays it out identically to what the user sees, then upscale via pixelRatio.
  const rect = source.getBoundingClientRect();
  const previewWidth = Math.round(rect.width) || size.width;
  const previewHeight = Math.round(rect.height) || size.height;
  const ratio = size.width / previewWidth;

  const host = document.createElement("div");
  host.className = "team-poster-export-host";
  host.style.width = `${previewWidth}px`;
  host.style.height = `${previewHeight}px`;

  const clone = source.cloneNode(true);
  clone.classList.add("poster-exporting");
  clone.style.width = `${previewWidth}px`;
  clone.style.height = `${previewHeight}px`;

  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    await inlinePosterImages(clone);
    await waitForLayout();

    return await toPng(clone, {
      width: previewWidth,
      height: previewHeight,
      pixelRatio: ratio,
      cacheBust: false,
      imagePlaceholder: TRANSPARENT_PIXEL,
      filter: (node) => {
        if (node.tagName?.toLowerCase() === "img") {
          const src = node.getAttribute("src") || "";
          if (src.startsWith("http") && isCrossOriginUrl(src)) {
            return false;
          }
        }
        return true;
      },
    });
  } finally {
    host.remove();
  }
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export function buildPosterFilename(teamTitle, platform, templateId) {
  const safe = (teamTitle || "team")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `firststep-${safe}-${platform}-${templateId}.png`;
}

export function buildShareCaption({ teamTitle, memberNames, hashtag }) {
  const tag = hashtag?.startsWith("#") ? hashtag : `#${hashtag || "ShipIn100Hrs"}`;
  return [
    `We're building at FirstStep Annual Hackathon — Team ${teamTitle}!`,
    memberNames ? `Squad: ${memberNames}` : "",
    `${tag} #FirstStepHackathon`,
  ]
    .filter(Boolean)
    .join("\n");
}

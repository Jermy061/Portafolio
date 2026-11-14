import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const projectRoot = dirname(new URL(import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const dist = resolve(projectRoot, "dist");
const html = await readFile(resolve(dist, "index.html"), "utf8");
const css = await readFile(resolve(dist, "styles.css"), "utf8");
const source = await readFile(resolve(dist, "data.js"), "utf8");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
vm.runInContext(await readFile(resolve(dist, "demos.js"), "utf8"), sandbox);
const data = sandbox.window.PORTFOLIO_DATA;

const getPath = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
const translationKeys = [...html.matchAll(/data-i18n(?:-alt)?="([^"]+)"/g)].map((match) => match[1]);
const uniqueKeys = [...new Set(translationKeys)];
const errors = [];

for (const [language, dictionary] of Object.entries(data.translations)) {
  for (const key of uniqueKeys) {
    if (getPath(dictionary, key) === undefined) errors.push(`Falta ${key} en ${language}`);
  }
}

for (const project of data.projects) {
  for (const language of Object.keys(data.translations)) {
    for (const field of ["description", "context", "features"]) {
      if (!project[field]?.[language]) errors.push(`Falta ${field}.${language} en ${project.id}`);
    }
  }
}

const referencedAssets = new Set();
for (const text of [html, css]) {
  for (const match of text.matchAll(/assets\/[A-Za-z0-9_.-]+/g)) referencedAssets.add(match[0]);
}
for (const asset of referencedAssets) {
  try {
    await access(resolve(dist, asset));
  } catch {
    errors.push(`No existe ${asset}`);
  }
}

if (!data.projects.length) errors.push('Debe existir al menos un proyecto');
if (new Set(data.projects.map((project) => project.id)).size !== data.projects.length) errors.push('Hay identificadores de proyectos duplicados');
for (const language of Object.keys(data.translations)) {
  for (const key of Object.keys(sandbox.window.DEMO_LABELS.es)) {
    if (!sandbox.window.DEMO_LABELS[language]?.[key]) errors.push(`Falta demo ${key} en ${language}`);
  }
}
for (const [id, demo] of Object.entries(sandbox.window.PORTFOLIO_DEMOS)) {
  if (!data.projects.some((project) => project.id === id)) errors.push(`Demo sin proyecto: ${id}`);
  if (demo.url) {
    try { if (new URL(demo.url).protocol !== 'https:') errors.push(`La demo ${id} requiere HTTPS`); }
    catch { errors.push(`URL de demo inválida: ${id}`); }
  }
  if (demo.image?.startsWith('assets/')) {
    try { await access(resolve(dist, demo.image)); }
    catch { errors.push(`Falta captura: ${demo.image}`); }
  }
  for (const [n, slide] of (demo.slides || []).entries()) {
    if (!/^assets\/[\w./-]+\.(jpe?g|png|webp|avif)$/i.test(slide.image || '')) errors.push(`Lámina ${n + 1} inválida en ${id}: usa assets/… en jpg, png, webp o avif`);
    else { try { await access(resolve(dist, slide.image)); } catch { errors.push(`Falta lámina: ${slide.image}`); } }
    if (!(slide.caption?.es && slide.caption?.en)) errors.push(`La lámina ${n + 1} de ${id} necesita título en es y en`);
  }
  let previous = -1;
  for (const [n, chapter] of (demo.chapters || []).entries()) {
    if (!Number.isFinite(chapter.t) || chapter.t <= previous) errors.push(`Capítulo ${n + 1} de ${id}: t debe ser un número creciente`);
    previous = chapter.t;
    if (!sandbox.window.DEMO_LABELS.es[chapter.group]) errors.push(`Capítulo ${n + 1} de ${id}: grupo desconocido «${chapter.group}»`);
    for (const field of ['title', 'caption']) if (!(chapter[field]?.es && chapter[field]?.en)) errors.push(`Capítulo ${n + 1} de ${id}: falta ${field} en es o en`);
  }
  if (demo.chapters?.length && !demo.video) errors.push(`La demo ${id} tiene capítulos pero no video`);
  if (demo.video) {
    if (!/^(assets\/[\w./-]+|https:\/\/[^\s"'<>]+)\.(mp4|webm)$/i.test(demo.video)) errors.push(`Video inválido en ${id}: usa assets/… o https://… terminado en .mp4 o .webm`);
    else if (demo.video.startsWith('assets/')) {
      try { await access(resolve(dist, demo.video)); }
      catch { errors.push(`Falta video: ${demo.video}`); }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK · ${uniqueKeys.length} claves traducidas · ${data.projects.length} proyectos · ${referencedAssets.size} recursos verificados`);

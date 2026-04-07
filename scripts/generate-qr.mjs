import QRCode from 'qrcode'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, '../public/qr')
fs.mkdirSync(outputDir, { recursive: true })

const founders = ['angelika', 'bjoern', 'jonathan']
const baseUrl = 'https://pareo.ai/card'
const utmSource = process.argv[2] ?? 'HannoverMesse2026'
const SIZE = 1000

// Brand colours from Pareo brandbook
const VIOLET = '#845EF0'
const BLUE   = '#507AE7'

// Embed the Pareo logo as base64 so the SVG is self-contained
const logoPath = path.join(__dirname, '../public/PareoAI_Logo_Fade.png')
const logoDataUrl = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`

function buildSvg(url) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const count   = qr.modules.size
  const padding = 48                              // quiet zone in px
  const mod     = (SIZE - padding * 2) / count   // px per module

  // Logo overlay: 20 % of canvas (safe with H-level 30 % error correction)
  const logoSize = Math.round(SIZE * 0.20)
  const logoX    = (SIZE - logoSize) / 2
  const logoY    = (SIZE - logoSize) / 2
  const logoPad  = 10   // white halo around logo

  // Build all dark-module rects in one pass
  const rects = []
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.modules.get(r, c)) {
        const x = (padding + c * mod).toFixed(2)
        const y = (padding + r * mod).toFixed(2)
        const w = (mod + 0.5).toFixed(2)   // tiny overlap prevents seams
        rects.push(`<rect x="${x}" y="${y}" width="${w}" height="${w}"/>`)
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${SIZE}" y2="${SIZE}" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="${VIOLET}"/>
      <stop offset="100%" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" fill="white"/>

  <!-- QR modules — gradient filled -->
  <g fill="url(#g)">${rects.join('')}</g>

  <!-- Logo: white backing + image -->
  <rect
    x="${logoX - logoPad}" y="${logoY - logoPad}"
    width="${logoSize + logoPad * 2}" height="${logoSize + logoPad * 2}"
    rx="14" fill="white"/>
  <image
    x="${logoX}" y="${logoY}"
    width="${logoSize}" height="${logoSize}"
    xlink:href="${logoDataUrl}" href="${logoDataUrl}"
    preserveAspectRatio="xMidYMid meet"/>
</svg>`
}

for (const founder of founders) {
  const url  = `${baseUrl}/${founder}?utm_source=${utmSource}`
  const stem = `${founder}_${utmSource}`

  const svg = buildSvg(url)

  // SVG — print-ready vector
  const svgPath = path.join(outputDir, `${stem}.svg`)
  fs.writeFileSync(svgPath, svg)

  // PNG — 1000 × 1000 px raster
  const pngPath = path.join(outputDir, `${stem}.png`)
  await sharp(Buffer.from(svg)).png().toFile(pngPath)

  console.log(`✓  ${founder.padEnd(12)} ${url}`)
}

console.log(`\nFiles saved to  public/qr/`)

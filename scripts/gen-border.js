#!/usr/bin/env node
// Generates a tileable SVG border inspired by traditional Balkan/South Asian textile patterns
// Pixel-map approach for precise control

const CELL = 2;

const C = {
  G: '#1B5E20', Y: '#DAA520', y: '#F9A825', R: '#C62828',
  K: '#1A1A1A', W: '#FFFFFF', g: '#2E7D32', B: '#8B6914',
};

// Define the FULL pattern as a string grid
// 28 cols wide, 48 rows tall (one complete tile)
// Each character = one 2×2px cell
const pattern = [
  // Border:  GG Y GG  |  Zigzag  |  Central diamond area (16 wide)  |  Zigzag  |  GG Y GG
  // Cols:    01 2 34      56         7890123456789012                    78         90 1 23
  //                                  (cols 6-21 = 16 wide)

  // Gap / connector rows (between diamonds)
  'GGyGGRyYYYYYKKYYYYYyRGGyGG',  // row 0
  'GGyGGyRYYYYYKKYYYYYRyGGyGG',  // row 1
  'GGyGGRyYYYYgKKgYYYYyRGGyGG',  // row 2
  'GGyGGyRYYYgKKKKgYYYRyGGyGG',  // row 3

  // Diamond rows - top quarter
  'GGyGGRyYYYgKKKKgYYYyRGGyGG',  // row 4
  'GGyGGyRYYgKKWWKKgYYRyGGyGG',  // row 5
  'GGyGGRyYYgKWWWWKgYYyRGGyGG',  // row 6
  'GGyGGyRYgKKWWWWKKgYRyGGyGG',  // row 7
  'GGyGGRyYgKWWKKWWKgYyRGGyGG',  // row 8
  'GGyGGyRYKKWWKKWWKKYRyGGyGG',  // row 9
  'GGyGGRyYKWWKKKKWWKYyRGGyGG',  // row 10
  'GGyGGyRKKWWKRRKWWKKRyGGyGG',  // row 11

  // Diamond rows - center
  'GGyGGRyKKWKKRRKKWKKyRGGyGG',  // row 12
  'GGyGGyRKWWKRRRRKWWKRyGGyGG',  // row 13
  'GGyGGRyKWKKRRRRKKWKyRGGyGG',  // row 14
  'GGyGGyKKWKRRRRRRKWKKyGGyGG',  // row 15  -- widest

  // Diamond rows - center (mirror of above going back up)
  'GGyGGRyKWKKRRRRKKWKyRGGyGG',  // row 16
  'GGyGGyRKWWKRRRRKWWKRyGGyGG',  // row 17
  'GGyGGRyKKWKKRRKKWKKyRGGyGG',  // row 18
  'GGyGGyRKKWWKRRKWWKKRyGGyGG',  // row 19

  // Diamond rows - bottom quarter (mirror of top)
  'GGyGGRyYKWWKKKKWWKYyRGGyGG',  // row 20
  'GGyGGyRYKKWWKKWWKKYRyGGyGG',  // row 21
  'GGyGGRyYgKWWKKWWKgYyRGGyGG',  // row 22
  'GGyGGyRYgKKWWWWKKgYRyGGyGG',  // row 23
  'GGyGGRyYYgKWWWWKgYYyRGGyGG',  // row 24
  'GGyGGyRYYgKKWWKKgYYRyGGyGG',  // row 25
  'GGyGGRyYYYgKKKKgYYYyRGGyGG',  // row 26
  'GGyGGyRYYYgKKKKgYYYRyGGyGG',  // row 27

  // Gap / connector rows (between diamonds)
  'GGyGGRyYYYYgKKgYYYYyRGGyGG',  // row 28
  'GGyGGyRYYYYYKKYYYYYRyGGyGG',  // row 29
  'GGyGGRyYYYYYKKYYYYYyRGGyGG',  // row 30
  'GGyGGyRYYYYYKKYYYYYRyGGyGG',  // row 31
];

// Validate all rows are same length
const W = pattern[0].length;
const H = pattern.length;
for (let i = 0; i < H; i++) {
  if (pattern[i].length !== W) {
    console.error(`Row ${i} has length ${pattern[i].length}, expected ${W}`);
    process.exit(1);
  }
}

// Generate SVG with run-length encoding
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W*CELL}" height="${H*CELL}" viewBox="0 0 ${W*CELL} ${H*CELL}" shape-rendering="crispEdges">\n`;

for (let r = 0; r < H; r++) {
  let c = 0;
  while (c < W) {
    const ch = pattern[r][c];
    let end = c + 1;
    while (end < W && pattern[r][end] === ch) end++;
    svg += `<rect x="${c*CELL}" y="${r*CELL}" width="${(end-c)*CELL}" height="${CELL}" fill="${C[ch]}"/>\n`;
    c = end;
  }
}

svg += `</svg>\n`;
process.stdout.write(svg);

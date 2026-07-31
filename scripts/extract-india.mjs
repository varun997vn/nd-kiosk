/**
 * Extracts India's outline from the bundled world atlas into a standalone
 * GeoJSON module.
 *
 * The kiosk runs offline, so InstitutionsHub cannot fetch geometry at runtime.
 * Shipping the full 756KB world atlas to draw one country would be wasteful, so
 * this pulls out the single feature we need (~27KB) at author time. Run it only
 * if the source atlas changes:
 *
 *     npm run data:india
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { feature } from 'topojson-client';

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(here, '../public/countries-50m.json');
const OUTPUT = resolve(here, '../src/assets/india.geo.json');
const INDIA_ISO_NUMERIC = '356';

const world = JSON.parse(readFileSync(SOURCE, 'utf8'));
const countries = feature(world, world.objects.countries);
const india = countries.features.find((f) => f.id === INDIA_ISO_NUMERIC);

if (!india) {
  throw new Error(`No country with id ${INDIA_ISO_NUMERIC} in ${SOURCE}`);
}

writeFileSync(OUTPUT, JSON.stringify(india));

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
console.log(
  `Wrote ${OUTPUT} (${kb(JSON.stringify(india).length)}) — ` +
    `${india.properties.name}, ${india.geometry.type}`
);

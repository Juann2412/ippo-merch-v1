/**
 * Lance le seed Naruto via la couche Application.
 * Usage: npx tsx scripts/seed-naruto.ts [--force]
 */
import { createApplicationServices } from "../src/application/create-application-services";

async function main() {
  const force = process.argv.includes("--force");
  const { seed } = createApplicationServices();
  const result = await seed.seedNaruto(force);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

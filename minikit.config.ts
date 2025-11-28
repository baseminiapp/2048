const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 * @see https://miniapps.farcaster.xyz/docs/guides/publishing
 */
export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE0NTMyNTAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwNkFBOTdkZTViNDg5NjAwZEY3ZEJGOTgwMjYxYzEyZTQyZjYzZjA4In0",
    payload: "eyJkb21haW4iOiIyMDQ4LTN6ODEudmVyY2VsLmFwcCJ9",
    signature:
      "rc1QjwJEvzv+2oyZpsf97btKVrZo1RHcnwfbK/TIQyxgvVBLsmXE1yYp9C9yCfsOfDjtVU78fTLh/25Shx2e6xs="
  },

  miniapp: {
    version: "1",
    name: "2048",
    subtitle: "Premium Puzzle Experience",
    description:
      "Play a beautiful 2048 game with leaderboard support. Merge tiles to reach the legendary 2048!",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait.png`,
      `${ROOT_URL}/screenshot.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",

    // Where the game starts
    homeUrl: ROOT_URL,

    primaryCategory: "games",
    tags: ["game", "2048", "puzzle", "leaderboard"],

    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Merge numbers. Build strategy. Reach 2048.",

    ogTitle: "2048 Game — Premium MiniApp",
    ogDescription:
      "Enjoy an elegant 2048 puzzle experience with rankings and smooth gameplay.",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;

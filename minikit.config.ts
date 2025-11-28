const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjE0NTMyNTAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwNkFBOTdkZTViNDg5NjAwZEY3ZEJGOTgwMjYxYzEyZTQyZjYzZjA4In0",
    payload: "eyJkb21haW4iOiIyMDQ4LTN6ODEudmVyY2VsLmFwcCJ9",
    signature: "rc1QjwJEvzv+2oyZpsf97btKVrZo1RHcnwfbK/TIQyxgvVBLsmXE1yYp9C9yCfsOfDjtVU78fTLh/25Shx2e6xs="
  },
  miniapp: {
    version: "1",
    name: "2048",
    subtitle: "Merge numbers, get 2048!",
    description: "Play 2048 on mobile or desktop with leaderboard and New Game button.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot.png`,
      `${ROOT_URL}/screenshot-portrait.png`,
      `${ROOT_URL}/screenshot.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#faf8ef",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["puzzle", "numbers", "2048", "fun"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Challenge yourself to 2048!",
    ogTitle: "2048 Mini App",
    ogDescription: "Merge numbers, beat the leaderboard, and have fun!",
    ogImageUrl: `${ROOT_URL}/hero.png`,
    noindex: false
  },
} as const;

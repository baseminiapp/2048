const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "2048",
    subtitle: "Fun merging game",
    description: "Play 2048 with leaderboard support. Merge tiles and reach 2048!",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait.png`,
      `${ROOT_URL}/screenshot.png`,
      `${ROOT_URL}/screenshot.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    primaryCategory: "games",
    tags: ["game", "2048", "puzzle"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Merge tiles and reach 2048!",
    ogTitle: "2048 Mini App",
    ogDescription: "Play 2048 with leaderboard support on Base!",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
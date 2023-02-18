/**
 * These values are present on the client and server.
 * They must be prefixed with NEXT_PUBLIC_.
 * */
const PROCESS = {
  CHAIN: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  NETWORK_URL: process.env.NEXT_PUBLIC_NETWORK_URL,
  INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY,
  DAO_ADDRESS: process.env.NEXT_PUBLIC_DAO_ADDRESS,
}

// Checks that run in all environments
if (PROCESS.CHAIN !== 1 && PROCESS.CHAIN !== 5) {
  throw new Error(`${PROCESS.CHAIN} is not supported. Supported values are 1 (mainnet) and 5 (goerli)`)
}
if (!PROCESS.ALCHEMY_KEY) {
  throw new Error('PROCESS.ALCHEMY_KEY is not set')
}
if (!PROCESS.DAO_ADDRESS) {
  throw new Error('PROCESS.DAO_ADDRESS is not set')
}

type VercelEnv = 'production' | 'preview' | 'development'
const VERCEL_ENV = PROCESS.VERCEL_ENV ? (PROCESS.VERCEL_ENV as VercelEnv) : ('development' as const)

/**
 * These values are present on the client and server.
 *
 * Some are optional. TS is the source of truth.
 */
export const ENV = {
  CHAIN: PROCESS.CHAIN,
  VERCEL_ENV: VERCEL_ENV,
  /** Cast to a string because we throw an error if this is not set */
  ALCHEMY_KEY: PROCESS.ALCHEMY_KEY as string,
  INFURA_KEY: PROCESS.INFURA_KEY,
  APP_ID: PROCESS.APP_ID,
  SITE_TITLE: PROCESS.SITE_TITLE,
  SITE_DESCRIPTION: PROCESS.SITE_DESCRIPTION,
  TWITTER_HANDLE: PROCESS.TWITTER_HANDLE,
  WEBSITE_URL: PROCESS.WEBSITE_URL,
  /** Cast to a string because we throw an error if this is not set */
  DAO_ADDRESS: PROCESS.DAO_ADDRESS as string,
} as const


export const isDev = ENV.VERCEL_ENV === 'development'
export const isPreview = ENV.VERCEL_ENV === 'preview'
export const isProd = ENV.VERCEL_ENV === 'production'
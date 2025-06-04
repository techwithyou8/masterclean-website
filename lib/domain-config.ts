// Domain configuration utilities
export const DOMAIN_CONFIG = {
  production: {
    domain: "mastercleanservice.nl",
    url: "https://mastercleanservice.nl",
    email: "info@mastercleanservice.nl",
  },
  development: {
    domain: "localhost:3000",
    url: "http://localhost:3000",
    email: "info@mastercleanservice.nl",
  },
}

export function getDomainConfig() {
  const isProduction = process.env.NODE_ENV === "production"
  return isProduction ? DOMAIN_CONFIG.production : DOMAIN_CONFIG.development
}

export function getBaseUrl() {
  return getDomainConfig().url
}

export function getContactEmail() {
  return getDomainConfig().email
}

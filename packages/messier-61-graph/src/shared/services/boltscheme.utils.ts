// Copyright 2023 Paion Data. All rights reserved.
import { INSECURE_SCHEMES, SECURE_SCHEMES } from 'shared/modules/app/appDuck'

const BOLT_DIRECT_SCHEME = 'bolt'
const BOLT_ROUTING_SCHEME = 'neo4j'

export const isNonSupportedRoutingSchemeError = (e: {
  code: string
  message: string
}) =>
  e.code === 'ServiceUnavailable' &&
  (e.message.includes('Could not perform discovery') ||
    e.message.includes('routing'))

export const isNonRoutingScheme = (url = '') =>
  typeof url === 'string' && url.startsWith(`${BOLT_DIRECT_SCHEME}://`)

export const toNonRoutingScheme = (url: string) =>
  typeof url === 'string' &&
  `${BOLT_DIRECT_SCHEME}${getSchemeFlag(url)}://${stripQueryString(
    stripScheme(url)
  )}`

export const getScheme = (url: string) => {
  if (!url) {
    return ''
  }
  if (url && !url.includes('://')) {
    return ''
  }
  const [scheme] = url.split('://')
  return scheme
}

export const stripScheme = (url: string) => {
  const [_scheme, ...rest] = (url || '').split('://')
  if (!rest || !rest.length) {
    return _scheme
  }
  return rest.join('://')
}

export const boltUrlsHaveSameHost = (host1: string, host2: string): boolean =>
  stripScheme(stripQueryString(host1)) === stripScheme(stripQueryString(host2))

export const stripQueryString = (url: string) => {
  const [_host] = (url || '').split('?')
  return _host
}

export const isSecureBoltScheme = (url: string) => {
  if (url && !url.includes('://')) {
    return false
  }
  const [scheme] = (url || '').split('://')
  if (!scheme) {
    return false
  }
  return scheme.endsWith('+s') || scheme.endsWith('+ssc')
}

export const getSchemeFlag = (url = '') => {
  if (url && !url.includes('://')) {
    return ''
  }
  const [scheme] = (url || '').split('://')
  if (!scheme.includes('+')) {
    return ''
  }
  return `+${scheme.split('+').pop()}`
}
const stripSchemeFlag = (url: string) => {
  if (url && !url.includes('://')) {
    return ''
  }
  const [scheme] = (url || '').split('://')
  if (!scheme.includes('+')) {
    return scheme
  }
  return scheme.split('+')[0]
}

const toggleSchemeSecurity = (url: string) => {
  if (url && !url.includes('://')) {
    return url
  }
  if (isSecureBoltScheme(url)) {
    return stripSchemeFlag(url)
  }
  return `${getScheme(url)}+s`
}

export const toggleSchemeRouting = (url = '') => {
  if (!url) {
    return ''
  }
  if (url && !url.includes('://')) {
    return url
  }

  if (url.startsWith(BOLT_ROUTING_SCHEME)) {
    return url.replace(BOLT_ROUTING_SCHEME, BOLT_DIRECT_SCHEME)
  }
  if (url.startsWith(BOLT_DIRECT_SCHEME)) {
    return url.replace(BOLT_DIRECT_SCHEME, BOLT_ROUTING_SCHEME)
  }
  return url
}

export const boltToHttp = (boltHost: string): string => {
  const withOutScheme = stripScheme(boltHost)
  if (SECURE_SCHEMES.some(scheme => boltHost.startsWith(scheme))) {
    return `https://${withOutScheme}`
  }
  if (INSECURE_SCHEMES.some(scheme => boltHost.startsWith(scheme))) {
    return `http://${withOutScheme}`
  }
  return boltHost
}

export const generateBoltUrl = (
  allowedSchemes: string[],
  url: string,
  fallbackScheme?: string
) => {
  const rewrites: Record<string, string> = {
    'bolt+routing://': `${BOLT_ROUTING_SCHEME}://`
  }

  if (!url || typeof url !== 'string') {
    if (
      allowedSchemes &&
      fallbackScheme &&
      allowedSchemes.includes(fallbackScheme)
    ) {
      return `${fallbackScheme}://`
    }
    const scheme = allowedSchemes
      ? allowedSchemes[0]
      : fallbackScheme || 'neo4j'
    return `${scheme}://`
  }

  // Rewrite any alias. Break on first hit.
  for (const candidate in rewrites) {
    if (url.startsWith(candidate)) {
      url = `${rewrites[candidate]}${stripScheme(url)}`
      break
    }
  }

  const scheme = getScheme(url)

  // We accept all schemes
  if (!allowedSchemes) {
    if (scheme) {
      return url
    }
    return `${BOLT_ROUTING_SCHEME}://${url}`
  }

  if (!scheme && fallbackScheme && allowedSchemes.includes(fallbackScheme)) {
    return `${fallbackScheme}://${url}`
  }

  // Input scheme allowed
  if (allowedSchemes.includes(scheme)) {
    return url
  }

  // Scheme not allowed, can we toggle encryption to allow it?
  if (scheme) {
    const toggledSecurityScheme = toggleSchemeSecurity(url)
    if (allowedSchemes.includes(toggledSecurityScheme)) {
      return `${toggledSecurityScheme}://${stripScheme(url)}`
    }
  }

  // Either no scheme entered or we can't guess an allowed, let's override it with something default
  const defaultScheme =
    fallbackScheme && allowedSchemes.includes(fallbackScheme)
      ? fallbackScheme
      : allowedSchemes[0]
  return `${defaultScheme}://${stripScheme(url)}`
}

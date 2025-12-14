import { HybridURLBuilder } from '@/utilities/tenant/UrlBuilder'
import { NextResponse, NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Skip für API routes, static files, etc.
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const parsedURL = HybridURLBuilder.parseURL(request)
  if (url.pathname.startsWith('/admin')) {
    if (parsedURL.type === 'custom-domain') {
      const redirectUrl = new URL(`${url.pathname}${url.search}`, 'https://sites.benkner-it.com')
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
  }

  if (parsedURL.type === 'custom-domain') {
    // Custom Domain -> Rewrite zu internal route
    const rewritePath = `/domain/${parsedURL.domain}/${parsedURL.locale}/${parsedURL.slug}`
    url.pathname = rewritePath

    const response = NextResponse.rewrite(url)
    response.headers.set('x-url-type', 'custom-domain')
    response.headers.set('x-domain', parsedURL.domain)
    response.headers.set('x-locale', parsedURL.locale)
    return response
  } else {
    // Path-based -> Normale Verarbeitung mit headers
    const response = NextResponse.next()
    response.headers.set('x-url-type', 'path-based')
    response.headers.set('x-tenant', parsedURL.tenant ?? '')
    response.headers.set('x-locale', parsedURL.locale)
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

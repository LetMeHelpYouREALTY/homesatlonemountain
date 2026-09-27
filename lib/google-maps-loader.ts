/** Client-side Google Maps auth failure handling (S2). */

export let mapsAuthFailed = false

export function installGoogleMapsAuthFailureHandler(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.addEventListener('gmaps:auth-failure', () => {
    mapsAuthFailed = true
  })

  const w = window as Window & {
    gm_authFailure?: () => void
    __gmapsAuthFailureInstalled?: boolean
  }

  if (w.__gmapsAuthFailureInstalled) {
    return
  }

  w.__gmapsAuthFailureInstalled = true
  w.gm_authFailure = () => {
    window.dispatchEvent(new Event('gmaps:auth-failure'))
  }
}

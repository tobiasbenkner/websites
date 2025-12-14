'use client'
import { Breakpoint, breakpoints } from '@/utilities/breakpoints'
import { useEffect, useState } from 'react'

export function useCurrentBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('sm')

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      if (width < breakpoints.sm) {
        setCurrentBreakpoint('xs')
      } else if (width < breakpoints.md) {
        setCurrentBreakpoint('sm')
      } else if (width < breakpoints.lg) {
        setCurrentBreakpoint('md')
      } else if (width < breakpoints.xl) {
        setCurrentBreakpoint('lg')
      } else {
        setCurrentBreakpoint('xl')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return currentBreakpoint
}

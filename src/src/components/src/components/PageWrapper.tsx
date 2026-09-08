import { useEffect, useRef, type ReactNode } from 'react'

export function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('page-enter')
    }
  }, [])

  return (
    <div ref={ref} className="relative z-10">
      {children}
    </div>
  )
}
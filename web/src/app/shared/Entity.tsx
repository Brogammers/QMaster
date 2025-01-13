'use client'

import { ReactNode } from 'react'

interface EntityProps {
  children: ReactNode
}

export default function Entity({ children }: EntityProps) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
} 
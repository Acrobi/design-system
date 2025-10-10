"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./button"

interface NavItem {
  title: string
  href: string
  description: string
  port: number
  external?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Advanced Theme Editor",
    href: "/",
    description: "Dual-palette theme engine with real-time color generation",
    port: 3001,
    external: true
  },
  {
    title: "Theme Selector (QA)",
    href: "/",
    description: "Client A/B theme switching - QA validated",
    port: 3000
  },
  {
    title: "Button Test",
    href: "/test-button",
    description: "shadcn/ui component styling validation",
    port: 3001,
    external: true
  }
]

export function GlobalNavigation() {
  const pathname = usePathname()
  const currentPort = typeof window !== 'undefined' ? window.location.port : '3000'

  const getCurrentPage = () => {
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    return `${currentHost}:${currentPort}`
  }

  const buildUrl = (item: NavItem) => {
    if (item.external) {
      return `http://localhost:${item.port}${item.href}`
    }
    return item.href
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                T
              </div>
              <div>
                <h1 className="text-lg font-semibold">Theme Development Suite</h1>
                <p className="text-xs text-muted-foreground">
                  {getCurrentPage()}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isCurrentPage = !item.external && pathname === item.href
              const isCurrentPort = currentPort === item.port.toString()

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={buildUrl(item)}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                      transition-colors duration-200
                      ${isCurrentPage && isCurrentPort
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }
                    `}
                  >
                    <span>{item.title}</span>
                    {item.external && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                    {isCurrentPort && !item.external && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </Link>

                  {/* Tooltip */}
                  <div className="absolute left-0 mt-1 w-64 p-2 bg-popover border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <p className="text-xs font-mono mt-1">localhost:{item.port}{item.href}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden border-t py-4">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const isCurrentPage = !item.external && pathname === item.href
              const isCurrentPort = currentPort === item.port.toString()

              return (
                <Link
                  key={item.href}
                  href={buildUrl(item)}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`
                    flex items-center justify-between p-3 rounded-md border
                    transition-colors duration-200
                    ${isCurrentPage && isCurrentPort
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.title}</span>
                      {item.external && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                      {isCurrentPort && !item.external && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs mt-1 opacity-80">{item.description}</p>
                  </div>
                  <div className="text-xs font-mono opacity-60">
                    :{item.port}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
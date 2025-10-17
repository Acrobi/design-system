"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from './button'
import { ThemeSelector } from './theme-selector'

interface NavigationItem {
  name: string
  href: string
  description: string
  icon?: string
}

interface Component {
  name: string
  href: string
  description: string
}

interface StyleCategory {
  name: string
  href: string
  description: string
  icon?: string
}

// Main navigation items
const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'Acrobi Design System Overview'
  },
  {
    name: 'Documentation',
    href: '/docs',
    description: 'Complete design system guide & API reference'
  }
]

// Styles categories for token management
const styleCategories: StyleCategory[] = [
  {
    name: 'Typography',
    href: '/styles/typography',
    description: 'Font families, weights, sizes, line heights, letter spacing'
  },
  {
    name: 'Colors',
    href: '/styles/colors',
    description: 'Grey scale, base theme palette, color swatches'
  },
  {
    name: 'Spacing & Layout',
    href: '/styles/spacing',
    description: 'Spacing units and breakpoints'
  },
  {
    name: 'Shape & Form',
    href: '/styles/shape',
    description: 'Border radii, widths, and styles'
  },
  {
    name: 'Elevation & Shadow',
    href: '/styles/elevation',
    description: 'Box shadows and text shadows'
  },
  {
    name: 'Opacity',
    href: '/styles/opacity',
    description: 'Opacity values and transparency'
  },
  {
    name: 'Layers',
    href: '/styles/layers',
    description: 'Z-index values tied to use cases'
  },
  {
    name: 'Motion',
    href: '/styles/motion',
    description: 'Transition durations and animation easing'
  }
]

// Components sorted alphabetically
const components: Component[] = [
  {
    name: 'Button',
    href: '/button',
    description: 'Button component test page'
  },
  {
    name: 'Card',
    href: '/card',
    description: 'Card component test page'
  },
  {
    name: 'Icon',
    href: '/icon',
    description: 'Icon component test page'
  },
  {
    name: 'Label',
    href: '/label',
    description: 'Label component test page'
  },
  {
    name: 'Spinner',
    href: '/spinner',
    description: 'Spinner component test page'
  },
  {
    name: 'Theme Selector',
    href: '/theme-selector',
    description: 'Theme selector component'
  }
]

export function GlobalNavigation() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  const isComponentActive = components.some(comp => router.pathname === comp.href)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo and Brand */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Acrobi Design System
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Styles Dropdown */}
            <div className="relative group">
              <Button
                variant={router.pathname.startsWith('/styles') ? "default" : "ghost"}
                size="sm"
                className="px-3 py-1"
              >
                Styles
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Styles Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 min-w-[320px] rounded-md border bg-popover shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b">
                    Token Management
                  </div>
                  {styleCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`block px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        router.pathname === category.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Components Dropdown */}
            <div className="relative group">
              <Button
                variant={isComponentActive ? "default" : "ghost"}
                size="sm"
                className="px-3 py-1"
              >
                Components
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 min-w-[280px] rounded-md border bg-popover shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="py-1">
                  {components.map((component) => (
                    <Link
                      key={component.href}
                      href={component.href}
                      className={`block px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        router.pathname === component.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      <div className="font-medium">{component.name}</div>
                      <div className="text-xs text-muted-foreground">{component.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Title */}
            <div className="md:hidden">
              <div className="text-sm font-medium">
                {isComponentActive
                  ? components.find(comp => router.pathname === comp.href)?.name || 'Acrobi Design System'
                  : navigationItems.find(item => isActive(item.href))?.name || 'Acrobi Design System'
                }
              </div>
              <div className="text-xs text-muted-foreground">
                {isComponentActive
                  ? components.find(comp => router.pathname === comp.href)?.description
                  : navigationItems.find(item => isActive(item.href))?.description
                }
              </div>
            </div>
          </div>
          <nav className="flex items-center">
            <ThemeSelector />
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container px-4 py-2">
            <nav className="grid grid-cols-1 gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                  }`}
                >
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs opacity-60">{item.description}</div>
                    </div>
                </Link>
              ))}

              {/* Styles in Mobile Menu */}
              <div className="pt-2 mt-2 border-t">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Token Management
                </div>
                {styleCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      router.pathname === category.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <div>
                      <div>{category.name}</div>
                      <div className="text-xs opacity-60">{category.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Components in Mobile Menu */}
              <div className="pt-2 mt-2 border-t">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Components
                </div>
                {components.map((component) => (
                  <Link
                    key={component.href}
                    href={component.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      router.pathname === component.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <div>
                      <div>{component.name}</div>
                      <div className="text-xs opacity-60">{component.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Breadcrumb for mobile */}
      {router.pathname !== '/' && !isMobileMenuOpen && (
        <div className="border-t bg-muted/30 md:hidden">
          <div className="container px-4 py-2">
            <div className="text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              {router.pathname !== '/' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">
                    {isComponentActive
                      ? components.find(comp => router.pathname === comp.href)?.name
                      : navigationItems.find(item => isActive(item.href))?.name
                    }
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
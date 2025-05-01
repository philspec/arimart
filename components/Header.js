"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react"
import MiniCart from "./MiniCart"
import { useCartStore } from "@/store/cartStore"
import { useThemeStore } from "@/store/themeStore"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)
  const pathname = usePathname()
  const { cart } = useCartStore()
  const { theme, toggleTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)
  const miniCartRef = useRef(null)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mini cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
        setIsMiniCartOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen)
  }

  const cartItemsCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center">
            <Link href="/" className="text-2xl font-bold text-emerald-600">
              <Image src="/logo.png" alt="AriMart Logo" width={40} height={40} />
            </Link>
            <Link href="/" className="text-2xl font-bold text-emerald-600 mt-2">
              <Image src="/namelogo1.png" alt="AriMart Logo" width={120} height={40} />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  pathname === link.path
                    ? "text-emerald-600 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500"
                } transition duration-300`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
            )}

            <div className="relative" ref={miniCartRef}>
              <button
                onClick={toggleMiniCart}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} className="text-gray-700 dark:text-gray-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {isMiniCartOpen && <MiniCart onClose={() => setIsMiniCartOpen(false)} />}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    pathname === link.path ? "text-emerald-600 font-medium" : "text-gray-700 dark:text-gray-300"
                  } transition duration-300 px-2 py-1`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

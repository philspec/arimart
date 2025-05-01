"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address" })
      return
    }

    // Simulate API call
    setStatus({ type: "loading", message: "Subscribing..." })

    setTimeout(() => {
      setStatus({ type: "success", message: "Thank you for subscribing!" })
      setEmail("")

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="bg-emerald-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <Mail size={36} className="mx-auto mb-4 text-emerald-600" />
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Stay updated with our latest products and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input flex-grow"
              disabled={status?.type === "loading"}
            />
            <button
              type="submit"
              className="btn btn-primary btn-md disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={status?.type === "loading"}
            >
              Subscribe
            </button>
          </form>

          {status && (
            <p
              className={`mt-4 ${
                status.type === "error"
                  ? "text-red-500"
                  : status.type === "success"
                    ? "text-emerald-600"
                    : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

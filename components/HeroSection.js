import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
            <p className="text-xl mb-8 max-w-md">
              Discover amazing products at unbeatable prices. Quality you can trust, delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="#featured"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-emerald-600 px-6 py-3 rounded-md font-medium transition duration-300 text-center"
              >
                Featured Products
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
              <Image src="/hero.png" alt="Hero Image" className="object-cover w-full h-full" height={400} width={400} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-white dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  )
}

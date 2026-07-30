import {Link} from "react-router-dom"

export default function Footer(){

    return(
       <footer className="bg-zinc-950 border-t border-zinc-800 text-gray-400">
  <div className="max-w-7xl mx-auto px-6 py-10">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Brand */}
      <div>
        <h2 className="text-3xl font-bold text-orange-500">
          NexCart
        </h2>

        <p className="mt-3 text-gray-500 leading-7">
          Your trusted online shopping destination offering premium products,
          secure payments, and fast delivery.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3">
          <Link
            to="/about"
            className="hover:text-orange-500 transition-colors"
          >
            About Us
          </Link>

          <Link
            to="/return"
            className="hover:text-orange-500 transition-colors"
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            className="hover:text-orange-500 transition-colors"
          >
            Disclaimer
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">
          Contact
        </h3>

        <p>Email: support@nexcart.com</p>
        <p className="mt-2">Phone: +91 XXXXX XXXXX</p>
        <p className="mt-2">Mon - Sat | 9:00 AM - 6:00 PM</p>
      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()}{" "}
      <span className="text-orange-500 font-semibold">NexCart</span>. All
      Rights Reserved.
    </div>

  </div>
</footer>
    )
}
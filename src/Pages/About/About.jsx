const AboutUs = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 m-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 items-center">
            <div>
              <p className="text-orange-500 font-semibold uppercase">
                About NexCart
              </p>

              <h1 className="text-5xl font-bold text-gray-900 mt-3">
                Your Shopping,
                <span className="text-orange-500"> Our Passion.</span>
              </h1>

              <p className="text-gray-300 mt-6 leading-8">
                NexCart is your trusted online shopping destination offering
                quality products, competitive prices, secure payments, and fast
                delivery. We are committed to providing an exceptional shopping
                experience for every customer.
              </p>

              <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
                Explore Store
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 m-4 bg-gray-900 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid  gap-12 items-center">

            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>

              <p className="text-gray-300 leading-8 mb-5">
                NexCart was founded with a simple mission—to make online
                shopping convenient, affordable, and reliable for everyone.
                From a small vision to a growing e-commerce platform, we
                continue to deliver quality products and exceptional customer
                experiences.
              </p>

              <p className="text-gray-300 leading-8">
                Every order reflects our commitment to quality, trust, and
                customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-900 py-20 m-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 grid  gap-8">
          <div className="p-8 ">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>

            <p className="text-gray-300 leading-8">
              To make online shopping accessible, secure, and enjoyable by
              offering premium products, competitive pricing, fast delivery, and
              outstanding customer service.
            </p>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>

            <p className="text-gray-300 leading-8">
              To become one of the most trusted e-commerce platforms by creating
              a seamless shopping experience powered by innovation and customer
              satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose NexCart?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "10,000+ Premium Products",
              "Secure Online Payments",
              "Fast Nationwide Delivery",
              "Easy Returns & Refunds",
              "24/7 Customer Support",
              "Trusted Brand Partners",
            ].map((item) => (
              <div
                key={item}
                className="bg-gray-900 rounded-xl shadow p-8 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-orange-500 text-white py-16 m-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-4xl font-bold">10K+</h2>
            <p>Products</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">50K+</h2>
            <p>Happy Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">1M+</h2>
            <p>Orders Delivered</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">4.8★</h2>
            <p>Customer Rating</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Customer First",
              "Quality",
              "Trust",
              "Innovation",
            ].map((value) => (
              <div
                key={value}
                className="bg-gray-900 p-8 rounded-xl shadow text-center"
              >
                <h3 className="text-xl font-semibold">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Join the NexCart Family
          </h2>

          <p className="text-gray-300 leading-8 mb-8">
            Thank you for choosing NexCart. We are committed to delivering
            quality products, secure shopping, and outstanding customer support.
            Shop smart, shop better, and shop with confidence.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg">
            Start Shopping
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
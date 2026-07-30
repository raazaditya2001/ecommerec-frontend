const Disclaimer = () => {
  return (
    <div className="bg-black min-h-screen py-12 p-4">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Disclaimer</h1>
          <p className="text-gray-300 mt-2">
            Last Updated: July 23, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-400 leading-8">
            Welcome to <strong>NexCart</strong>. By accessing and using this
            website, you acknowledge and agree to the terms outlined in this
            Disclaimer. The information provided on this website is for general
            informational and shopping purposes only.
          </p>
        </section>

        {/* General Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            General Information
          </h2>

          <p className="text-gray-400 leading-8">
            While we strive to ensure that all product descriptions, prices,
            images, specifications, and other content are accurate and
            up-to-date, NexCart does not guarantee that all information is
            complete, accurate, reliable, or error-free.
          </p>
        </section>

        {/* Product Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Product Information
          </h2>

          <p className="text-gray-400 leading-8">
            Product images are for illustrative purposes only. Actual products
            may vary slightly in color, packaging, or appearance due to
            manufacturer updates, screen settings, or photography.
          </p>
        </section>

        {/* Pricing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Pricing & Availability
          </h2>

          <p className="text-gray-400 leading-8">
            Prices, discounts, offers, and product availability are subject to
            change without prior notice. NexCart reserves the right to correct
            pricing errors, update product information, or cancel orders placed
            due to incorrect pricing or stock availability.
          </p>
        </section>

        {/* External Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            External Links
          </h2>

          <p className="text-gray-400 leading-8">
            This website may contain links to third-party websites. NexCart is
            not responsible for the content, policies, products, or services
            offered by external websites.
          </p>
        </section>

        {/* Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h2>

          <p className="text-gray-400 leading-8">
            NexCart shall not be liable for any direct, indirect, incidental,
            consequential, or special damages resulting from the use of this
            website, products, or services.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Intellectual Property
          </h2>

          <p className="text-gray-400 leading-8">
            All content on NexCart, including logos, images, graphics, text,
            icons, and website design, is the property of NexCart or its
            respective owners and is protected by applicable copyright and
            trademark laws.
          </p>
        </section>

        {/* User Responsibility */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            User Responsibility
          </h2>

          <p className="text-gray-400 leading-8">
            Users are responsible for providing accurate account, shipping, and
            payment information. NexCart is not responsible for delays or issues
            caused by incorrect information provided by customers.
          </p>
        </section>

        {/* Warranty */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            No Warranty
          </h2>

          <p className="text-gray-400 leading-8">
            Unless explicitly stated by the manufacturer, all products and
            services are provided on an <strong>"as is"</strong> and{" "}
            <strong>"as available"</strong> basis without any express or implied
            warranties.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Changes to This Disclaimer
          </h2>

          <p className="text-gray-400 leading-8">
            NexCart reserves the right to update or modify this Disclaimer at
            any time. Any changes will be posted on this page with the revised
            date.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-black rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          <p className="text-gray-400 mb-4">
            If you have any questions regarding this Disclaimer, please contact
            our support team.
          </p>

          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Email:</strong> support@nexcart.com
            </p>

            <p>
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>

            <p>
              <strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
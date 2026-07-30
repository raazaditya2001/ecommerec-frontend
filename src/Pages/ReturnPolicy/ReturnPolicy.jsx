const ReturnPolicy = () => {
  return (
    <div className="bg-black min-h-screen py-12 p-4">
      <div className="max-w-5xl mx-auto bg-gray-900 shadow-lg rounded-2xl p-8 md:p-12">
        {/* Header */}
        <div className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-200">
            Return & Refund Policy
          </h1>
          <p className="text-gray-300 mt-2">
            Last Updated: July 23, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-gray-300 leading-8">
            At <span className="font-semibold">NexCart</span>, customer
            satisfaction is our priority. If you are not completely satisfied
            with your purchase, you may request a return or refund according to
            the policy below.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Eligibility for Returns
          </h2>

          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>Product received is damaged or defective.</li>
            <li>Wrong item delivered.</li>
            <li>Missing parts or accessories.</li>
            <li>Product differs from its description.</li>
            <li>Return request submitted within the return period.</li>
          </ul>
        </section>

        {/* Return Window */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Return Window</h2>

          <p className="text-gray-300 leading-8">
            Most products are eligible for return within{" "}
            <strong>7 days</strong> of delivery. Some product categories may
            have different return periods.
          </p>
        </section>

        {/* Non Returnable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Non-Returnable Items
          </h2>

          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>Gift Cards</li>
            <li>Digital Products</li>
            <li>Personal Care & Hygiene Products</li>
            <li>Customized Products</li>
            <li>Perishable Goods</li>
            <li>Products marked as "Non-Returnable"</li>
          </ul>
        </section>

        {/* Replacement */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Replacement Policy
          </h2>

          <p className="text-gray-300 leading-8">
            Eligible products may be replaced if they arrive damaged,
            defective, or incorrect. Replacement requests must be made within
            the applicable return period.
          </p>
        </section>

        {/* Refund */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>

          <p className="text-gray-300 leading-8">
            Once your returned product has been received and inspected,
            approved refunds will be processed to your original payment method
            within <strong>5–10 business days</strong>.
          </p>
        </section>

        {/* Return Process */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            How to Return a Product
          </h2>

          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>Log in to your NexCart account.</li>
            <li>Go to <strong>My Orders</strong>.</li>
            <li>Select the order you want to return.</li>
            <li>Click <strong>Request Return</strong>.</li>
            <li>Select a reason for return.</li>
            <li>Upload images if required.</li>
            <li>Submit your request.</li>
            <li>Wait for approval from our support team.</li>
            <li>Pickup will be scheduled.</li>
            <li>Refund or replacement will be processed.</li>
          </ol>
        </section>

        {/* Damaged Products */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Damaged or Incorrect Products
          </h2>

          <p className="text-gray-300 leading-8">
            Please report damaged, defective, or incorrect items within
            <strong> 48 hours </strong>
            of delivery with clear images of the product and packaging.
          </p>
        </section>

        {/* Cancellation */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Order Cancellation
          </h2>

          <p className="text-gray-300 leading-8">
            Orders can be cancelled before they are shipped. Once dispatched,
            cancellations may not be possible. Eligible products can still be
            returned after delivery.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-black rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          <p className="text-gray-300 mb-2">
            If you have any questions regarding our Return & Refund Policy,
            please contact us.
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

export default ReturnPolicy;
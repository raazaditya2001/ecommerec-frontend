import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-orange-500">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-6">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-zinc-400 mt-4 leading-7">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition"
          >
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 rounded-lg transition"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default NotFound;
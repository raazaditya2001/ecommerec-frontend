import { Link, useNavigate } from "react-router-dom";

const ServerError = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">

        {/* Error Code */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-red-500">
          500
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
          Internal Server Error
        </h2>

        {/* Description */}
        <p className="mt-4 text-zinc-400 leading-7">
          Something went wrong on our end. Our team has been notified and is
          working to resolve the issue. Please try again in a few moments.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="px-6 py-3 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 rounded-lg transition"
          >
            Back to Home
          </Link>

        </div>

        {/* Support Text */}
        <p className="mt-8 text-sm text-zinc-500">
          If the problem continues, please contact support.
        </p>

      </div>
    </div>
  );
};

export default ServerError;
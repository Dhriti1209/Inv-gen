import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white w-96 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">
            InvoiceGen
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { User, Lock, Mail, Armchair } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to register. Email may already be in use.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-[calc(100vh-16rem)] place-items-center bg-[#f7f7f2] px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-emerald-700 text-white">
            <Armchair size={23} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-950">Create Account</h1>
            <p className="text-sm text-stone-500 font-medium">Join us to explore and order furniture</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-stone-700">
            Full Name
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={updateField}
                placeholder="John Doe"
                className="w-full rounded-md border border-stone-300 py-2.5 pl-10 pr-3 text-sm text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-stone-700">
            Email address
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                placeholder="example@domain.com"
                className="w-full rounded-md border border-stone-300 py-2.5 pl-10 pr-3 text-sm text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-stone-700">
            Password
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={updateField}
                placeholder="•••••••• (min 6 chars)"
                className="w-full rounded-md border border-stone-300 py-2.5 pl-10 pr-3 text-sm text-stone-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md bg-emerald-700 px-4 py-2.5 font-bold text-white hover:bg-emerald-800 transition disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;

'use client';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Nunito, Lato } from 'next/font/google';
import Link from "next/link";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      fetch("https://p4-full-stack-project.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push('/');
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <div className={`min-h-screen flex ${lato.className}`}>
      {/* Left Side */}
      <div className="w-1/2 bg-[#141B21] flex items-center justify-center">
        <h1 className={`text-4xl font-bold text-white ${nunito.className}`}>Gamerzhub</h1>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white rounded-l-2xl">
        <div className="shadow-md rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <Link href={'/signup'} className="text-blue-500 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

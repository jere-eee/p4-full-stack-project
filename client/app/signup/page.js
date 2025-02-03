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

export default function Signup() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profilePicture: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        profile_picture: values.profilePicture,
      };

      console.log(payload);

      fetch("https://p4-full-stack-project.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User created:", data);
          router.push("/");
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <div className={`min-h-screen flex overflow-hidden ${lato.className}`}>
      {/* Left Side */}
      <div className="w-1/2 bg-[#141B21] flex items-center justify-center">
        <h1 className={`text-4xl font-bold text-white ${nunito.className}`}>Gamerzhub</h1>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white rounded-l-3xl overflow-hidden shadow-lg">
        <div className="p-6 w-full max-w-md shadow-md rounded-l-3xl">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.errors.name && formik.touched.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture (optional)</label>
              <input
                type="file"
                name="profilePicture"
                onChange={(event) => {
                  formik.setFieldValue("profilePicture", event.target.files[0]);
                }}
                className="mt-1 block w-full text-sm text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>

            <div className="text-center mt-4">
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600"
              >
                Have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

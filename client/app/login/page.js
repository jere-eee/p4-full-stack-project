'use client';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Create an object to send in the request
      const payload = {
        email: values.email,
        password: values.password,
      };

      // Send the data as JSON
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate the payload is JSON
        },
        credentials: "include",
        body: JSON.stringify(payload), // Convert the payload object to JSON
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          router.push('/')
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

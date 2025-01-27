'use client';
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Signup() {
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.profilePicture) {
        formData.append("profile_picture", values.profilePicture);
      }
      // Post the formData to your backend API
      fetch("/signup", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log("User created:", data))
        .catch((err) => console.error(err));
    },
  });

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
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
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            ) : null}
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
        </form>
      </div>
    </div>
  );
}

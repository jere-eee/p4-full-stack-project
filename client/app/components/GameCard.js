import React, { useState } from "react";
import { Lato, Nunito } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const GameCard = ({ game, isDetailedView = false, reviews = [], onReviewAdded, user }) => {
  const [allReviews, setAllReviews] = useState(reviews);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState()

  const formik = useFormik({
    initialValues: {
      content: "",
      rating: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().min(5, "Review must be at least 5 characters").required("Review is required"),
      rating: Yup.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5").required("Rating is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`http://localhost:5000/game/${game.id}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, user_id: user?.id }),
        });

        if (response.ok) {
          const newReview = await response.json();
          resetForm();
          setAllReviews([newReview, ...allReviews]);
          if (onReviewAdded) onReviewAdded(newReview);
        }
      } catch (error) {
        console.error("Failed to submit review", error);
      }
    },
  });

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditedContent(review.content);
    setEditedRating(review.rating)
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent, rating: editedRating }),
      });

      if (response.ok) {
        const updatedReview = await response.json();
        setAllReviews(allReviews.map(r => (r.id === reviewId ? updatedReview : r)));
        setEditingReviewId(null);
      }
    } catch (error) {
      console.error("Failed to update review", error);
    }
  };

  const cardContent = (
    <div className={`${isDetailedView ? "max-w-4xl w-full" : "max-w-md"} bg-[#141B21] rounded-3xl overflow-hidden shadow-lg transition-all duration-200 p-4 ${lato.className} antialiased`}>
      <div className="relative w-full h-64">
        <Image src={game.background_img} alt={`${game.title} background`} layout="fill" objectFit="cover" className="rounded-t-xl" />
      </div>

      <div className="pt-4">
        <h1 className={`text-xl font-bold text-white mb-2 ${nunito.className} antialiased`}>{game.title}</h1>
        <p className="text-sm text-gray-300">Genre: {game.genre}</p>
        <p className="text-sm text-gray-300">Rating: {game.rating}</p>

        {isDetailedView && (
          <div className="mt-6">
            <h2 className={`text-lg font-semibold text-white mb-2 ${nunito.className} antialiased`}>Add a Review</h2>
            <form onSubmit={formik.handleSubmit} className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
              <textarea
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write your review..."
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 resize-none"
              />
              {formik.touched.content && formik.errors.content && <p className="text-red-400 text-sm">{formik.errors.content}</p>}

              <input
                type="number"
                name="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Rating (1-5)"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 mt-2"
              />
              {formik.touched.rating && formik.errors.rating && <p className="text-red-400 text-sm">{formik.errors.rating}</p>}

              <button type="submit" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                Submit Review
              </button>
            </form>

            <h3 className={`text-lg font-semibold text-white mt-4 ${nunito.className} antialiased`}>Reviews</h3>
            <div className="space-y-4 mt-4">
              {allReviews.length > 0 ? (
                allReviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 p-6 rounded-2xl shadow-lg flex gap-4 items-start border border-gray-700">
                    {review.user?.profile_picture ? (
                      <img src={review.user?.profile_picture} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-gray-600" />
                    ) : (
                      <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-xl">
                        {review.user?.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{review.user?.name}</h3>
                      {editingReviewId === review.id ? (
                        <div className="flex-1">
                          <textarea
                            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 resize-none"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                          <input
                            type="number"
                            value={editedRating}
                            onChange={(e) => setEditedRating(e.target.value)}
                            placeholder="Rating (1-5)"
                            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 mt-2"
                          />
                          <button onClick={() => handleSaveEdit(review.id)} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            Save
                          </button>
                        </div>) : (<>
                          <p className="text-gray-300 mt-2 text-sm leading-relaxed">{review.content}</p>
                          <span className="text-yellow-400 text-sm font-semibold bg-gray-800 px-3 py-1  mx-4 rounded-lg">
                            ⭐ {review.rating}/5
                          </span>

                        </>
                      )}
                      {review.user?.id === user?.id && (
                        <button onClick={() => (editingReviewId === review.id ? handleSaveEdit(review.id) : handleEdit(review))} className="mt-2 text-gray-400 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      )}

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return isDetailedView ? cardContent : <Link href={`/game/${game.id}`} className="group transform hover:scale-105 transition-all duration-200">{cardContent}</Link>;
};

export default GameCard;

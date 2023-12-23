import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import "../Book/BookList.css";

const Reviews = ({ auth, book }) => {
    const ratingOptions = Array.from(
        { length: 5 },
        (_, index) => index + 1
    ).map((i) => (
        <option key={i} value={i}>
            {i}
        </option>
    ));

    const { data, setData, post, processing, errors } = useForm({
        review: "",
        rating: "1",
    });

    function submitHandler(e) {
        e.preventDefault();
        post(route("books.reviews.store", book.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Create Review
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="mb-10 text-2xl">
                            Add review for{" "}
                            <span className="text-gray-600">{book.title}</span>
                        </h1>

                        <form onSubmit={submitHandler}>
                            <label htmlFor="review">Review</label>
                            <textarea
                                onChange={(e) =>
                                    setData("review", e.target.value)
                                }
                                name="review"
                                id="review"
                                required
                                className="input"
                            ></textarea>
                            {errors.review && (
                                <p className="text-red-500 mb-4">
                                    {errors.review}
                                </p>
                            )}
                            <label htmlFor="rating">Rating</label>
                            <select
                                onChange={(e) =>
                                    setData("rating", e.target.value)
                                }
                                name="rating"
                                id="rating"
                                className="input mb-4"
                                required
                            >
                                {ratingOptions}
                            </select>
                            {errors.rating && (
                                <p className="text-red-500 mb-4">
                                    {errors.rating}
                                </p>
                            )}
                            <button type="submit" className="btn mb-4">
                                Add Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Reviews;

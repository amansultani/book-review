import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import StarRating from "../UI/StarRating";
import "../Book/BookList.css";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
};

const Reviews = ({ auth, book }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Reviews
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" m-4">
                            <h1 className="sticky top-0 mb-2 text-2xl">
                                {book.title}
                            </h1>

                            <div className="book-info ">
                                <div className="book-author mb-4 text-lg font-semibold">
                                    by {book.author}
                                </div>
                                <div className="book-rating flex items-center">
                                    <div className="mr-2 text-sm font-medium text-slate-700">
                                        <StarRating
                                            rating={book.reviews_avg_rating}
                                        />
                                    </div>
                                    <span className="book-review-count text-sm text-gray-500">
                                        {book.reviews_count} review
                                        {book.reviews_count !== 1 && "s"}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Link
                                    href={route("books.reviews.create", book)}
                                    className="reset-link"
                                >
                                    Add a review!{" "}
                                </Link>
                            </div>
                            <div>
                                <h2 className="mb-4 text-xl font-semibold">
                                    Reviews
                                </h2>
                                <ul>
                                    {book.reviews.length > 0 ? (
                                        book.reviews.map((review) => (
                                            <li
                                                key={review.id}
                                                className="book-item mb-4"
                                            >
                                                <div>
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <div className="font-semibold">
                                                            <StarRating
                                                                rating={
                                                                    review.rating
                                                                }
                                                            />
                                                        </div>
                                                        <div className="book-review-count">
                                                            {formatDate(
                                                                review.created_at
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">
                                                        {review.review}
                                                    </p>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="mb-4">
                                            <div className="empty-book-item">
                                                <p className="empty-text text-lg font-semibold">
                                                    No reviews yet
                                                </p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Reviews;

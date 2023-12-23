import React from "react";
import { Link } from "@inertiajs/react";
import StarRating from "../UI/StarRating";
const Book = ({ books }) => {
    let content;

    if (books.length === 0) {
        content = (
            <li className="mb-4">
                <div className="empty-book-item">
                    <p className="empty-text">No books found</p>
                    <a href="{{route('books.index')}}" className="reset-link">
                        Reset criteria
                    </a>
                </div>
            </li>
        );
    } else {
        content = books.map((book) => (
            <li key={book.id} className="mb-4">
                <div className="book-item p-4 border rounded shadow-md">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="w-full flex-grow sm:w-auto">
                            <Link
                                href={route("books.show", { book })}
                                className="book-title"
                            >
                                {book.title}
                            </Link>
                            <span className="book-author">{book.author}</span>
                        </div>
                        <div>
                            <div className="book-rating">
                                <StarRating rating={book.reviews_avg_rating} />
                            </div>
                            <div className="book-review-count">
                                out of {book.reviews_count} review
                                {book.reviews_count !== 1 && "s"}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    return <ul>{content}</ul>;
};

export default Book;

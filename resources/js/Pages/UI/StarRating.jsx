import React from "react";

const StarRating = ({ rating }) => {
    let content = "";
    if (rating) {
        const stars = [];

        const maxStars = 5;

        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                i <= rating ? (
                    <span key={i}>&#9733;</span>
                ) : (
                    <span key={i}>&#9734;</span>
                )
            );
        }
        content = stars;
    } else content = "No rating yet";
    return <div className="star-rating">{content}</div>;
};

export default StarRating;

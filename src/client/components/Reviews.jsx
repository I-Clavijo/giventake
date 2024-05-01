import React from 'react';
import Stars from './Stars'; 
import styles from "./Reviews.module.scss"; 

const Review = ({ name, profilePic, date, location, reviewText, rating }) => {
    return (
        <div className={styles.review}>
            <div className={styles.reviewHeader}>
                <img src={profilePic} alt="Profile" className={styles.profilePic}/>
                <div>
                    <h2>{name}</h2>
                    <p>Posted on {date}</p>
                    <p>{location} </p>
                </div>
            </div>
            <div className={styles.stars}>
                <Stars grade={rating || 0} />
            </div>
            <div className={styles.reviewText}>
                <p>{reviewText}</p>
            </div>
        </div>
    );
};

const ReviewsFeed = ({ reviews}) => {
    return (
        <div className={styles.feed}>
            {reviews.map((review, index) => (
                <Review
                    key={index}
                    name={review.name}
                    profilePic={review.profilePic}
                    date={review.date}
                    reviewText={review.reviewText}
                    rating={review.rating}
                />
            ))}
        </div>
    );
};

export default ReviewsFeed;
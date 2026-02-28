import { useState } from "react";
import Modal from "../atoms/Modal";
import Chip from "../atoms/Chip";

import { generateRandomItemReviews } from "../../SAMPLEDATA";

const REVIEWS = generateRandomItemReviews(23);

// Currently using randomly generated reviews for testing and development purposes, but will be fetched from backend later.
// Currently not using anything for user review, but will be fetched from backend later as well.
const DashboardItemReviews = ({ reviews, on_update, user_review }) => {  
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [review_text, setReviewText] = useState("");
  
  const PAGE_SIZE = 5;
  const [current_page, setCurrentPage] = useState(1);
  const total_pages = Math.ceil(REVIEWS.length / PAGE_SIZE);
  const paginated_reviews = REVIEWS.slice((current_page - 1) * PAGE_SIZE, current_page * PAGE_SIZE);

  return (
    <>
      <div className="reviews-section">
        <Pagination 
          current_page={current_page} 
          total_pages={total_pages} 
          on_page_change={(new_page) => setCurrentPage(new_page)} 
        />
        <YourReviewCard review={user_review} on_click={() => setIsModalOpen(true)} />
        <div className="reviews-list">
          {paginated_reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <Modal is_open={is_modal_open} on_close={() => setIsModalOpen(false)}>
        <UserReviewModalContent 
          review={review_text} 
          on_update={(new_review_text) => {
            setReviewText(new_review_text);
            on_update(new_review_text);
          }}
          on_close={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

const Pagination = ({ current_page, total_pages, on_page_change }) => {
  return (
    <div className="reviews-pagination">
      <button onClick={() => on_page_change(1)} disabled={current_page === 1}>
        {"<<"}
      </button>
      <button onClick={() => on_page_change(current_page - 1)} disabled={current_page === 1}>
        {"<"}
      </button>
      <span>Page {current_page} of {total_pages}</span>
      <button onClick={() => on_page_change(current_page + 1)} disabled={current_page === total_pages}>
        {">"}
      </button>
      <button onClick={() => on_page_change(total_pages)} disabled={current_page === total_pages}>
        {">>"}
      </button>
    </div>
   );
}

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <span className="reviewer-name">{review.owner}</span>
        <span className="review-rating">{review.rating} / 5</span>
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  );
}

const YourReviewCard = ({ review, on_click }) => {
  return (
    <div className="your-review-card" onClick={on_click}>
      <div className="review-header">
        <span className="reviewer-name">Your Review</span>
      </div>
      <p className="review-text">{review}</p>
    </div>
  )
}

const UserReviewModalContent = ({ review, on_update, on_close }) => {
  return(
    <div className="user-review-modal-inner">
      <h3>Your Review</h3>
      <textarea 
        value={review}
        onChange={(e) => on_update(e.target.value)}
        placeholder="Write your review here..."
        rows={5}
      />
      <div className="rating-buttons">
        <Chip 
          label="Save"
          size="medium"
          bgcolor="#6B9E64"
          color="#E0E0E0"
          clickable={true}
          on_click={() => {
            on_update(review);
            on_close();
          }}
        />
        <Chip
          label="Cancel"
          size="medium"
          bgcolor="#9E6464"
          color="#E0E0E0"
          clickable={true}
          on_click={() => on_close()}
        />
      </div>
    </div>
  );
}


export default DashboardItemReviews;

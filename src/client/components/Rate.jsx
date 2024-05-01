import { Button, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import { useState } from "react";

export function Component() {
  const [openModal, setOpenModal] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); 

  const handleReviewSubmit = (e) => {
    e.preventDefault(); 
    if (!selectedUser || !reviewText || rating === 0) {
      alert("Please choose a user, write a review, and provide a rating.");
      return; 
    }
    console.log("Submitting review:", { selectedUser, reviewText, rating });
    setOpenModal(false);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Review latest Activity</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tell us a bit how was it</h3>
            <Dropdown
              label="Choose who helped you"
              dismissOnClick={false}
              value={selectedUser}
              onChange={(selected) => setSelectedUser(selected)}
            >
              <Dropdown.Item>Yossi</Dropdown.Item>
              <Dropdown.Item>David</Dropdown.Item>
              <Dropdown.Item>Michael</Dropdown.Item>
              <Dropdown.Item>Boris</Dropdown.Item>
            </Dropdown>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reviewText" value="What did you like/improve?" /> 
              </div>
              <TextInput
                id="reviewText"
                placeholder="Write a review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="rating" value="Rate the experience">Rate the experience:</Label>
              <div className="flex items-center space-x-2">
                { 
                  [1, 2, 3, 4, 5].map((num) => (
                    <div key={num}>
                      <input
                        type="radio"
                        id={`rating-${num}`}
                        name="rating"
                        value={num}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        checked={rating === num}
                      />
                      <label htmlFor={`rating-${num}`}>{num}</label>
                    </div>
                  ))
                }
              </div>
              </div>
            <div className="w-full">
            <Button onClick={handleReviewSubmit}>Submit your review</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

import { Button, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import { useState,useMemo } from "react";
import { useSnackbar } from 'notistack';

export function Rate({ show, onClose }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser || !reviewText || rating === 0) {
      enqueueSnackbar("Please choose a user, write a review, and provide a rating.", { variant: 'error' });
      return;
    }

    console.log("Submitting review:", { selectedUser, reviewText, rating });
    setOpenModal(false);
  };

  return (
    <>
      <Modal {...{show, onClose}} size="md" popup>
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
              <Dropdown.Item onSelect={useMemo(() => (selected) => setSelectedUser(selected), [selectedUser])}>Yossi</Dropdown.Item>
              <Dropdown.Item onSelect={(selected) => setSelectedUser(selected)}>David</Dropdown.Item>
              <Dropdown.Item onSelect={(selected) => setSelectedUser(selected)}>Michael</Dropdown.Item>
              <Dropdown.Item onSelect={(selected) => setSelectedUser(selected)}>Boris</Dropdown.Item>
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
              <div className="flex flex-row items-center space-x-2">
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

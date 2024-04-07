import React, { useState } from 'react';
import styles from "./PostCreator.module.css";

const interests = [
  'Technology',
  'Travel',
  'Music',
  'Art',
  'Sports',
];

const PostCreator = () => {
  
  const [selectedInterest, setSelectedInterest] = useState('');
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState('');

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here
    // e.g., send data to your backend
    console.log('Submitting post:', {
      selectedInterest,
      picture,
      description,
    });

    setSelectedInterest('');
    setPicture(null);
    setDescription('');
  };

  return (
    <div className={styles.postCreator}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create</h2>
      </div>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="interest"
            >
                Select an interest:
            </label>
            <select
              id="interest"
              name="interest"
              className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:disabled:opacity-40"
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
            >
              <option value="">Select an Interest</option>
              {interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="picture"
            >
              Select a picture:
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              className="form-control block w-full px-0.5 py-0.5 text-base font-normal text-gray-700 rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:disabled:opacity-40"
              onChange={handlePictureChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Write a description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:disabled:opacity-40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary px-4 py-2 rounded shadow-sm text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default PostCreator;

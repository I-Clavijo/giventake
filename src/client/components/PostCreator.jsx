import React, { useState } from 'react';
import styles from "./PostCreator.module.css";
import { Textarea, Button, Datepicker, FileInput, Label } from "flowbite-react";


const Categorys = [
  'Technology',
  'Travel',
  'Music',
  'Art',
  'Sports',
];

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
];



const PostCreator = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]); // get the first selected file

    if (picture) {
      // check if the file is an image
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement form submission logic here
    console.log('Submitting post:', {
      selectedCategory,
      selectedCountry,
      picture,
      description,
      date,
    });

    setSelectedCategory('');
    setPicture(null);
    setDescription('');
    setSelectedCountry('');
    setDate('');
  };

  return (
    <div className={styles.postCreator}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create</h2>
      </div>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={styles.label} htmlFor="Category">
              Select a category:
            </label>
            <select
              id="Category"
              name="Category"
              className="form-select px- py-1.7 w-full rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Category</option>
              {Categorys.map((Category) => (
                <option key={Category} value={Category}>
                  {Category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className={styles.label}
              htmlFor="date">Select a date:
            </label>
            <Datepicker id="date" onSelectedDateChanged={handleDateChange} />
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="country">
              Select a country:
            </label>
            <select
              id="country"
              name="country"
              className="form-select px- py-1.7 w-full rounded-md"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="picture">
              Select a picture:
            </label>
            <div>
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <FileInput id="dropzone-file" className="hidden" />
                </Label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className={styles.label} htmlFor="description">
              Write a description:
            </label>
            <div className="mb-2 block">
              <Label htmlFor="description" />
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Write here"
              required rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>
          <div className={styles.submitButton}>
            <Button color="blue" onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default PostCreator;

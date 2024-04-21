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

    if(picture){
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
            <Datepicker id="date" onSelectedDateChanged={handleDateChange}/>
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
              <FileInput id="fileInput" name="file" accept=".jpg, .png" 
                helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." 
                onChange={handlePictureChange}
              />
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

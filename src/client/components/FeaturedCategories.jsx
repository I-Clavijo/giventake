import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';

import Car from '../assets/images/categories_grid/car.jpg';
import Elderly from '../assets/images/categories_grid/elderly.jpg';
import Home from '../assets/images/categories_grid/home_fix.jpg';
import Moving from '../assets/images/categories_grid/moving.jpg';
import Pets from '../assets/images/categories_grid/pets.jpg';
import Photography from '../assets/images/categories_grid/photography.jpg';
import Sports from '../assets/images/categories_grid/sports.jpg';
import Travel from '../assets/images/categories_grid/travel.jpg';

const categories = [
  { id: 1, name: 'Road Assistance', obj: Car, to: '/feed/road-assistance' },
  { id: 3, name: 'Home Repair', obj: Home, to: '/feed/home-repair' },
  { id: 4, name: 'Moving', obj: Moving, to: '/feed/moving' },
  { id: 5, name: 'Pets', obj: Pets, to: '/feed/pets' },
  { id: 6, name: 'Photography', obj: Photography, to: '/feed/photography' },
  { id: 7, name: 'Sports', obj: Sports, to: '/feed/sports' },
  { id: 8, name: 'Travel', obj: Travel, to: '/feed/travel' },
  { id: 9, name: 'Elderly Care', obj: Elderly, to: '/feed/elderly-care' },
];


const CategoriesGrid = () => {

  return (
    <div className={styles.grid}>
        <div className={styles.gridHeader}>
            <div className={styles.gridTitle}>Explore featured categories</div>
        </div>
    <div className={styles.categoriesGrid}>
      {categories.map((category) => (
        <Link key={category.id} to={category.to} className={styles.categoryItem}>
          <div className={styles.categoryContent}> 
            <img className="h-auto max-w-full rounded-lg" src={category.obj} alt={category.name} />
            <div className={styles.categoryOverlay}>
              <h3 className={styles.categoryName}>{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
            
    </div>
    </div>

  );
};

export default CategoriesGrid;

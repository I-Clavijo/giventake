import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedCategories.module.css';
import { CATEGORIES } from '../../utils/staticData';


const FeaturedCategories = () => {

  return (
    <div >
        <div className={styles.gridHeader}>
            <h6>Featured categories</h6>
        </div>
        <div className={styles.categoriesGrid}>
          {Object.entries(CATEGORIES).map((item) => {
            const categoryId = item[0];
            const category = item[1];

            return <Link key={categoryId} to={category.to} className={styles.categoryItem}>
              <div className={styles.categoryContent}> 
                <img className="h-auto max-w-full rounded-lg" src={category.obj} alt={category.name} />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                </div>
              </div>
            </Link>
          })}     
      </div>
    </div>

  );
};

export default FeaturedCategories;

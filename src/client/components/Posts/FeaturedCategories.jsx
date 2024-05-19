import React from 'react'
import { Link } from 'react-router-dom'
import s from './FeaturedCategories.module.scss'
import { CATEGORIES } from '../../utils/staticData'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { LeftArrow, RightArrow } from './Arrows'
import { useMediaQuery } from '@uidotdev/usehooks'

import 'react-horizontal-scrolling-menu/dist/styles.css'

const FeaturedCategories = () => {
  const isWideDevice = useMediaQuery('only screen and (min-width: 1100px)')

  return (
    <div className={s.categoriesWrap}>
      {/* <div className={s.gridHeader}>
        <h6 className='font-normal'>Featured categories</h6>
      </div> */}

      {isWideDevice ? (
        <div className={s.categoriesGrid}>
          {Object.entries(CATEGORIES).map(([k, v]) => {
            if (k === 'ALL_CATEGORIES') return

            const to = `?category=${k.toLowerCase()}`
            return (
              <Link key={k} to={to} className={s.categoryItem}>
                <div className={s.categoryContent}>
                  <img className="h-auto max-w-full rounded-lg" src={v.obj} alt={v.name} />
                  <div className={s.categoryOverlay}>
                    <h3 className={s.categoryName}>{v.name}</h3>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className={s.scrollWrap}>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {Object.entries(CATEGORIES).map(([key, v]) => {
              if (key === 'ALL_CATEGORIES') return

              const to = `?category=${key.toLowerCase()}`
              return (
                <Link key={key} {...{ to }}>
                  {v.name}
                </Link>
              )
            })}
          </ScrollMenu>
        </div>
      )}
    </div>
  )
}

export default FeaturedCategories

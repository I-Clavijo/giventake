import React, { useEffect, useState } from "react";
import { Dropdown, TextInput } from "flowbite-react";
import s from "./FeedFilters.module.scss";
import CitySelector from "../RHF/Location/CitySelector";
import { IoIosClose } from "react-icons/io";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import LocationSelector from "../RHF/Location/LocationSelector";
import { useForm } from "react-hook-form";
import { CATEGORIES, RADIUS_LIST } from "../../utils/staticData";
import { Link, useSearchParams } from "react-router-dom";


export function FeedFilters({ filters, setFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const getCategoryNameFromHandle = category ? CATEGORIES[category.toUpperCase()].name : 'All Categories';

  const { control, setValue, watch } = useForm({
    defaultValues: {
      ...filters,
      category: getCategoryNameFromHandle,
      radius: RADIUS_LIST[0]
    }
  });

  useEffect(() => {
      const changedFilters = {
        category: watch('category'),
        location: watch('location'),
        radius: watch('radius')
      };
      setFilters(changedFilters);
  }, [watch('category'), watch('location.city'), watch('location.country'), watch('radius')]);

  useEffect(() => {
    setValue('category', getCategoryNameFromHandle);
  }, [category]);

  return (
    <form className={s.wrapper}>
      <div className={s.filtersWrap}>
        <FiFilter size={25} color='#333' />
        <span>
          <span>
            Show me
          </span>
          <div className={s.filterBox}>
            <Dropdown className={s.dropdown} label={watch('category')} inline>
              <div className={s.categoriesList}>
                {Object.entries(CATEGORIES).map(([k, v]) => {
                  const to = k === 'ALL_CATEGORIES' ? '' : `?category=${k.toLowerCase()}`;

                  return <Link key={k} to={to}>
                    <v.icon />
                    <span>{v.name}</span>
                  </Link>;
                })}
              </div>
            </Dropdown>
          </div>
        </span>

        <span>
          <span>
            posts from
          </span>

          <div className={s.filterBox}>
            <Dropdown className={s.dropdown} label={watch('location') ? watch('location.city') + ", " + watch('location.country') : watch('location.country')} inline>
              <div style={{ padding: '.2em' }}>
                <LocationSelector
                  {...{ control }}
                  names={{ city: 'location.city', country: 'location.country', lat: 'location.lat', long: 'location.long' }}
                  style={{ flexDirection: 'column', gap: '0', minWidth: '200px' }}
                  onKeyDown={(e) => e.stopPropagation()}
                  withLabels={true}
                />
              </div>
            </Dropdown>
          </div>
        </span>

        <span>
          <span>
            in radius of
          </span>
          <div className={s.filterBox}>
            <Dropdown className={s.dropdown} label={`${watch('radius')} Km`} inline>
              {RADIUS_LIST.map((val) => <Dropdown.Item key={val} className={s.item} onClick={() => setValue('radius', val)}>{val} Km</Dropdown.Item>)}
            </Dropdown>
          </div>
        </span>
      </div>
    </form>
  );
}

export default FeedFilters;
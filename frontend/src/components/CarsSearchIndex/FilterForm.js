import React, { useEffect } from "react";
import { Input } from "../Forms";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function FilterForm({
  minPricing,
  maxPricing,
  superhostFilter,
  experienceType,
}) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const changeTypes = {
    MINPRICE: { tag: "minPrice", value: minPricing },
    MAXPRICE: { tag: "maxPrice", value: maxPricing },
    SUPERHOST: { tag: "superhost", value: superhostFilter },
    EXPERIENCE: { tag: "experience", value: experienceType },
  };

  useEffect(() => {
    const filters = Object.values(changeTypes);
    filters.forEach((filter) => {
      const currentValInUrl = searchParams.get(filter.tag);
      if (!currentValInUrl) {
        searchParams.set(filter.tag, filter.value);
        history.push(`${location.pathname}?${searchParams.toString()}`);
      }
    });
  }, []);

  const parseValue = (val) => (val === "" ? val : parseInt(val));

  const handleChange = (newVal, type) => {
    const existingVal = searchParams.get(type);
    if (existingVal) {
      searchParams.set(type, newVal);
    } else {
      searchParams.append(type, newVal);
    }
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="filter-form">
      <div className="filter-fields">
        <div className="filter-price-container">
          <h2>Filter by daily rate</h2>
          <div className="price-search-component">
            <label className="pricing-input-label" htmlFor="min-price">
              min $
            </label>
            <Input
              id="min-price"
              min="0"
              type="number"
              className={minPricing < 0 ? "price-input-too-low" : ""}
              placeholder="$"
              value={minPricing}
              onChange={(e) =>
                handleChange(
                  parseValue(e.target.value),
                  changeTypes.MINPRICE.tag
                )
              }
            />
          </div>
          <p>-</p>
          <div className="price-search-component">
            <label className="pricing-input-label" htmlFor="max-price">
              max $
            </label>
            <Input
              type="number"
              id="max-price"
              placeholder="$"
              min="0"
              className={maxPricing < 0 ? "price-input-too-low" : ""}
              value={maxPricing}
              onChange={(e) =>
                handleChange(
                  parseValue(e.target.value),
                  changeTypes.MAXPRICE.tag
                )
              }
            />
          </div>
        </div>

        <div className="superhost-search-component">
          <label id="superhost-input-label" htmlFor="superhosts-only">
            Superhosts only
          </label>
          <Input
            htmlFor="superhosts-only"
            type="checkbox"
            checked={superhostFilter}
            onChange={(e) =>
              handleChange(e.target.checked, changeTypes.SUPERHOST.tag)
            }
          />
        </div>
        <div className="experience-search-component">
          <label id="experience-input-label" htmlFor="experience-type">
            Filter by experience
          </label>
          <select
            id="experience-type"
            value={experienceType}
            onChange={(e) =>
              handleChange(e.target.value, changeTypes.EXPERIENCE.tag)
            }
          >
            <option value="all">All</option>
            <option value="Exotic">Deluxe + Super Deluxe</option>
            <option value="Electric">Electric</option>
            <option value="All-Wheel Drive">All-Wheel Drive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;

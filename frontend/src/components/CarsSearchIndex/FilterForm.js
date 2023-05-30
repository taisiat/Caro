import React, { useEffect } from "react";
import { Input } from "../Forms";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function FilterForm({
  minPricing,
  maxPricing,
  superhostFilter,
  experienceType,
  // setMinPricing,
  // setMaxPricing,
  // setSuperhostFilter,
  // setExperienceType,
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
    // switch (type) {
    //   case changeTypes.MINPRICE:
    //     setMinPricing(newVal);
    //     break;
    //   case changeTypes.MAXPRICE:
    //     setMaxPricing(newVal);
    //     break;
    //   case changeTypes.SUPERHOST:
    //     setSuperhostFilter(newVal);
    //     break;
    //   case changeTypes.EXPERIENCE:
    //     setExperienceType(newVal);
    //     break;
    //   default:
    //     break;
    // }

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
              // onChange={(e) => setMinPricing(parseValue(e.target.value))}
              // onChange={(e) =>
              //   searchParams.set("minPrice", parseValue(e.target.value))
              // }
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
              // onChange={(e) => setMaxPricing(parseValue(e.target.value))}
              // onChange={(e) =>
              //   searchParams.set("maxPrice", parseValue(e.target.value))
              // }
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
            value={superhostFilter}
            // onChange={(e) => setSuperhostFilter(e.target.checked)}
            // onChange={(e) => searchParams.set("superhost", e.target.checked)}
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
            // onChange={(e) => setExperienceType(e.target.value)}
            // onChange={(e) => searchParams.set("experience", e.target.value)}
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

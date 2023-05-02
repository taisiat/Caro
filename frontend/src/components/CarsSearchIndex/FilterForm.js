import React from "react";
import { Input } from "../Forms";

function FilterForm({
  minPricing,
  maxPricing,
  superhostFilter,
  experienceType,
  setMinPricing,
  setMaxPricing,
  setSuperhostFilter,
  setExperienceType,
}) {
  const parseValue = (val) => (val === "" ? val : parseInt(val));

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
              // label="min $"
              id="min-price"
              type="number"
              placeholder="$"
              value={minPricing}
              onChange={(e) => setMinPricing(parseValue(e.target.value))}
            />
          </div>
          <p>-</p>
          <div className="price-search-component">
            <label className="pricing-input-label" htmlFor="max-price">
              max $
            </label>
            <Input
              // label="max $"
              type="number"
              id="max-price"
              placeholder="$"
              value={maxPricing}
              onChange={(e) => setMaxPricing(parseValue(e.target.value))}
            />
          </div>
        </div>

        <div className="superhost-search-component">
          <label id="superhost-input-label" htmlFor="superhosts-only">
            Superhosts only
          </label>
          <Input
            //   label="Superhosts only:"
            htmlFor="superhosts-only"
            type="checkbox"
            value={superhostFilter}
            onChange={(e) => setSuperhostFilter(e.target.checked)}
          />
        </div>

        {/* <div className="experience-search-component">
          <label id="experience-input-label" htmlFor="experience-type">
            Filter by experience
          </label>
          <Input
            htmlFor="experience-type"
            type="checkbox"
            value={experienceType}
            onChange={(e) => setExperienceType(e.target.value)}
          />
        </div> */}
        <div className="experience-search-component">
          <label id="experience-input-label" htmlFor="experience-type">
            Filter by experience
          </label>
          <select
            id="experience-type"
            value={experienceType}
            onChange={(e) => setExperienceType(e.target.value)}
          >
            <option value="">All</option>
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

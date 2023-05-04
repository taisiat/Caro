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
              id="min-price"
              min="0"
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
              type="number"
              id="max-price"
              placeholder="$"
              min="0"
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
            htmlFor="superhosts-only"
            type="checkbox"
            value={superhostFilter}
            onChange={(e) => setSuperhostFilter(e.target.checked)}
          />
        </div>
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

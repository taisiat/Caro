import React from "react";
import { Input } from "../Forms";

function FilterForm({
  minPricing,
  maxPricing,
  superhostFilter,
  setMinPricing,
  setMaxPricing,
  setSuperhostFilter,
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
      </div>
    </div>
  );
}

export default FilterForm;

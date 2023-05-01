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
          Filter by daily rate:
          <label htmlFor="min-price">min $</label>
          <Input
            id="min-price"
            type="number"
            placeholder="$"
            value={minPricing}
            onChange={(e) => setMinPricing(parseValue(e.target.value))}
          />
          <p>to</p>
          <label htmlFor="max-price">max $</label>
          <Input
            type="number"
            id="max-price"
            placeholder="$"
            value={maxPricing}
            onChange={(e) => setMaxPricing(parseValue(e.target.value))}
          />
        </div>

        <Input
          label="Superhosts only:"
          type="checkbox"
          value={superhostFilter}
          onChange={(e) => setSuperhostFilter(e.target.checked)}
        />
      </div>
    </div>
  );
}

export default FilterForm;

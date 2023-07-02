import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        fliterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "full-price", label: "Full priced" },
          { value: "discounted", label: "Discounted" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "totalPrice-asc", label: "Sort by total (low->high)" },
          { value: "totalPrice-desc", label: "Sort by total (high->low)" },
          { value: "regularPrice-asc", label: "Sort by price (low->high)" },
          { value: "regularPrice-desc", label: "Sort by price (high->low)" },
          { value: "discount-asc", label: "Sort by discount (low->high)" },
          { value: "discount-desc", label: "Sort by discount (high->low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low->high)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high->low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;

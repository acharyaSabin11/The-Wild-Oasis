import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 0.4rem 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  color: var(--color-grey-700);
`;
const SelectOption = styled.option`
  ${(props) =>
    props.selected &&
    `
    background-color: var(--color-brand-700);
    `}

  /* accent-color: var(--color-brand-100); */

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy");

  useEffect(
    function () {
      if (!searchParams.get("sortBy")) {
        searchParams.set("sortBy", options[0].value);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, options]
  );

  function handleChange(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      onChange={(e) => handleChange(e.target.value)}
      value={sortValue ?? options[0].value}
    >
      {options.map((option) => (
        <SelectOption value={option.value} key={option.value}>
          {option.label}
        </SelectOption>
      ))}
    </StyledSelect>
  );
}

export default SortBy;

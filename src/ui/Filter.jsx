import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
`;

const FilterButton = styled.button`
  padding: 0.7rem 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  border: none;
  border-radius: var(--border-radius-sm);

  ${({ $active }) =>
    $active &&
    `
    background-color: var(--color-brand-700);
    color: var(--color-brand-100);
    `}
`;

function Filter({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(filterField);

  useEffect(
    function () {
      if (!searchParams.get(filterField)) {
        searchParams.set(filterField, options[0].value);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, filterField, options]
  );

  function handleClick(value) {
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          $active={currentValue === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

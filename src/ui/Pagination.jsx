import { createContext, useCallback, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";
//STYLED COMPONENTS
const StyledPaginationButton = styled.button`
  color: var(--color-brand-100);
  background-color: var(--color-brand-700);
  border: none;
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border-radius: var(--border-radius-sm);
  &:disabled {
    background-color: var(--color-grey-400);
    color: var(--color-grey-0);
  }
`;

const Trailing = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
`;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

//PAGINATION CONTEXT
const PaginationContext = createContext();

//PAGINATION COMPONENTS
function Pagination({ children, count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  if (page) {
    page = Number(page);
  }

  const changePageNumber = useCallback(
    function changePageNumber(number) {
      searchParams.set("page", number);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(
    function () {
      if (!page && count) {
        changePageNumber(1);
      }
    },
    [changePageNumber, page, count]
  );

  if (!count) return null;

  return (
    <PaginationContext.Provider value={{ count, changePageNumber, page }}>
      <StyledPagination>{children}</StyledPagination>
    </PaginationContext.Provider>
  );
}

function Info() {
  const { page, count } = useContext(PaginationContext);
  return (
    <div>
      Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
      {page >= Math.ceil(count / PAGE_SIZE) ? count : page * PAGE_SIZE} of{" "}
      {count} results
    </div>
  );
}

function PaginationButton({ type = "next", children }) {
  const { page, count, changePageNumber } = useContext(PaginationContext);
  const maxPage = Math.ceil(count / PAGE_SIZE);
  function handleNext() {
    if (page < maxPage) {
      changePageNumber(page + 1);
    }
  }

  function handlePrev() {
    if (page > 1) {
      changePageNumber(page - 1);
    }
  }
  return (
    <StyledPaginationButton
      onClick={type === "prev" ? handlePrev : handleNext}
      disabled={type === "prev" ? page === 1 : page === maxPage}
    >
      {children}
    </StyledPaginationButton>
  );
}

//PAGINATION COMPONENTS AS PROPERTIES
Pagination.PaginationButton = PaginationButton;
Pagination.Trailing = Trailing;
Pagination.Info = Info;

//PAGINATION EXPORT
export default Pagination;

import CabinsTable from "../features/cabins/CabinsTable";
import Heading from "./../ui/Heading";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import ErrorPage from "../ui/ErrorPage";
import Button from "../ui/Button";
import CabinForm from "../features/cabins/CabinForm";
import useCabinsData from "../features/cabins/useCabinsData";
import Modal from "../ui/Modal";
import SideBySide from "../ui/SideBySide";
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";
import SortBy from "../ui/SortBy";

const StyledCabins = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 auto;
  max-width: 120rem;
  min-width: 75rem;
`;

const HeadingAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const FilterAndSort = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

function Cabins() {
  const filterField = "discount";
  const { isLoading, cabins, cabinsLoadingError } = useCabinsData();

  //Getting URL Search Parameters for Filtering
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get(filterField);
  const sortValue = searchParams.get("sortBy");

  //Filtering Cabins
  let filteredCabins = [];
  if (cabins) {
    switch (filterValue) {
      case "all":
        filteredCabins = cabins;
        break;
      case "with-discount":
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
        break;
      case "no-discount":
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    }
  }

  //Sorting Cabins
  let sortedCabins = [];
  if (sortValue) {
    const [sortColumn, sortType] = sortValue?.split("-") ?? [];
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[sortColumn] - b[sortColumn]) * (sortType === "asc" ? 1 : -1)
    );
  }

  //UI LOGIC
  if (isLoading) return <Spinner />;

  if (cabinsLoadingError)
    return <ErrorPage message={cabinsLoadingError.message} />;

  //Default UI
  return (
    <StyledCabins>
      <HeadingAndFilter>
        <Heading>All Cabins</Heading>
        <FilterAndSort>
          <Filter
            filterField={filterField}
            options={[
              { label: "All", value: "all" },
              { label: "With Discount", value: "with-discount" },
              { label: "No Discount", value: "no-discount" },
            ]}
          />
          <SortBy
            options={[
              { label: "Cabin Name (A-Z)", value: "name-asc" },
              { label: "Cabin Name (Z-A)", value: "name-dsc" },
              { label: "Capacity (Low to High)", value: "maxCapacity-asc" },
              { label: "Capacity (High to Low)", value: "maxCapacity-dsc" },
              { label: "Price (Low to High)", value: "regularPrice-asc" },
              { label: "Price (High to Low)", value: "regularPrice-dsc" },
              { label: "Discount (Low to High)", value: "discount-asc" },
              { label: "Discount (High to Low)", value: "discount-dsc" },
            ]}
          />
        </FilterAndSort>
      </HeadingAndFilter>
      <CabinsTable cabins={sortedCabins} />

      <Modal>
        <SideBySide>
          <Modal.OpenModal name="cabin-form">
            <Button type="primary">{"Create Cabin"}</Button>
          </Modal.OpenModal>
          <Modal.OpenModal name="show-cabins">
            <Button type="primary">{"Show Cabin"}</Button>
          </Modal.OpenModal>
        </SideBySide>
        <Modal.Window name="cabin-form">
          <CabinForm type="create" />
        </Modal.Window>
        <Modal.Window name="show-cabins">
          <CabinsTable cabins={cabins} />
        </Modal.Window>
      </Modal>
    </StyledCabins>
  );
}

export default Cabins;

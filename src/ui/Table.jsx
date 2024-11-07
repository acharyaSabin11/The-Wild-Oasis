import { createContext, useContext } from "react";
import styled from "styled-components";

//STYLED COMPONENTS
const StyledTable = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  width: 100%;
  flex: 1;
  margin-bottom: 2rem;
`;

const StyledHeader = styled.div`
  display: grid;
  background-color: var(--color-grey-100);
  grid-template-columns: ${({ $columns }) => $columns};
  font-weight: 900;
  column-gap: 2rem;
  padding: 1.5rem 2rem;
  text-transform: uppercase;
  font-size: 1.5rem;
  overflow-wrap: anywhere;
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  column-gap: 2rem;
  align-items: center;
  justify-content: start;
  background-color: var(--color-grey-0);
  padding: 0.5rem 2rem;
  overflow-wrap: anywhere;
`;

const TableRowElement = styled.div`
  width: 100%;
  max-width: 100%;
`;

const StyledFooter = styled.div`
  padding: 1rem 2rem;
`;

const Error = styled.p`
  font-size: 1.7rem;
  width: 100%;
  text-align: center;
  background-color: var(--color-grey-0);
  padding: 1rem 0;
`;

//TABLE CONTEXT
const TableContext = createContext();

//TABLE COMPONENTS
function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>;
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledHeader $columns={columns}>{children}</StyledHeader>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledRow $columns={columns}>{children}</StyledRow>;
}

function Body({ data, render }) {
  if (!data.length)
    return <Error>There is no data to be displayed in the table</Error>;
  return <TableRowElement>{data.map(render)}</TableRowElement>;
}

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

//TABLE COMPONENTS AS TABLE PROPERTIES
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

//TABLE EXPORT
export default Table;

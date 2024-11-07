import { useState } from "react";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";

function CabinsTable({ cabins }) {
  const [editId, setEditId] = useState(null);

  return (
    <Table columns="0.6fr 2fr 2fr 1fr 1fr 0.25fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => (
          <CabinRow
            cabin={cabin}
            key={cabin.id}
            editId={editId}
            setEditId={setEditId}
          />
        )}
      />
    </Table>
  );
}

export default CabinsTable;

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  const filter = searchParams.get("discount");

  let filteredCabins;

  if (filter === "discounted") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filter === "full-price") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins = cabins;
  }

  let sortField, sortOrder;
  if (searchParams.get("sortBy"))
    [sortField, sortOrder] = searchParams.get("sortBy").split("-");

  if (sortField && sortOrder) {
    filteredCabins = filteredCabins.sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      if (sortField === "totalPrice")
        return (
          (a.regularPrice - a.discount - (b.regularPrice - b.discount)) *
          modifier
        );

      return (a[sortField] - b[sortField]) * modifier;
    });
  }

  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings?.length || 0;

  const sales =
    bookings?.reduce?.((acc, curr) => acc + curr.totalPrice, 0) || 0;

  const checkins = confirmedStays?.length || 0;

  const occupation =
    confirmedStays.reduce?.((acc, curr) => acc + curr.numNights, 0) /
      (numDays * cabinCount) || 0;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupation.toFixed(2) * 100}%`}
      />
    </>
  );
};

export default Stats;

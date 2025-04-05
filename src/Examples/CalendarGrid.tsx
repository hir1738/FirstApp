import { useState } from "react";
import "./CalendarGrid.css";

const CalendarGrid: React.FC = () => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const dates: {
    month: string;
    dayName: string;
    date: number;
    fullDate: string;
    timeOfDay: string;
  }[] = [];
  const monthHeaders: { name: string; days: number }[] = [];

  for (let i = 0; i < 3; i++) {
    const month = selectedMonth + i;
    const monthName = new Date(currentYear, month, 1).toLocaleString("default", {
      month: "long",
    });
    const lastDayOfMonth = new Date(currentYear, month + 1, 0).getDate();

    monthHeaders.push({ name: monthName, days: lastDayOfMonth * 2 });

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(currentYear, month, day);
      const formattedDate = formatDate(date);
      
      dates.push({
        month: monthName,
        dayName: dayNames[date.getDay()],
        date: day,
        fullDate: `${formattedDate}/firstHalf`,
        timeOfDay: "firstHalf",
      });
      dates.push({
        month: monthName,
        dayName: dayNames[date.getDay()],
        date: day,
        fullDate: `${formattedDate}/secondHalf`,
        timeOfDay: "secondHalf",
      });
    }
  }

  function formatDate(date: Date) {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  }

  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);

  const bookings = [
    {
      room: 1,
      startDate: "2025/04/05/secondHalf",
      endDate: "2025/04/06/firstHalf",
      userName: "Kishan",
      isPaid: "Not Paid",
    },
    {
      room: 3,
      startDate: "2025/04/10/firstHalf",
      endDate: "2025/04/12/secondHalf",
      userName: "Joshi",
      isPaid: "Paid",
    },
    {
      room: 5,
      startDate: "2025/04/05/secondHalf",
      endDate: "2025/04/07/firstHalf",
      userName: "Jaman",
      isPaid: "Not Paid",
    },
    {
      room: 8,
      startDate: "2025/03/31/firstHalf",
      endDate: "2025/04/18/secondHalf",
      userName: "Jaman",
      isPaid: "Paid",
    },
  ];

  return (
    <div className="App">
      <h1>Calendar View (3 Months)</h1>
      <select onChange={handleMonthChange} value={selectedMonth}>
        {[...Array(12).keys()].map((month) => (
          <option key={month} value={month}>
            {new Date(2025, month, 1).toLocaleString("default", {
              month: "long",
            })}
          </option>
        ))}
      </select>

      <div className="table-wrapper">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr className="sticky-header month-header">
                <th className="header-cell"></th>
                {monthHeaders.map((month, index) => (
                  <th key={index} colSpan={month.days} className="month-name">
                    {month.name}
                  </th>
                ))}
              </tr>

              <tr className="sticky-header">
                <th className="header-cell"></th>
                {dates.map((date, index) =>
                  date.timeOfDay === "firstHalf" ? (
                    <th
                      key={index}
                      colSpan={2}
                      className={`header-cell ${
                        date.dayName === "Sat" || date.dayName === "Sun"
                          ? "weekend"
                          : ""
                      }`}
                    >
                      {date.dayName} <br /> {date.date}
                    </th>
                  ) : null
                )}
              </tr>

              {/* <tr className="sticky-header time-header">
                <th className="header-cell"></th>
                {dates.map((date, index) => (
                  <th key={index} className="header-cell time-cell">
                    {date.timeOfDay === "firstHalf" ? "1st" : "2nd"}
                  </th>
                ))}
              </tr> */}
            </thead>

            <tbody>
              {rooms.map((roomNumber) => (
                <tr key={roomNumber}>
                  <th className="header-cell">Room {roomNumber}</th>
                  {dates.map((date, index) => {
                    const booking = bookings.find(
                      (b) =>
                        b.room === roomNumber &&
                        date.fullDate >= b.startDate &&
                        date.fullDate <= b.endDate
                    );

                    if (
                      booking &&
                      (date.fullDate === booking.startDate ||
                        (date.fullDate === dates[0].fullDate &&
                          booking.startDate < dates[0].fullDate))
                    ) {
                      const startIndex = dates.findIndex(
                        (d) => d.fullDate === booking.startDate
                      );
                      const endIndex = dates.findIndex(
                        (d) => d.fullDate === booking.endDate
                      );
                      const spanLength = endIndex - startIndex + 1;

                      return (
                        <td
                          key={`${date.fullDate}-${roomNumber}`}
                          className="column-cell"
                          colSpan={spanLength}
                          style={{ position: "relative" }}
                        >
                          <div className="overlay">
                            {booking.userName} - {booking.isPaid}
                          </div>
                        </td>
                      );
                    }

                    return booking ? null : (
                      <td
                        key={`${date.fullDate}-${roomNumber}`}
                        className="column-cell"
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;

//! DYNAMIC LIST GROUP

import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

//! STATIIC LIST GROUP
// import { useState } from "react";
// function ListGroup() {
//   let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   // items = [];
//   const [selectedIndex,setSelectedIndex] = useState(-1);

//   return (
//     <>
//       <h1>List Group</h1>
//       {items.length === 0 && <p>No Items Found</p>}
//       <ul className="list-group">
//         {items.map((item, index) => (
//           <li
//             key={item}
//             onClick={() => {
//                 setSelectedIndex (index);
//             }}
//             className={
//               selectedIndex === index
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
export default ListGroup;

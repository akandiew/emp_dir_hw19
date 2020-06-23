import React from 'react';
import './styles.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const EmployeeTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.employees);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Employee List</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('phone')}
              className={getClassNamesFor('phone')}
            >
              Phone
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('email')}
              className={getClassNamesFor('email')}
            >
              e-mail
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dob')}
              className={getClassNamesFor('dob')}
            >
              DOB
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.dob}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <EmployeeTable
        employees={[
          { id: 1, name: 'Smith, John', phone: "(203) 555-1212", email: "john@test1.com", dob: "2/11/78" },
          { id: 2, name: 'Jones, Michael', phone: "(914) 662-1234", email: "mike@test2.com", dob: "12/3/70" },
          { id: 3, name: 'Walsh, Brian', phone: "(203) 762-7654", email: "brian@test2.com", dob: "6/3/68" },
          { id: 4, name: 'Cassidy, David', phone: "(212) 876-9754", email: "david@test4.com", dob: "4/27/82" },
          { id: 5, name: 'Hathaway, Anne', phone: "(213) 976-0234", email: "anne@test5.com", dob: "7/25/78" },
          { id: 6, name: 'Woods, Devan', phone: "(405) 324-7643", email: "devan@test6.com", dob: "8/11/76" },
          { id: 7, name: 'Conner, James', phone: "(213) 456-7890", email: "james@test7.com", dob: "3/5/69" },
          { id: 8, name: 'Bunker, Sam', phone: "(203) 554-2188", email: "bunker@test8.com", dob: "10/9/84" },
          { id: 9, name: 'Leech, Archie', phone: "(914) 227-1389", email: "archie@test9.com", dob: "5/13/82" },
        ]}
      />
    </div>
  );
}

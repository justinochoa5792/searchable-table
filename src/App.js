import { useEffect, useState, useMemo } from "react";
import { useFilters, useTable } from "react-table";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "phone",
        accessor: "phone",
      },
      {
        Header: "website",
        accessor: "website",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useFilters
  );

  const getTableData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setTableData(data);
  };

  const handleChange = (e) => {
    setFilterInput(e.target.value);
    setFilter("name", e.target.value);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <input
          value={filterInput}
          onChange={handleChange}
          placeholder="search name"
        />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

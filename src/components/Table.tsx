import { useTable, Column, TableOptions } from "react-table";

function Table<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassNames: string,
  heading: string
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
    };
    const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } = useTable(options);

    return (
      <div className={containerClassNames}>
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <table
          className="table border-collapse border border-gray-300 w-full"
          {...getTableProps()}
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-2 py-2 border border-gray-300 text-left"
                    {...column.getHeaderProps()}
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="hover:bg-gray-100" {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td
                      className="px-2 py-5 border border-gray-300 text-left"
                      {...cell.getCellProps()}
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}

export default Table;

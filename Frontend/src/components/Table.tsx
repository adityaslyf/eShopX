import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";

import { GiBoomerang } from "react-icons/gi";
import { GiBottomRight3dArrow } from "react-icons/gi";

function Table<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassNames: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 5,
      },
    };
    const {
      getTableProps,
      getTableBodyProps,
      page,
      headerGroups,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
      // gotoPage,
    } = useTable(options, useSortBy, usePagination);

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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <span className=" flex">
                        {column.isSortedDesc ? (
                          <GiBoomerang />
                        ) : (
                          <GiBottomRight3dArrow />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="hover:bg-gray-100"
                  {...row.getRowProps()}
                  key={row.id}
                >
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
        {showPagination && (
          <div className=" flex justify-center space-x-7 mt-8">
           
            <button
              disabled={!canNextPage}
              onClick={nextPage}
              className=" rounded-md bg-blue-600 p-2 m-3 hover:bg-green-600"
            >
              Next
            </button>
            <span className=" mt-5">{`${pageIndex + 1} Page of ${pageCount}`}</span>
            <button
              disabled={!canPreviousPage}
              onClick={previousPage}
              className=" rounded-md bg-blue-600 p-2 m-3 hover:bg-green-600"
            >
              Previous
            </button>
            {/* <button
              onClick={() => {
                gotoPage(0);
              }}
              className="rounded-sm bg-blue-600 p-2  m-3"
            >
              1st page
            </button> */}
            {/* <button
              onClick={() => {
                gotoPage(pageCount - 1);
              }}
              className="rounded-sm bg-blue-600 p-2  m-3"
            >
              last page
            </button> */}
          </div>
        )}
      </div>
    );
  };
}

export default Table;

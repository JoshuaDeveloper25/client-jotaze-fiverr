import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Box } from "@mui/material";

export const Table = ({ columns, data, filtering, setFiltering }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Box sx={{ overflowX: "auto", minWidth: "100%", maxWidth: "10rem" }}>
        <Box
          component={"table"}
          sx={{
            width: "100%",
            textWrap: "nowrap",
            borderCollapse: "collapse",
            borderSpacing: "0",
          }}
        >
          {/* Head */}
          <Box component={`thead`} sx={{ background: "rgb(248 250 252)" }}>
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => (
                  <Box
                    component="th"
                    key={header.id}
                    sx={{
                      display: "table-cell",
                      cursor: "pointer",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        padding: "0 0.5rem",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {/* <span className="group-hover:opacity-100 opacity-0 transition-opacity"> */}
                      {/* <img src={sort} alt="asc-desc" /> */}
                      {/* </span> */}
                    </Box>
                  </Box>
                ))}
              </tr>
            ))}
          </Box>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows?.map((row) => (
              <Box
                component="tr"
                key={row.id}
                sx={{ borderBottom: "1px solid rgb(209 213 219)" }}
              >
                {row.getVisibleCells()?.map((cell) => (
                  <Box
                    component="td"
                    key={cell.id}
                    sx={{ fontSize: "0.8rem", padding: "0.75rem 0.5rem", textTransform: 'capitalize' }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Box>
            ))}
          </tbody>
        </Box>
      </Box>

      {/* <footer className="flex justify-between mt-5">
        <div className="flex items-center gap-2">
          {table.getCanPreviousPage() && (
            <button
              className="btn inline-flex px-3 gap-3"
              onClick={() => table.previousPage()}
            >
              Prev Page
            </button>
          )}

          {table.getCanNextPage() && (
            <button
              className="btn inline-flex px-3 gap-3"
              onClick={() => table.nextPage()}
            >
              Next Page
            </button>
          )}
        </div>

        <form
          className="flex gap-3 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            table.setPageIndex(e.target.page.value);
          }}
        >
          <span>Page</span>

          <input
            type="number"
            name="page"
            id="page"
            min="0"
            className="inline-block rounded border w-12 py-1 text-center border-b-gray-300"
          />

          <span>of {table.getPageCount()}</span>
        </form>
      </footer> */}
    </Box>
  );
};

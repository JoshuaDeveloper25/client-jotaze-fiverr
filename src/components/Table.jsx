import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Box, Button, TextField } from "@mui/material";

export const Table = ({
  columns,
  data,
  filteringColumn,
  filtering,
  setFiltering,
}) => {
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
      columnFilters: filteringColumn,
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
                    sx={{
                      fontSize: "0.8rem",
                      padding: "0.75rem 0.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Box>
            ))}
          </tbody>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          display: "flex",
          justifyContent: "between",
          marginTop: "2.5rem",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {table.getCanPreviousPage() && (
            <Button onClick={() => table.previousPage()}>Pág Prev</Button>
          )}

          {table.getCanNextPage() && (
            <Button onClick={() => table.nextPage()}>Siguiente Pág</Button>
          )}
        </Box>

        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            table.setPageIndex(e.target.page.value);
          }}
        >
          <span>Página</span>
          <TextField
            sx={{
              display: "inline-block",
              textAlign: "center",
            }}
            size="small"
            type="number"
            name="page"
            id="page"
            min="0"
          />
          <span>de {table.getPageCount()}</span>
        </Box>
      </Box>
    </Box>
  );
};

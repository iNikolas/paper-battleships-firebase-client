import React from "react";
import {
  Paper,
  TablePagination,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
} from "@mui/material";
import { Order } from "./types";
import {
  checkIfSearchIsActive,
  convertDateToString,
  getComparator,
  stableSort,
} from "../../utils";
import {
  EnhancedTableHead,
  OverflowHiddenTableCell,
  TableRowClickable,
} from "./";
import { useStore } from "../../context";
import { GameRequestState } from "../../store/state";
import { useUser } from "reactfire";

export const GamesTable = () => {
  const { data: user } = useUser();
  const {
    state: {
      lobby: { gameRequests },
    },
  } = useStore();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof GameRequestState>("time");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const isActiveSearch = checkIfSearchIsActive(gameRequests, user);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GameRequestState
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - gameRequests.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(gameRequests, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRowClickable
                      isActiveSearch={isActiveSearch}
                      row={row}
                      key={row.uid}
                    >
                      <OverflowHiddenTableCell component="th" scope="row">
                        {row.name}
                      </OverflowHiddenTableCell>
                      <OverflowHiddenTableCell>
                        {row.description}
                      </OverflowHiddenTableCell>
                      <TableCell align="right">
                        {convertDateToString(row.time)}
                      </TableCell>
                    </TableRowClickable>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={gameRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

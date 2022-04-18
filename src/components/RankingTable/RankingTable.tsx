import React from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy as sort, limit } from "firebase/firestore";
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
import { getComparator, stableSort } from "../../utils";
import { EnhancedTableHead } from "../EnhancedTableHead";
import { STATISTIC_HEAD_CELLS } from "../../constants";
import { OnlineIndicator, OverflowHiddenTableCell } from "../";

export const RankingTable = () => {
  const firestore = useFirestore();
  const statisticCollection = collection(firestore, "statistic");
  const statisticQuery = query(
    statisticCollection,
    sort("wins", "desc"),
    limit(100)
  );

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("position");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 15;

  const { data: statisticRawData } = useFirestoreCollectionData(
    statisticQuery,
    {
      idField: "id",
    }
  );

  const statisticData = statisticRawData
    ?.filter((player) => player.gamesPlayed > 0)
    ?.map((player, index) => ({
      id: player.id,
      gamesPlayed: player.gamesPlayed,
      name: player.name,
      position: index,
      winRate: Math.floor((player.wins / player.gamesPlayed) * 100),
    }));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = Math.max(
    0,
    (1 + page) * rowsPerPage - (statisticData?.length || 0)
  );

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper elevation={3}>
        <TableContainer
          sx={{
            p: 1,
            "@media screen and (orientation: landscape)": {
              p: 2,
            },
          }}
        >
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={STATISTIC_HEAD_CELLS}
            />
            <TableBody>
              {stableSort(statisticData, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow sx={{ whiteSpace: "nowrap" }} hover key={index}>
                      <TableCell padding="none" component="th" scope="row">
                        {+row.position + 1}
                      </TableCell>
                      <OverflowHiddenTableCell padding="none">
                        <OnlineIndicator uid={row.id as string} />
                        {` ${row.name}`}
                      </OverflowHiddenTableCell>
                      <TableCell padding="none" align="right">
                        {row.gamesPlayed}
                      </TableCell>
                      <TableCell padding="none" align="right">
                        {row.winRate}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 21 * emptyRows,
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
          count={statisticData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

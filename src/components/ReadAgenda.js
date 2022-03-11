import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
 },
 [`&.${tableCellClasses.body}`]: {
  fontSize: 14,
 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 "&:nth-of-type(odd)": {
  backgroundColor: theme.palette.action.hover,
 },
 // hide last border
 "&:last-child td, &:last-child th": {
  border: 0,
 },
}));

function createData(name, calories, fat, carbs, protein) {
 return { name, calories, fat, carbs, protein };
}

const data = [
 {
  id: 1,
  date: "2022-03-11",
  description: "descriptionn1",
  status: "status",
  title: "title1",
 },
 {
  id: 2,
  date: "2022-03-11",
  description: "descriptionn2",
  status: "status",
  title: "title2",
 },
 {
  id: 3,
  date: "2022-03-11",
  description: "descriptionn3",
  status: "status",
  title: "title3",
 },
];

const rows = [
 createData("Frozen yoghurt", 159, 6.0, 24),
 createData("Ice cream sandwich", 237, 9.0, 37),
 createData("Eclair", 262, 16.0, 24),
 createData("Cupcake", 305, 3.7, 67),
 createData("Gingerbread", 356, 16.0, 49),
];

const useStyles = makeStyles({
 table: {
  marginTop: 100,
 },
});

export default function ReadAgenda() {
 const classess = useStyles();

 return (
  <div>
   <TableContainer component={Paper}>
    <Table
     className={classess.table}
     sx={{ minWidth: 800 }}
     aria-label="customized table"
    >
     <TableHead>
      <TableRow>
       <StyledTableCell>Title</StyledTableCell>
       <StyledTableCell align="right">Status</StyledTableCell>
       <StyledTableCell align="right">Date</StyledTableCell>
       <StyledTableCell align="right">Description</StyledTableCell>
       <StyledTableCell align="center">Actions</StyledTableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {data &&
       data.map((row) => (
        <StyledTableRow key={row.id}>
         <StyledTableCell component="th" scope="row">
          {row.title}
         </StyledTableCell>
         {/* <StyledTableCell align="right">{row.title}</StyledTableCell> */}
         <StyledTableCell align="right">{row.status}</StyledTableCell>
         <StyledTableCell align="right">{row.date}</StyledTableCell>
         <StyledTableCell align="right">{row.description}</StyledTableCell>
         <StyledTableCell align="center">
          <ButtonGroup variant="outlined" aria-label="outlined button group">
           <Link to={`/edit/${row.id}`} style={{ textDecoration: "none" }}>
            <Button color="primary" style={{ marginRight: "6px" }}>
             Edit
            </Button>
           </Link>
           <Button color="secondary">Delete</Button>
          </ButtonGroup>
         </StyledTableCell>
        </StyledTableRow>
       ))}
     </TableBody>
    </Table>
   </TableContainer>
  </div>
 );
}

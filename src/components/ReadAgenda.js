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

const StyledTable = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.common.white,
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

const useStyles = makeStyles({
 table: {
  marginTop: 100,
 },
});

const axios = require("axios");

export default function ReadAgenda() {
 const [agendaData, setAgendaData] = useState([]);
 const classess = useStyles();

 const loadAgenda = (params) => {
  axios
   .get("http://localhost:3001/agenda")
   .then((res) => {
    setAgendaData(res.data);
   })
   .catch((err) => {
    console.log(err.response);
   });
 };

 useEffect(() => {
  loadAgenda();
 }, []);

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
       <StyledTable align="right"></StyledTable>
       <StyledTable align="right"></StyledTable>
       <StyledTable align="right"></StyledTable>
       <StyledTable align="right"></StyledTable>
       <StyledTable align="center">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
         <Link to="/add" style={{ textDecoration: "none" }}>
          <Button color="primary" style={{ marginRight: "6px" }}>
           Add
          </Button>
         </Link>
        </ButtonGroup>
       </StyledTable>
      </TableRow>

      <TableRow>
       <StyledTableCell align="right">Title</StyledTableCell>
       <StyledTableCell align="right">Status</StyledTableCell>
       <StyledTableCell align="right">Date</StyledTableCell>
       <StyledTableCell align="right">Description</StyledTableCell>
       <StyledTableCell align="center">Actions</StyledTableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {agendaData &&
       agendaData.map((row) => (
        <StyledTableRow key={row.id}>
         {/* <StyledTableCell component="th" scope="row">
          {row.title}
         </StyledTableCell> */}
         <StyledTableCell align="right">{row.title}</StyledTableCell>
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

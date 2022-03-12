import React, { useState, useEffect } from "react";
import {
 DataGrid,
 GridToolbarContainer,
 GridToolbarExport,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

const useStyles = makeStyles({
 table: {
  marginTop: 20,
 },
});

const StyledTable = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.white,
 },

 [`&.${tableCellClasses.body}`]: {
  fontSize: 14,
 },
}));

const axios = require("axios");

export default function ExportDefaultToolbar() {
 const [agendaData, setAgendaData] = useState([]);
 const classess = useStyles();

 const renderEditButton = (params) => {
  return (
   <div>
    <ButtonGroup
     key={params.id}
     variant="outlined"
     aria-label="outlined button group"
    >
     <Link to={`/edit/${params.id}`} style={{ textDecoration: "none" }}>
      <Button color="primary" style={{ marginRight: "6px" }}>
       Edit
      </Button>
     </Link>
     <Link to={`/delete/${params.id}`} style={{ textDecoration: "none" }}>
      <Button color="secondary" style={{ marginRight: "6px" }}>
       Delete
      </Button>
     </Link>
    </ButtonGroup>
   </div>
  );
 };

 const columns = [
  {
   field: "title",
   headerName: "Title",
   sortable: false,
   flex: 1,
   disableColumnSelector: true,
  },
  { field: "status", headerName: "Status", sortable: false, flex: 1 },
  { field: "date", headerName: "Date", sortable: false, flex: 1 },
  { field: "description", headerName: "Description", sortable: false, flex: 1 },
  {
   field: "action",
   headerName: "Actions",
   sortable: false,
   flex: 1,
   disableExport: true,
   renderCell: renderEditButton,
   disableClickEventBubbling: true,
  },
 ];

 const loadAgenda = (params) => {
  axios
   .get("http://localhost:3001/agenda")
   .then((res) => {
    setAgendaData(res.data.reverse());
   })
   .catch((err) => {
    console.log(err.response);
   });
 };

 useEffect(() => {
  loadAgenda();
 }, []);

 function CustomToolbar() {
  return (
   <GridToolbarContainer>
    <GridToolbarExport />
   </GridToolbarContainer>
  );
 }

 return (
  <div className={classess.table} style={{ height: 400, width: "100%" }}>
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
       <StyledTable align="right">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
         <Link to="/add" style={{ textDecoration: "none" }}>
          <Button color="primary" style={{ marginRight: "6px" }}>
           Add
          </Button>
         </Link>
        </ButtonGroup>
       </StyledTable>
      </TableRow>
     </TableHead>
    </Table>
   </TableContainer>

   <DataGrid
    pageSize={10}
    rows={agendaData}
    columns={columns}
    disableColumnFilter={true}
    disableDensitySelector={true}
    components={{ Toolbar: CustomToolbar }}
   />
  </div>
 );
}

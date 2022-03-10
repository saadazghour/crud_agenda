import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

const initialValue = {
 title: "",
 status: "",
 description: "",
 date: new Date(),
};

export default function AddAgenda() {
 const [values, setValues] = useState(initialValue);
 const [selectedDate, handleDateChange] = useState(initialValue.date);

 const handleChange = (event) => {
  const { name, value } = event.target;

  setValues({
   ...values,
   [name]: value,
  });
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Agenda Registred!!");
 };

 return (
  <div>
   <Box
    component="form"
    sx={{
     "& .MuiTextField-root": { m: 2, width: "25ch" },
    }}
    noValidate
    autoComplete="off"
   >
    <div>
     <TextField
      id="outlined-textarea"
      label="Title"
      placeholder="Title"
      multiline
      name="title"
      value={values.title}
      onChange={handleChange}
     />
    </div>
    <div>
     <TextField
      id="outlined-textarea"
      label="Status"
      placeholder="Status"
      multiline
      name="status"
      value={values.status}
      onChange={handleChange}
     />
    </div>
    <div>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       label="Date :"
       value={selectedDate}
       onChange={handleDateChange}
       renderInput={(props) => <TextField {...props} />}
      />
     </LocalizationProvider>
    </div>
    <div>
     <TextField
      id="outlined-multiline-static"
      label="Description"
      multiline
      name="description"
      rows={4}
      value={values.description}
      onChange={handleChange}
     />
    </div>
   </Box>
   <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    mt={2}
    mb={4}
    spacing={4}
   >
    <Button variant="outlined" onClick={handleSubmit}>
     Register
    </Button>
   </Stack>
  </div>
 );
}

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import moment from "moment";
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
 const [errors, setErrors] = useState({});
 const [isSubmit, setIsSubmit] = useState(false);

 const handleChange = (event) => {
  const { name, value } = event.target;

  setValues({
   ...values,
   [name]: value,
  });
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  setErrors(validate(values));
  setIsSubmit(true);
 };

 useEffect(() => {
  if (Object.keys(errors).length === 0 && isSubmit) {
   console.log("values", values);
   console.log("Date", moment(selectedDate).format("YYYY-MM-DD"));
  }
 }, [errors]);

 const validate = (value) => {
  const errors = {};

  if (!value.title) {
   errors.title = "Title is Required!";
  }
  if (!value.status) {
   errors.status = "Status is Required!";
  }
  if (!value.description) {
   errors.description = "Description is Required!";
  }
  if (!value.date) {
   errors.date = "Date is Required!";
  }
  return errors;
 };

 return (
  <div>
   {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
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
      error={errors.title ? true : false}
      helperText={errors.title ? errors.title : ""}
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
      error={errors.status ? true : false}
      helperText={errors.status ? errors.status : ""}
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
       error={errors.date ? true : false}
       helperText={errors.date ? errors.date : ""}
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
      error={errors.description ? true : false}
      helperText={errors.description ? errors.description : ""}
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

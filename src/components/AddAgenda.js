import React, { useState } from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initialValue = {
 title: "",
 status: "",
 description: "",
 date: new Date(),
};

const useStyles = makeStyles({
 table: {
  marginTop: 100,
 },
});

const axios = require("axios");

export default function AddAgenda() {
 const [values, setValues] = useState(initialValue);
 const [selectedDate, handleDateChange] = useState(initialValue.date);
 const [errors, setErrors] = useState({});
 const [isSubmit, setIsSubmit] = useState(false);
 const [open, setOpen] = useState(true);
 const classess = useStyles();

 const handleChange = (event) => {
  const { name, value } = event.target;

  const newValues = {
   ...values,
   [name]: value,
  };

  setValues(newValues);
  setErrors(validate(newValues));
 };

 const navigate = useNavigate();

 const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
   title: values.title,
   status: values.status,
   date: moment(selectedDate).format("YYYY-MM-DD"),
   description: values.description,
  };

  const err = validate(values);

  if (Object.keys(err).length === 0 && !isSubmit) {
   setIsSubmit(true);
   axios
    .post("http://localhost:3001/agenda", data)
    .then((res) => {
     setIsSubmit(false);

     setValues({
      title: "",
      status: "",
      description: "",
      date: new Date(),
     });

     setTimeout(() => {
      navigate("/");
     }, 1000);
    })
    .catch((err) => {
     setErrors(err.response);
     setIsSubmit(false);
    });
  }
 };

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

   {Object.keys(errors).length === 0 && isSubmit ? (
    <Collapse in={open}>
     <Alert
      action={
       <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
         setOpen(false);
        }}
       >
        <CloseIcon fontSize="inherit" />
       </IconButton>
      }
      sx={{ mb: 2 }}
     >
      Added successfully!!
     </Alert>
    </Collapse>
   ) : (
    ""
   )}
   <Box
    component="form"
    sx={{
     "& .MuiTextField-root": { m: 2, width: "25ch" },
    }}
    noValidate
    autoComplete="off"
   >
    <div className={classess.table}>
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
      required
      focused
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
      required
      focused
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
      required
      focused
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
    <Link to="/" style={{ textDecoration: "none" }}>
     <Button variant="outlined" color="error">
      Cancel
     </Button>
    </Link>
   </Stack>
  </div>
 );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./AddEmployee.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core/";
const genders = [
  {
    value: "male",
    label: "Male"
  },
  {
    value: "female",
    label: "Female"
  }
];

const statuses = [
  {
    value: "active",
    label: "Active"
  },
  {
    value: "inactive",
    label: "Inactive"
  }
];
const streams = [
  {
    value: "a",
    label: "A"
  },
  {
    value: "b",
    label: "B"
  }
];
const roles = [
  {
    value: "admin",
    label: "Admin"
  },
  {
    value: "employee",
    label: "Employee"
  }
];
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.9),
      width: "100%",
      padding: theme.spacing(0.9),
      flexGrow: 1
    }
  },
  fieldWidth: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(0.9),
    minWidth: 140
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddEmployee = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [Snackopen, setSnackOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [status, setStatus] = useState("active");
  const [role, setRole] = useState("employee");
  const [gender, setGender] = useState("male");
  const [stream, setStream] = useState("a");
  let [doj, setDoj] = useState(new Date());
  let [dob, setDob] = useState(new Date());
  let [doa, setDoa] = useState(new Date());

  // const url = "http://localhost:5000/employee";
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios.get(url).then(json => setData(json.data));
  // }, []);

  // const [approver, setApprover] = useState([data.firstName]);
  const handleStatusChange = event => {
    setStatus(event.target.value);
  };
  const handleRoleChange = event => {
    setRole(event.target.value);
  };
  const handleGenderChange = event => {
    setGender(event.target.value);
  };
  const handleStreamChange = event => {
    setStream(event.target.value);
  };
  const handleDobChange = event => {
    setDob(event);
  };
  const handleDojChange = event => {
    setDoj(event);
  };
  const handleDoaChange = event => {
    setDoa(event);
  };
  // const handleApproverChange = event => {
  //   setApprover(event.target.value);
  //   console.log(approver);
  // };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
  const history = useHistory();

  const loadAnotherPage = page => {
    switch (page) {
      case "employeeManager":
        history.push("/employeeManager");
        break;
      default:
        history.push("/");
        break;
    }
  };
  const onSubmit = data => {
    let obj = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      empId: Number(data.empId),
      doj: doj.toISOString(),
      role: role.toLowerCase(),
      approver: data.approver,
      status: status.toLowerCase(),
      gender: gender.toLowerCase(),
      password: data.Password
      // doa: "doa.toISOString()",
      // stream: stream.toLowerCase(),
      // dob: dob.toISOString(),
      // mobileNo: data.mobileNo,
      // emergencyName: data.emergencyName,
      // emergencyContact: data.emergencyContact,
      // confirmPassword: data.confirmPassword
    };
    // if (obj.password !== obj.confirmPassword) {
    //   console.log("password error");
    //   setWarningMsg("Password must be same");
    //   setWarningOpen(true);
    // }
    // if (obj.password === obj.confirmPassword) {
    //   console.log("password same");
    //   setSnackOpen(true);
    // }
    console.log(obj);
    axios
      .post("http://localhost:5000/employee", obj)
      .then(res => {
        console.log("Employee added");
        setSnackOpen(true);
      })
      .catch((err, data) => {
        setWarningMsg("Error while adding employee");
        setWarningOpen(true);
        console.log("error while adding");
        console.log(err.response);
      });
  }; // your form submit function which will invoke after successful validation

  return (
    <div>
      <Grid container xs={12}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.root}
          noValidate
          autoComplete="off"
          id="addempform"
        >
          <Grid item xs={3}>
            <TextField
              id="filled-error-helper-text"
              inputRef={register({
                required: true,
                minLenth: 3,
                maxLength: 50
              })}
              label="First name"
              variant="outlined"
              name="firstName"
              required
              className={classes.fieldWidth}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({ maxLength: 50 })}
              label="Middle name"
              variant="outlined"
              name="middleName"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({
                required: true,
                minLenth: 3,
                maxLength: 50
              })}
              label="Last name"
              variant="outlined"
              name="lastName"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              inputRef={register({
                required: true,
                maxLength: 50
              })}
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              required
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-select"
              select
              required="true"
              label="Gender"
              value={gender}
              onChange={handleGenderChange}
              variant="outlined"
            >
              {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2} className="date-padding">
            <MuiPickersUtilsProvider
              utils={MomentUtils}
              className="date-padding"
            >
              <KeyboardDatePicker
                required
                margin="normal"
                id="dob"
                label="Date of birth"
                format="DD/MM/YYYY"
                value={dob}
                style={{ paddingTop: 0 }}
                onChange={handleDobChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({ maxLength: 10 })}
              label="Mobile no."
              variant="outlined"
              name="mobileNo"
              type="number"
            />
          </Grid>
          <hr style={{ padding: 0 }}></hr>
          <Grid item xs={2}>
            <TextField
              id="outlined-required"
              inputRef={register({ required: true, maxLength: 3 })}
              label="Employee id"
              variant="outlined"
              name="empId"
              type="number"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                required
                id="dob"
                label="Date of joining"
                format="DD/MM/YYYY"
                value={doj}
                onChange={handleDojChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disabled
                style={{ padding: 0 }}
                margin="normal"
                id="dob"
                label="Date of leaving"
                format="DD/MM/YYYY"
                value={doa}
                onChange={handleDoaChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-select"
              select
              required="true"
              label="Status"
              value={status}
              onChange={handleStatusChange}
              variant="outlined"
            >
              {statuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-select"
              select
              required="true"
              label="Stream"
              value={stream}
              onChange={handleStreamChange}
              variant="outlined"
            >
              {streams.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({ maxLength: 50 })}
              label="Approver"
              variant="outlined"
              name="approver"
            />
            {/* <TextField
              id="outlined-select"
              select
              required="true"
              label="Approver"
              value={approver}
              onChange={handleApproverChange}
              variant="outlined"
            >
              {data.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.firstName}
                </MenuItem>
              ))}
            </TextField> */}
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-select"
              select
              required="true"
              label="Role"
              value={role}
              onChange={handleRoleChange}
              variant="outlined"
            >
              {roles.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <hr style={{ padding: 0 }}></hr>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({ maxLength: 50 })}
              label="Emergency contact name"
              variant="outlined"
              name="emergencyName"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              inputRef={register({ maxLength: 10 })}
              label="Emergency contact no."
              variant="outlined"
              name="emergencyContact"
              type="number"
            />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="outlined-required"
              inputRef={register({ required: true, maxLength: 50 })}
              label="Password"
              variant="outlined"
              name="Password"
              type="password"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="outlined-required"
              inputRef={register({ required: true, maxLength: 50 })}
              label="Confirm password"
              variant="outlined"
              name="confirmPassword"
              type="password"
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              id="saveButton"
              style={{ color: "white" }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              id="cancelButton"
              onClick={() => {
                loadAnotherPage("employeeManager");
              }}
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={Snackopen}
        autoHideDuration={1500}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          Employee Added
        </Alert>
      </Snackbar>
      <Snackbar
        open={warningOpen}
        autoHideDuration={1500}
        onClose={() => {
          setWarningOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setWarningOpen(false);
          }}
          severity="error"
        >
          {warningMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddEmployee;

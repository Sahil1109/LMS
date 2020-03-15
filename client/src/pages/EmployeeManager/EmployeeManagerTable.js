import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./EmployeeManager.css";
import axios from "axios";
// import RootURL from "../../handlers/RootUrl";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import getStringDate from "../../handlers/StringData";

export default function EmployeeManagerTable() {
  const url = "http://localhost:5000/employee";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
  }, []);

  const renderTable = () => {
    return data.map(user => {
      return (
        <tr>
          <td>{user.empId}</td>
          <td>
            {user.firstName} {user.middleName} {user.lastName}
          </td>
          <td>{getStringDate(user.doj)}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>
            {
              <Link style={{ cursor: "pointer" }}>
                <EditIcon />
              </Link>
            }
          </td>
        </tr>
      );
    });
  };
  const history = useHistory();

  const loadAnotherPage = page => {
    switch (page) {
      case "addEmployee":
        history.push("/addEmployee");
        break;
      case "editEmployee":
        history.push("/editEmployee");
        break;
      default:
        history.push("/");
        break;
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item={1}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            id="saveButton"
            style={{ color: "white", marginTop: "5px", marginLeft: "5px" }}
            onClick={() => {
              loadAnotherPage("addEmployee");
            }}
          >
            ADD EMPLOYEE
          </Button>
        </Grid>
        <Grid item={1}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            id="saveButton"
            style={{ color: "white", marginTop: "5px", marginLeft: "5px"}}
            onClick={() => {
              loadAnotherPage("editEmployee");
            }}
          >
            EDIT EMPLOYEE
          </Button>
        </Grid>
      </Grid>
      <div id="tableEmp">
        <table>
          <thead>
            <tr id="thrEmp">
              <th>Employee ID</th>
              <th>Employee name</th>
              <th>Date of joining</th>
              <th>Role</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useContext, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core/";
import LeaveList from "../../components/LeaveList/LeaveList";
import LeaveTable from "../../components/LeaveTable/LeaveTable";
import Charts from "../../components/Charts/Charts"
//importing contexts
import { EmpIdContext } from "../../contexts/EmpId/EmpIdContext";
import { EmployeeContext } from "../../contexts/Emp/EmployeeContext";
import { HistoryContext } from "../../contexts/History/HistoryContext";
//import axios
import axios from "axios";
import RootURL from "../../handlers/RootUrl";

export default function EmpDashboard() {
  let [empid, setEmpid] = useContext(EmpIdContext);
  let [empInfo, setEmpInfo] = useContext(EmployeeContext);
  let [history, setHistory] = useContext(HistoryContext);

  const getEmpInfo = () => {
    axios
      .get(`${RootURL}/employee/${empid._id}`)
      .then(res => {
        console.log("emp info", res.data);
        sessionStorage.setItem("empinfo", JSON.stringify(res.data));
        setEmpInfo(res.data);
      })
      .catch(err => {
        console.log("error while fetching emp info");
      });
  };

  const getHistory = () => {
    axios
      .get(`${RootURL}/leaves/employee/${empid._id}/111`)
      .then(res => {
        setHistory(res.data);
      })
      .catch(err => {
        console.log(err.response)
      });
  };

  useEffect(() => {
    console.log("mounting................");
    console.log("value of empid while mounting", empid);
    getEmpInfo();
    getHistory();
  }, []);

  return (
    <div style={{ height: "90vh", boxSizing: "border-box", padding: "5px" }}>
      {/*spacing here adjusts margin between 2 rows which by default is 8px*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LeaveList />
        </Grid>
        <Grid item xs={6}>
          {/*here i ahve set the height because otherwise it was getting shorter or longer
            them leave list table , so it is set dynamically*/}
          <Paper align="center" style={{height:"210px", boxSizing:"border-box", padding:"8px"}}>
            <Charts/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <LeaveTable />
        </Grid>
      </Grid>
    </div>
  );
}

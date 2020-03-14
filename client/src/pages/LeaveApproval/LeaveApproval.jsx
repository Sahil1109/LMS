import React, { useContext, useEffect } from "react";
import { Grid, Paper, Box } from "@material-ui/core/";
import PendingTable from "../../components/PendingTable/PendingTable";
import ApprovedTable from "../../components/ApprovedTable/ApprovedTable";
//getting contexts
import { ApprovalHistoryContext } from "../../contexts/AprrovalHistory/ApprovalHistoryContext";
import { EmpIdContext } from "../../contexts/EmpId/EmpIdContext";
import RootURL from "../../handlers/RootUrl";
import axios from "axios";

const LeaveApproval = () => {
  let [ahistory, setAhistory] = useContext(ApprovalHistoryContext);
  let [empid, setEmpid] = useContext(EmpIdContext);

  const getAhistory = () => {
    axios
      .get(`${RootURL}/leaves/approver/${empid._id}/111`)
      .then(res => {
        setAhistory(res.data);
        console.log("approval history:", ahistory);
      })
      .catch(err => {
        console.log("error while fetching emp history");
      });
  };
  useEffect(() => {
    getAhistory();
  }, []);
  return (
    <div style={{ height: "90vh", boxSizing: "border-box", padding: "5px" }}>
      {/*spacing here adjusts margin between 2 rows which by default is 8px*/}
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Paper elevation={1} style={{ padding: "8px" }}>
            <Box
              component="span"
              style={{ fontWeight: "bold", color: "#700688" }}
            >
              Pending Table
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <PendingTable />
        </Grid>
        <Grid xs={12}>
          <Paper elevation={1} style={{ padding: "8px" }}>
            <Box
              component="span"
              style={{ fontWeight: "bold", color: "#700688" }}
            >
              Approved Table
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ApprovedTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaveApproval;

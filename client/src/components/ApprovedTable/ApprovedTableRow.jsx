import React from "react";
import { TableCell, TableRow,Paper } from "@material-ui/core/";
import getStringDate from '../../handlers/StringData'
import stringCap from "../../handlers/stringCap"
import { styled } from "@material-ui/core/styles";
const ApprovedTableRow = props => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {stringCap(props.row.leaveType)}
      </TableCell>
      <TableCell align="right">{stringCap(props.row.firstName)}</TableCell>
      <TableCell align="right">{getStringDate(props.row.startDate)}</TableCell>
      <TableCell align="right">{getStringDate(props.row.endDate)}</TableCell>
      <TableCell align="right">{props.row.noofdays}</TableCell>
      <TableCell align="center">
      {props.row.status==="approved"?<ApprovedPaper elevation={2}>Approved</ApprovedPaper>:<RejectPaper elevation={2}>Rejected</RejectPaper>}
      </TableCell>
    </TableRow>
  );
};



const ApprovedPaper =styled(Paper)(({theme})=>({
    padding:"0.4rem",
    fontSize:"0.6rem",
    color:"white",
    background:"#32cb00",
    textAlign:"center"
}))

const RejectPaper=styled(Paper)(({theme})=>({
    padding:"0.4rem",
    fontSize:"0.6rem",
    color:"white",
    background:"#a30000",
    textAlign:"center"
}))

export default ApprovedTableRow;

import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Link,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core/";
import { styled } from "@material-ui/core/styles";
import getStringDate from "../../handlers/StringData";
import stringCap from "../../handlers/stringCap";
const PendingTableRow = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  let [id, setId] = useState(null);
  let [status, setStatus] = useState(null);
  const handleClick = (_id,_status) => {
    setId(_id);
    setStatus(_status);
    setDialogOpen(true);
  };
  const handleSubmitReason = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.elements)
    props.onStatusChange(id,status)
    setId(null);
    setStatus(null);
    setDialogOpen(false);
  };
  const handleClose=(event)=>{
    setId(null);
    setStatus(null);
    setDialogOpen(false);
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {stringCap(props.row.leaveType)}
      </TableCell>
      <TableCell align="center">{stringCap(props.row.firstName)}</TableCell>
      <TableCell align="center">{getStringDate(props.row.startDate)}</TableCell>
      <TableCell align="center">{getStringDate(props.row.endDate)}</TableCell>
      <TableCell align="center">{props.row.daysCount}</TableCell>
      <TableCell align="center">
        <AcceptButton
          variant="contained"
          onClick={() => {
            handleClick(props.row.id, "approved");
          }}
        >
          Accept
        </AcceptButton>
        <RejectButton
          variant="contained"
          onClick={() => {
            handleClick(props.row.id, "rejected");
          }}
        >
          Reject
        </RejectButton>
      </TableCell>
      <Dialog
        open={dialogOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the reason for why are you accepting or rejecting the current leave application.
          </DialogContentText>
          <form onSubmit={handleSubmitReason}>
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              name="reason"
              label="Reason"
              type="text"
              fullWidth
            />

            <DialogActions>
              <Button type="submit"  color="primary">
                Submit
              </Button>
              <Button onClick={handleClose}  color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
};

const AcceptButton = styled(Button)(({ theme }) => ({
  padding: "0.4rem",
  fontSize: "0.5rem",
  color: "white",
  background: "#32cb00"
}));

const RejectButton = styled(Button)(({ theme }) => ({
  padding: "0.4rem",
  fontSize: "0.5rem",
  color: "white",
  background: "#a30000",
  marginLeft: "2px"
}));

export default PendingTableRow;

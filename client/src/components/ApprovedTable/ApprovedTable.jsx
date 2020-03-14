import React,{useContext}from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, styled } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper
} from "@material-ui/core/";
import ApprovedTableRow from "./ApprovedTableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
//getting context
import {ApprovalHistoryContext} from '../../contexts/AprrovalHistory/ApprovalHistoryContext'

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    maxWidth: 1000
  }
});

const ApprovedTable=()=>{
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  let [ahistory,setAhistory]=useContext(ApprovalHistoryContext)
  let emptyRows=null 
  const setEmptyRows=()=>{
    emptyRows =rowsPerPage - Math.min(rowsPerPage, ahistory.length - page * rowsPerPage);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    ahistory===undefined?null:
    <TableContainer component={Paper}>
      {setEmptyRows()}
      <Table aria-label="custom pagination table">
        <CustomHeader>
          <TableRow>
            <CustomHeaderCell>Leave Type</CustomHeaderCell>
            <CustomHeaderCell align="right">Employee Name</CustomHeaderCell>
            <CustomHeaderCell align="right">From Date</CustomHeaderCell>
            <CustomHeaderCell align="right">To Date</CustomHeaderCell>
            <CustomHeaderCell align="right">No. of Days</CustomHeaderCell>
            <CustomHeaderCell align="center">Status</CustomHeaderCell>
          </TableRow>
        </CustomHeader>
        <TableBody>
          {(rowsPerPage > 0
            ? ahistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : ahistory
          ).map(row => {
            if(row.status!=="pending"){
              return <ApprovedTableRow key={ahistory.indexOf(row)} row={row}/>
            }else{
              return
            }
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 4]}
              colSpan={3}
              count={ahistory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default ApprovedTable

const CustomHeader = styled(TableHead)(({ theme }) => ({
  background: theme.palette.primary.light
}));

const CustomHeaderCell = styled(TableCell)(({ theme }) => ({
  color:"white",
  fontWeight:"bold",
  padding:"0.5rem"
}));



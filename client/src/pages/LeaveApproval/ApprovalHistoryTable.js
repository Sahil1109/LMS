import React,{useContext}from "react";
import "./ApprovalHistoryTable.css";
import ApprovalHistoryEntry from './ApprovalHistoryEntry'

//getting context
import {ApprovalHistoryContext} from '../../contexts/AprrovalHistory/ApprovalHistoryContext'

function ApprovalHistory() {
  let [ahistory,setAhistory]=useContext(ApprovalHistoryContext)
  const getRows = () => {
    let rev_ahist=ahistory.reverse() 
    return rev_ahist.map(entry => {
        console.log('checking enrty',entry)
        if(entry.status!=='pending'){
          
          return (<ApprovalHistoryEntry id={entry._id} entry={entry}></ApprovalHistoryEntry>)
        }else{
          return
        }
        
      
    });
  };
  return (
    ahistory===undefined?null:
    <div>
      <h3 id="approvalHeading">APPROVAL HISTORY</h3>
      <div id="tableApproval">
        <table>
          <tr id="thr">
            <th>Leave Type</th>
            <th>Employee Name</th>
            <th>From</th>
            <th>To</th>
            <th>No. of Days</th>
            <th>Status</th>
          </tr>
          {getRows()}
        </table>
      </div>
    </div>
  );
}

export default ApprovalHistory;

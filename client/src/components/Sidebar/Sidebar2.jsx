import React, { useState,useContext} from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Icon
} from "@material-ui/core/"; 
import { styled } from "@material-ui/styles/";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import TodayIcon from "@material-ui/icons/Today";
import { useHistory , useLocation } from "react-router-dom";
import {EmpIdContext} from '../../contexts/EmpId/EmpIdContext'

export default function Sidebar2(props) {
  let [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (e, index,pageName) => {
    setSelectedIndex(index);
    loadAnotherPage(pageName)
  };
  /*previous version */
  //getting location
  let location=useLocation()
  //Using routing to link logout button and apply leave button
  const history = useHistory();
  //getting employee information
  let [empid,]=useContext(EmpIdContext)
  let role=empid.role
  const loadAnotherPage=(page)=>{
    switch(page){
      case 'dashboard':
        history.push("/");
        break;
      case 'applyLeave':
        history.push("/addLeave");
        break;
      case 'leaveApproval':
        history.push('/leaveApproval')
        break;
        case 'employeeManager':
          history.push('/employeeManager')
          break;
      default:
        history.push("/");
        break;
    }
  }
  return (
    <div id="sidebar">
      <Sidebar component="nav">
        <LmsListItem
          button
          selected={location.pathname==='/'?true:false}
          onClick={event => handleListItemClick(event, 0,'dashboard')}
          color="primary"
        >
          <ListItemIcon>
            <Icon className="selected">
              <DashboardIcon />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </LmsListItem>
        <LmsListItem
          button
          selected={location.pathname==='/addLeave'?true:false}
          onClick={event => handleListItemClick(event, 1,'applyLeave')}
        >
          <ListItemIcon>
            <Icon className="selected">
              <AddCircleIcon />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Leave Apply" />
        </LmsListItem>
        <LmsListItem
          button
          selected={location.pathname==='/leaveApproval'?true:false}
          onClick={event => handleListItemClick(event, 2,'leaveApproval')}
        >
          <ListItemIcon>
            <Icon className="selected">
              <DoneAllIcon />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Leave Approval" />
        </LmsListItem>
        {role==='admin'?<><Divider />
        <LmsListItem
          button
          selected={location.pathname==='/employeeManager'?true:false}
          onClick={event => handleListItemClick(event, 3,'employeeManager')}
        >
          <ListItemIcon>
            <Icon className="selected">
              <PersonAddIcon />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Add/Edit Employee" />
        </LmsListItem>
        <LmsListItem
          button
          selected={location.pathname==='/lm'?true:false}
          onClick={event => handleListItemClick(event, 4,'applyLeave')}
        >
          <ListItemIcon>
            <Icon className="selected">
              <TodayIcon />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Leave Management" />
        </LmsListItem></>:''}
      </Sidebar>
    </div>
  );
}

const LmsListItem = styled(ListItem)(({theme})=>({
  "&.Mui-selected": {
    background:theme.palette.primary.main,
    color: "white"
  },
  "&.Mui-selected .selected": {
    color: "white"
  }
}));

const Sidebar = styled(List)(({ theme }) => ({
  
  height: "90vh",
  boxSizing: "border-box",
  color: theme.palette.primary.main,
  background: "#fff",
  boxShadow:" 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
}));

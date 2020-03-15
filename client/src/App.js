import React, { useContext } from "react";
//Fixed components
import Sidebar2 from './components/Sidebar/Sidebar2'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
//Pages
import EmpDashboard from "./pages/EmpDashboard/EmpDashboard";
import Login from "./pages/Login/Login";
import LeaveApproval from './pages/LeaveApproval/LeaveApproval'
import ApplyLeave from './pages/ApplyLeave/ApplyLeave'
import EmployeeManager from './pages/EmployeeManager/EmployeeManager'
//css file import
import "./App.css";

//Reducer import
import { connect } from "react-redux";
//Router import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//importing providers
import { EmpIdContext } from "./contexts/EmpId/EmpIdContext";



import AddEmployee from "./pages/EmployeeManager/AddEmployee/AddEmployee"
function App(props) {
  let [empid, setEmpid] = useContext(EmpIdContext);
  console.log('context value:',empid)
  console.log('session value',sessionStorage.getItem('empid'))

  return empid != null? (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div className="App" id="app">
        <div id="top">
          <Navbar/>
        </div>

        <div id="main">
          <Sidebar2/>

          <div>
            <Switch>
            <Route exact path="/">
                <EmpDashboard />
              </Route>
              <Route exact path="/addLeave">
                <ApplyLeave/>
              </Route>
              <Route exact path="/leaveApproval">
                <LeaveApproval/>
              </Route>
              <Route exact path="/addEmployee">
                <AddEmployee></AddEmployee>
              </Route>
              <Route exact path="/employeeManager">
                <EmployeeManager></EmployeeManager>
              </Route>
            </Switch>
          </div>
          
         
        </div>
        <Footer/>
      </div>
    </Router>
  ) : (
    <Login />
  );
}

export default App;

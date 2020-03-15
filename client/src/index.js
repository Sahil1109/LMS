import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { EmpIdProvider } from "./contexts/EmpId/EmpIdContext";
import { EmployeeProvider } from "./contexts/Emp/EmployeeContext";
import { HistoryProvider } from "./contexts/History/HistoryContext";
import { ApprovalHistoryProvider } from "./contexts/AprrovalHistory/ApprovalHistoryContext";
import theme from "./Theme/theme";
import { ThemeProvider } from "@material-ui/styles/";

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ApprovalHistoryProvider>
        <EmpIdProvider>
          <EmployeeProvider>
            <HistoryProvider>
              <App />
            </HistoryProvider>
          </EmployeeProvider>
        </EmpIdProvider>
      </ApprovalHistoryProvider>
    </ThemeProvider>,
  document.getElementById("root")
);

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Paper from "@material-ui/core/Paper";

const data = [
  {
    name: "June",
    leaves:3
  },
  {
    name: "July",
    leaves:2
  },
  {
    name: "August",
    leaves:5
  },
  {
    name: "September",
    leaves:3
  },
  {
    name: "October",
    leaves:1
  },
  {
    name: "November",
    leaves:2
  }
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";

  render() {
    return (
        <BarChart
          width={400}
          height={200}
          data={data}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="leaves" fill="#48A8E8" />
        </BarChart>
    );
  }
}

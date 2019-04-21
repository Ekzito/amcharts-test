import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ChartXY extends Component {

  componentDidMount() {
    let chartXY = am4core.createFromConfig({
      "data" : this.props.data,

      "xAxes": [{ //настройка оси X
        "type": "CategoryAxis",
        "title": {
          "text": "People"
        },
        "dataFields": {
          "category": "name",
        },
        "renderer": {
          "minGridDistance": 1,
        },
      }],
      "yAxes": [{ //настройка оси Y
        "type": "ValueAxis",
        "title": {
          "text": "Age (years)"
        },
      }],

      "series": [{
        "name": "Stats",
        "type": "ColumnSeries",
        "dataFields": {
          "valueY": "age",
          "categoryX": "name",
        },
        "columns": { //Настройка колонок
          "tooltipText": "Name: {categoryX}\nAge: {valueY}", //всплывающая подсказка при наведении
          "fill": "#104547",
        },
      }],
    }, "chartXYdiv", am4charts.XYChart);

  }

  componentWillUnmount() {
    if (this.chartXY) {
      this.chartXY.dispose();
    }
  }

  render() {
    return (
      <div 
      ref={chartXY => (this.chartXY = chartXY)} 
      id="chartXYdiv" 
      style={{ width: "50%", height: "600px" }}/>
    );
  };
};

export default ChartXY;

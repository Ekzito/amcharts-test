import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ChartPie extends Component {

  splitByAge = (people) => {
    let overThirtyYearOlds = [];
    let underThirtyYearOlds = [];
    let minors = [];

    for (let i = 0; i < people.length; i++) {
      people[i].age >= 30 && overThirtyYearOlds.push(people[i]);
      (people[i].age < 30 && people[i].age >= 18) && underThirtyYearOlds.push(people[i]);
      people[i].age < 18 && minors.push(people[i]);
    }

    return { overThirtyYearOlds, underThirtyYearOlds, minors };
  }

  componentDidMount() {
    let { overThirtyYearOlds, underThirtyYearOlds, minors } = this.splitByAge(this.props.data);

    let chartPie = am4core.createFromConfig({

      "series": [{ //Основные настройки диаграммы
        "type": "PieSeries",
        "dataFields": {
          "value": "countPeople",
          "category": "ageCategory",
        },
        "colors":{
          "step": 5,
        },
        "slices": { //Настройка частей диаграммы
          // "tooltipText": "{category}: {value.value}", //текст всплывающих подсказок
          "stroke": "#00000f",
          "fillOpacity": 1, //Необходимо установить, чтобы после того, как курсов будет убран из выделенной части, заливка вернулась
          "strokeWidth": 1,
          "strokeOpacity": 2,
          "states": { //Настройка различных состояний
            "hover": {
              "properties": {
                "scale": 1.1,
                "fillOpacity": 0.5,
              }
            },
            "active": {
              "properties": {
                "shiftRadius": 0, //Удалить радиус отступа куска диаграммы при нажатии
              }
            },
          }
        },
        "innerRadius": "40%", //Радиус внутреннего отступа
        "labels": {
          "disabled": true, //Удалить подсказки, отображающие значение частей диаграммы
          //"text": "{category}: {value.value}" - текст подсказок
        }
      },],

      "data": [{
        "ageCategory": "Over 30 age",
        "countPeople": overThirtyYearOlds.length,
      }, {
        "ageCategory": "18-30 age",
        "countPeople": underThirtyYearOlds.length,
      }, {
        "ageCategory": "Under 18 age",
        "countPeople": minors.length,
      }],

      "legend": {
        "type": "Legend",
        "position":"right",
        "valueLabels": {
          // "text": "{value}"
        },
      },
    }, "chartPiediv", am4charts.PieChart);

  }

  componentWillUnmount() {
    if (this.chartPie) {
      this.chartPie.dispose();
    }
  }

  render() {
    return (
      <div 
        ref={chartPie => (this.chartPie = chartPie)} 
        id="chartPiediv" 
        style={{ width: "50%", height: "600px" }}/>
    );
  };
};

export default ChartPie;

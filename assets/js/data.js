$(document).ready(function() {

  $.getJSON('https://covidapi.info/api/v1/global')
    .then(function(summary) {
      const {
        confirmed,
        deaths,
        recovered
      } = summary.result;

      $('.infoCard:nth-child(1) .number').append(`${formatNumber(confirmed)}`);
      $('.infoCard:nth-child(2) .number').append(`${formatNumber(deaths)}`);
      $('.infoCard:nth-child(3) .number').append(`${formatNumber(recovered)}`);
  })

  $.getJSON('https://covidapi.info/api/v1/global/count')
    .then(function(dateCount) {
      const result = dateCount.result;
      const keys = Object.keys(result);
      const values = Object.values(result);

      let recoveredCaseArr = [];
      values.forEach(function(value, i) {
        recoveredCaseArr.push({y: keys[i], a: value.recovered})
      })

      let infectedCaseArr = [];
      values.forEach(function(value, i) {
        infectedCaseArr.push({y: keys[i], a: value.confirmed})
      })

      lineChartData(infectedCaseArr, 'morris-line-global-infected', 'Infected', ['#f9c851']);
      lineChartData(recoveredCaseArr, 'morris-line-global-recovered', 'Recovered', ['#10c469']);

    })

})

$.getJSON('https://api.covid19api.com/summary')
  .then(function(data) {
    const rawData = data.Countries;
    const newData = rawData.map(function(d) {
      return {country: d.Country, confirmed: d.TotalConfirmed, recovered: d.TotalRecovered, death: d.TotalDeaths, newConfirmed: d.NewConfirmed, newDeaths: d.NewDeaths, newRecovered: d.NewRecovered}
    })
    newData.forEach(function(data, index) {
      $('#countryData').append(`<tr>
          <td>${index + 1}</td>
          <td>${data.country}</td>
          <td>${data.confirmed}</td>
          <td>${data.recovered}</td>
          <td>${data.death}</td>
      </tr>`);

      $('#countryNewData').append(`<tr>
          <td>${index + 1}</td>
          <td>${data.country}</td>
          <td>${data.newConfirmed}</td>
          <td>${data.newRecovered}</td>
          <td>${data.newDeaths}</td>
      </tr>`);
    })
  })

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function lineChartData(data, id, labels, lineColors) {
  return Morris.Line({
    element: id,
    data: data,
    xkey: "y",
    ykeys: ["a"],
    labels: [labels],
    fillOpacity: ["0.9"],
    pointFillColors: ["#ffffff"],
    pointStrokeColors: ["#999999"],
    behaveLikeLine: !0,
    gridLineColor: "#ffffff",
    hideHover: "true",
    resize: !0,
    pointSize: 0,
    gridTextColor: "#ffffff",
    lineColors: lineColors
  });
}

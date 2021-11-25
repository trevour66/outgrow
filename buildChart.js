function buildCharts(catData, topFiveArr, userData) {
  
  let emailOption = {
    attachment: null,
    headerChartImage: null,
    topFive: [],
    name: userData.name,
    email: userData.email
  }

  // Get full Chart  
  let fullChartImage = generateChart(catData)

  // Get top five Chart
  if(topFiveArr){
    topFiveArr.forEach(e => {
      // topFive[e] = catData[e]
      emailOption.topFive.push(catData[e])
    })
  }

  // Ensure top five array is sorted in descending other
  emailOption.topFive.sort((a,b)=>{
    return b.result - a.result
  })
  

  // Generate top five chart
  let topFiveChart = generateChart(emailOption.topFive,{x:1200,y:800})

  // Get top five chart as image(Blob)
  emailOption.attachment = [fullChartImage.getAs('image/png').setName('full chart.png')]
  emailOption.headerChartImage = topFiveChart.getBlob()
  


  // Send mail
  try{
    sendMail(emailOption)
    let currentRow = parseInt(userData.currenRow)
    let currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(userData.sheetName)
        currentSheet.getRange('A'+ parseInt(userData.currentRow)).setValue('true')
  }catch(err){
    Logger.log(err)
  }
  
}

function generateChart(chartData,dimension={x:1920,y:1080}){
  // Build table that chart would be generated from
  let data = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, 'Month')
    .addColumn(Charts.ColumnType.NUMBER, 'Online')

  for (let key in chartData) {
    // skip loop if the property is from prototype
    if (!chartData.hasOwnProperty(key)) continue;

    let obj = chartData[key];
    if(obj.result){
      data.addRow([obj.label, obj.result])
    }
  }
  data.build();

  // Generate Chart
  let chart = Charts.newBarChart()
    .setTitle('Chart Title')
    .setXAxisTitle('X Label')
    .setYAxisTitle('Y Label')
    .setDimensions(dimension.x, dimension.y)
    .setRange(0,13)
    .setDataTable(data)
    .build()

  return chart
}

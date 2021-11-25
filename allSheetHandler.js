function allSheetHandler() {
  const options = new store()
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(options.receivingSheetName),
        allDataInSheet = sh.getDataRange().getValues(),
        sheetHeader = allDataInSheet.shift();
  let topFive
        // since shift is apply array lenght changes hence add 1 when re-reference the sheet.

  allDataInSheet.forEach((elem, index)=>{
    let userData = {
      name: '',
      email: '',
      currentRow: null,
      isProcessColumn: options.isProcessColumn,
      sheetName: options.receivingSheetName
    }

    if(elem[options.isProcessColumn] ===''){
      userData.name = elem[2]
      userData.email = elem[5]
      userData.currentRow = index + 2

      // element is not processed
      for (let key in options.categories) {
        // skip loop if the property is from prototype
        if (!options.categories.hasOwnProperty(key)) continue;

        let obj = options.categories[key];
        for (let prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;

            if(prop == 'dataColumns'){
              obj[prop].forEach(e => {
                  obj['result'] = Number(obj['result']) + Number(elem[e])
              })
            }
          
        }
      }
      // Generate top five
      topFive = getTopFive(options.categories)

      // Generate Chart and send mail
      buildCharts(options.categories, topFive, userData)

      // reset options result
      for (let key in options.categories) {
        // skip loop if the property is from prototype
        if (!options.categories.hasOwnProperty(key)) continue;

        let obj = options.categories[key];
        for (let prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;

            if(prop == 'dataColumns'){
              obj[prop].forEach(e => {
                  obj['result'] = 0
              })
            }
          
        }
      }

      // write top five to sheet
      sh.getRange(index+2,options.result1Column+1).setValue(options.categories[topFive[0]].label)
      sh.getRange(index+2,options.result2Column+1).setValue(options.categories[topFive[1]].label)
      sh.getRange(index+2,options.result3Column+1).setValue(options.categories[topFive[2]].label)
      sh.getRange(index+2,options.result4Column+1).setValue(options.categories[topFive[3]].label)
      sh.getRange(index+2,options.result5Column+1).setValue(options.categories[topFive[4]].label)

    }
  })

}
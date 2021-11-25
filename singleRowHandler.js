function singleRowHandler() {
  const options = new store()

  let sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(options.receivingSheetName),
      shUi = SpreadsheetApp.getUi(),
      result = shUi.prompt('Enter row number', shUi.ButtonSet.OK_CANCEL);

  let button = result.getSelectedButton();
  let row = result.getResponseText();
      
  if (button == shUi.Button.OK) {
    // User clicked "OK".
    if(Number(row)){
      row = Number(row)
      email = sh.getRange(row, options.emailColumn+1).getValue()
      if(email == 'Email' || ''){
        alert('Please provide a valid row')
        return
      }else{
        // Row has data in the email field, Lets try.
        processRowData(row, options)
      }
    }else{
      alert('Please provide a valid number');
      return
    }

  } else if (button == shUi.Button.CANCEL) {
    // User clicked "Cancel".
    alert('I didn\'t get the Row number.');
  } 
}

function processRowData(row, options){
  let sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(options.receivingSheetName),
      rowData = sh.getRange(row, 1, 1,sh.getMaxColumns()).getValues()[0]

  let userData = {
    name: '',
    email: '',
    currentRow: null,
    isProcessColumn: options.isProcessColumn,
    sheetName: options.receivingSheetName
  }
  if(rowData[options.isProcessColumn] ===''){
    userData.name = rowData[2]
    userData.email = rowData[5]
    userData.currentRow = row

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
                obj['result'] = Number(obj['result']) + Number(rowData[e])
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
    sh.getRange(userData.currentRow,options.result1Column+1).setValue(options.categories[topFive[0]].label)
    sh.getRange(userData.currentRow,options.result2Column+1).setValue(options.categories[topFive[1]].label)
    sh.getRange(userData.currentRow,options.result3Column+1).setValue(options.categories[topFive[2]].label)
    sh.getRange(userData.currentRow,options.result4Column+1).setValue(options.categories[topFive[3]].label)
    sh.getRange(userData.currentRow,options.result5Column+1).setValue(options.categories[topFive[4]].label)

  } else {
    alert("Row has already been processed")
  }

}




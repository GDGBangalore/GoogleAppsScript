var sheetID = "add your google sheet ID having registered users";
var reg =   SpreadsheetApp.openById(sheetID).getSheetByName("reg");
var agenta =   SpreadsheetApp.openById(sheetID).getSheetByName("agenta");

function trigger() {
  var regUsers=[];
  var messages=[];
  regUsers=getSheetData(reg);
  messages=getSheetData(agenta);
  sendEmailtoPartcipants(regUsers,messages);
}

function sendEmailtoPartcipants(regUsers,messages){
  for(var i=0;i<regUsers.length;i++){
   sendEmail(regUsers[i], 'GDG AppScript hackathon', messages[0],'add your google sheet id having messages'); 
  }
}

function sendEmail(to,body,msg,attid){
  var pdf = DriveApp.getFileById("add your google document id").getAs('application/pdf').getBytes();
  var attach = {fileName:'GDG_Certificate.pdf',content:pdf, mimeType:'application/pdf'};
  GmailApp.sendEmail(to,body,msg, {
    attachments: [attach],
    name: 'HackerEarth'
  }); 
}

function getSheetData(sheetname){
  var sheetData=[];
  var range = sheetname.getDataRange();
  var values = range.getValues();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      if (values[i][j]) {
        sheetData.push(values[i][j]);
      }
    }
  }
  return sheetData;
}

function getMessages(){
 var range = agenta.getDataRange();
 var values = range.getValues();
  for (var i = 0; i < values.length; i++) {
   for (var j = 0; j < values[i].length; j++) {
     if (values[i][j]) {
       regUsers.push(values[i][j]);
     }
   }
  }
}


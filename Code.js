//Opening the sheets using Id
var sheetID = "Insert Your Sheet ID";
var sheet =   SpreadsheetApp.openById(sheetID).getSheetByName("Sheet1");

//Global Variables
var rowList=[];

//driver function
function main(){
  
  var endColumn=sheet.getLastColumn()-1;
  var startColumn=1;
  var startRow=2;
  Logger.log(endColumn);
  var watchList=sheet.getRange(startColumn,startRow,startColumn,endColumn).getValues();
  //Logger.log(test);
  //var watchList=sheet.getRange(''+startColumn+":"+endColumn).getValues();
  Logger.log(watchList);
  
  for(var i = 0; i < watchList.length; i++) {
    var stockList = watchList[i];
    //Logger.log(stockList);
    for(var j = 0; j < stockList.length; j++) {
        //Logger.log(stockList[j]);
        var res=getStockQuote(stockList[j]);
    }
  }
  
  rowList.unshift(res);
  //Logger.log(rowList);
  
  //Append the price to the Sheet
  sheet.appendRow(rowList); 
}

function getStockQuote(stock){
  var gTime;
  var gName;
  var mainUrl="https://api.iextrading.com/1.0/stock/";
  var book="/book";
  var url=mainUrl+stock+book;
  Logger.log(url);
  var results=fetch(url);
  //Logger.log(results);
  for each( var result in results) {
      // Logger.log(result);
      var name=result.companyName;
      var value=result.high;
      var time=result.openTime;
      rowList.push(value);
      //sheet.appendRow(rowList);
      gTime=time;
      gName=name.split(" ");
      //Logger.log(gName[0]);
      break;
  }
  
  //Check For recent news and its sentiment
  sentimentCheck(gName[0]);

  return gTime;
  
}
function sentimentCheck(stockName){
  
   //News API Call
   var mainUrl="https://newsapi.org/v2/top-headlines?q=";
   var remain="&languag=en&category=business&sortBy=publishedAt&apiKey=<Insert Your API KEY>";
   var url=mainUrl+stockName+remain;
   
   //Fetch the news
   var results=fetch(url);
   Logger.log(results);
   
  if(results.totalResults ==0){
    Logger.log("No recent News");
  }
  else{
    var news=results.articles[0].title;
    //Logger.log(name);
    var sense=queryHostedModel(news);
    if (sense==="positive"){
      MailApp.sendEmail("abc.com", "StockWatch","News : "+ news+"\nCheck this Stock :  "+stockName+"\nTrend :   Its increasing");
    }
    if(sense==="negative"){
      MailApp.sendEmail("abc.com", "StockWatch","News : "+ news+"\nCheck this Stock :  "+stockName+"\nTrend :   decreasing");
    }
  }
    
}

function fetch(url) {
  var response = UrlFetchApp.fetch(url); //makes api calls
  var parsed_response = JSON.parse(response);
  return parsed_response;
}



function queryHostedModel(news) {
  // When querying hosted models you must always use this
  // specific project number.
  var projectNumber = '414649711441';
  var hostedModelName = 'sample.sentiment';

  // Query the hosted model with a positive statement.
  var predictionString = news;
  var prediction = Prediction.Hostedmodels.predict(
      {
        input: {
          csvInstance: [predictionString]
        }
      },
      projectNumber,
      hostedModelName);
  // Logs Sentiment: positive.
  Logger.log('Sentiment: ' + prediction.outputLabel);
  return prediction.outputLabel;
 
 
}
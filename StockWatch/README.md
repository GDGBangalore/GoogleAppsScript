# Stack Watch 
Its a container bound app-script, which takes the watch stock list from the google spreadsheet its linked to and it finds the recent business news related to the watch list Stock, and performs sentimental analysis using Prediction API, and alerts if the stock may increase or decrease and also along with it  records their Market high values to the spreadsheet.

### API's USED

 - News Api
 - iexTrading
 - Prediction API (GCP)

### Sample Spreadsheet
![Example Spreadsheet ](https://image.ibb.co/fjCc7n/appscript.jpg)
 - The Watch List Stock are entered in Row1 (To be entered by user)
 - The timestamp is UNIX TimeStamp
 - The values are in USD and its High Value
### Sample Mail
![Email Sample](https://image.ibb.co/eTLpnn/appscript2.jpg)
 - News, the Stock and its predicted Trend will be mailed  
### NOTE
Please replace the following:
 - The sheetID in line 2 of code.gs
 - The News API Key in line 68 of code.gs
 - The e-Mail id in line 83 and 86 of code.gs

If any issues found please be free to create an issue 

Follow me on [Github](github.com/mspawanranjith)

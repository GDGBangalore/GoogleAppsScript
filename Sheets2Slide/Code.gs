/**
    Convert sheet row to a slide.
    This works with a particular type of theme for this particular script.
*/

function pushToSlide(data){
    
  var data = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  
  var slideMain = SlidesApp.create('PRESENTATION NAME');
  var slide = slideMain.insertSlide(0);
  
  var mainImage = slide.insertImage(data[0][2], 75 , 10 , 200 , 125);
 
  var line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, 75 , 110, 100 , 110)
  var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 70, 135, 300, 30);
  var textRange = shape.getText();
  var text = textRange.setText(data[0][1]);
  text.getTextStyle().setFontFamilyAndWeight('Roboto', 400).setFontSize(14);
  
  var line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, 75 , 190, 100 , 190) 
  var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 70, 200, 300, 30);
  var textRange = shape.getText();
  var text = textRange.setText(data[0][3]);
  text.getTextStyle().setFontFamilyAndWeight('Roboto', 100).setFontSize(10.5).setForegroundColor('#333333');
  
  var cc = SpreadsheetApp.getActiveSheet().getCharts()[0];
  slide.insertSheetsChart(cc, 425 , 50 , 250 , 250)
 
}

function sheetToSlide() {
  var sheetID = "YOUR_SHEETS_ID";
  var sheet =   SpreadsheetApp.openById(sheetID).getSheetByName("Sheet1");
  var preso = SlidesApp.create('YOUR_PRESENTATION_NAME');
  var cue = sheet.getDataRange().getValues();
  for (var i=0; i<cue.length; i++){
    
    var translate_lang = LanguageApp.translate(cue[i], 'en', 'CODE_OF_LANG_TO_TRANSLATE');
  
    var card= preso.insertSlide(i);

    var shape = card.insertShape(SlidesApp.ShapeType.TEXT_BOX, 150,100,300,60);
    var text = shape.getText();
    shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE)
    text.setText(cue[i]);
    text.getTextStyle().setBold(true);
     shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE)
    
    
    card.insertLine(SlidesApp.LineCategory.STRAIGHT, 200,175,300,175)
    
    
    var shape = card.insertShape(SlidesApp.ShapeType.TEXT_BOX, 150,200,300,60);
    var text = shape.getText();
    text.setText(translate_lang);
     text.getTextStyle().setBold(true);
     shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE)
    
    
  }
}


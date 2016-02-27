/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//buscado os idomas disponíveis
//var json = (function() {
//        var json = null;
//        $.ajax({
//            'async': false,
//            'global': false,
//            'url': "js/languages.json",
//            'dataType': "json",
//            'success': function (data) {
//                json = data;
//            }
//        });
//        return json;
//    })();

//document.write(json.languages)
//document.write($.inArray('en', json.languages))

//if ($.inArray(navigator.language || navigator.userLanguage, json.languages) === -1){
//    var userIdioma = '';
//} else {
//    var userIdioma = navigator.language || navigator.userLanguage;
//}
//
//document.write(userIdioma)

//buscando o idioma do navegador
//var userLang = navigator.language || navigator.userLanguage; 
    //alert ("The language is: " + userLang);

// This will initialize the plugin 
// and show two dialog boxes: one with the text "Olá World"
// and other with the text "Good morning John!" 
jQuery.i18n.properties({
    name:'Textos', 
    path:'idiomas/', 
    mode:'both',
    //language: userIdioma, 
    callback: function() {
        // We specified mode: 'both' so translated values will be
        // available as JS vars/functions and as a map

        // Accessing a simple value through the map
        //jQuery.i18n.prop('msg_hello');
        // Accessing a value with placeholders through the map
        //jQuery.i18n.prop('msg_complex', 'Marco');

        // Accessing a simple value through a JS variable
        //alert(msg_hello +' '+ msg_world);
        // Accessing a value with placeholders through a JS function
        //alert(msg_complex('John'));
        
        //document.write(msg_hello +' '+ msg_world);
        //document.write(msg_complex('Marco'));
        
    }
});
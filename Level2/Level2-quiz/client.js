/* global $ */
$(function(){
  $.get('/cities', appendToForm);

  function appendToForm(cities) {
    var cityList = [];
    for(var i in cities){
      cityList.push($("<option>", { text: cities[i] }));
    }
    $(".city-form").append(cityList);
  }
});

class Form extends React.Component{
  value(){
    var value = {};
    var field_value;
    $.each(this.refs, function(name, field){
      if (typeof field.value == 'function'){
        field_value = field.value();
        if (Array.isArray(field_value) || typeof(field_value) !== 'object'){
          value[name] = field_value;
        } else {
          value = $.extend(value, field_value);
        }
      }
    });
    return value;
  }
}

window.Form = Form;

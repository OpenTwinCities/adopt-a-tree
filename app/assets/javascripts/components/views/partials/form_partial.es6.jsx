class FormPartial extends React.Component{
  value(){
    var value = {};
    $.each(this.refs, function(name, field){
      value[name] = field.value(); 
    });
    return value;
  }
}

window.FormPartial = FormPartial;

function itBehavesLikeAForm(view_component, values, errors){
  describe('With values', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(React.createElement(view_component, {value: values}));
      fieldNode = ReactDOM.findDOMNode(field);
      $field = $(fieldNode);
    });
  
    it('Applies values to fields', function(){
      $.each(values, function(key, value){
        expect(field.refs[key].value()).toEqual(value);
      });
    });

    it('Provides collected values', function(){
      var returned_values = field.value();
      $.each(values, function(key, value){
        expect(returned_values[key]).toEqual(value);
      });
    });
  });

  describe('With errors', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(React.createElement(view_component, {errors: errors}));
      fieldNode = ReactDOM.findDOMNode(field);
      $field = $(fieldNode);
    });
  
    it('Applies errors to fields', function(){
      $.each(errors, function(key, message){
        if (message !== null){
          expect($field.find('.error:contains("'+ message +'")').length).toEqual(1, 'error message "' + message + '" could not be found');
        }
      });
    });
  });
}

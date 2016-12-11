describe('SelectField', function(){
  var options, field, fieldNode, select;
  beforeEach(function(){
    options = [
      {'value':'one', 'label':'One'},
      {'value':'two', 'label':'2'},
      {'value':'three', 'label':'III'}
    ]
    field = TestUtils.renderIntoDocument(
      <SelectField name="myField" options={options}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    select = field.refs.input;
  });

  it("has a label", function(){
    var label = $(fieldNode).find('label');
    expect(label.attr('for')).toEqual('myField');
  });

  it('Has a default value of null', function(){
    expect(field.value()).toEqual(null);
  });

  it('Has select element with the provided name', function(){
    var input = $(fieldNode).find('select');
    expect(input.attr('name')).toEqual('myField');
  });

  it('Select element has options with specific labels and properly derived ids', function(){
    options.forEach(function(option){
      var optionInput = $(fieldNode).find('#myField_' + option['value']);
      expect(optionInput.is('option')).toBeTruthy();
      expect(optionInput.length).toEqual(1);
      expect(optionInput.text()).toEqual(option['label']);
    });
  });

  it('Derives labels for options that do not specify labels', function(){
    field = TestUtils.renderIntoDocument(
      <SelectField type="select" name="myField" options={[{'value': 'foobar'}]}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    expect($(fieldNode).find('option').text()).toEqual('foobar');
  });

  it("updates it's value when a selection occurs", function(){
    TestUtils.Simulate.change(select, {'target': {'value': 'two'}});
    expect(field.value()).toContain('two');
  });

  describe('with a provided value', function(){
    var selected_value = 'two';
    var $select;
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <SelectField name="myField" options={options} value={selected_value} />
      );
      fieldNode = ReactDOM.findDOMNode(field);
      select = field.refs.input;
      $select = $(select);
    });

    it("sets it's value", function(){
      expect(field.value()).toEqual(selected_value);
    });

    it('sets the value of the select field', function(){
      expect($select.find(':selected').val()).toEqual(selected_value);
    });

    it("can have it's value change", function(){
      TestUtils.Simulate.change(select, {'target': {'value': 'two'}});
      expect(field.value()).toContain('two');
    });
  });

  describe('with errors', function(){
    var errors;
    beforeEach(function(){
      errors = ['error messages'];
      field = TestUtils.renderIntoDocument(
        <SelectField name="myField" options={options} errors={errors}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('prints the errors', function(){
      expect($(fieldNode).text()).toContain('error messages');
    });
  });
});

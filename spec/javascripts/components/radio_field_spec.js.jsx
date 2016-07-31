describe('RadioField', function(){
  var options, field, fieldNode;
  beforeEach(function(){
    options = [
      {'value':'one', 'label':'One'},
      {'value':'two', 'label':'2'},
      {'value':'three', 'label':'III'}
    ]
    field = TestUtils.renderIntoDocument(
      <RadioField type="radio" name="myField" options={options}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
  });

  it("has a label", function(){
    var label = $(fieldNode).find('label');
    expect(label.attr('for')).toEqual('myField');
  });

  it('Has a default value of null', function(){
    expect(field.value()).toEqual(null);
  });

  it('Has input elements of type radio with the provided name', function(){
    var input = $(fieldNode).find('input');
    expect(input.attr('type')).toEqual('radio');
    expect(input.attr('name')).toEqual('myField');
  });

  it('Has input elements with specified labels and properly derived ids', function(){
    options.forEach(function(option){
      var optionInput = $(fieldNode).find('#myField_' + option['value']);
      expect(optionInput.length).toEqual(1);
      expect(optionInput.closest('label').text()).toEqual(option['label']);
    });
  });

  it('Derives labels for options that do not specify labels', function(){
    field = TestUtils.renderIntoDocument(
      <RadioField name="myField" options={[{'value': 'foobar'}]}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    expect($(fieldNode).find('label').text()).toContain('foobar');
  });

  it("updates it's value when radio is selected", function(){
    var $input = $(fieldNode).find('input').first();
    var input = $input[0];
    TestUtils.Simulate.change(input, {target: {checked: true, value: $input.val()}});
    expect(field.value()).toContain($input.val());
  });

  describe('with a provided value', function(){
    var checked_value = 'one'
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <RadioField name="myField" options={options} value={checked_value} />
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it("sets it's value", function(){
      expect(field.value()).toEqual(checked_value);
    });

    it('sets the appropriate input as checked', function(){
      var $checked = $(fieldNode).find('input:checked');
      expect($checked.length).toEqual(1);
      expect($checked.val()).toEqual(checked_value);
    });

    it("can have it's value change", function(){
      var $input = $(fieldNode).find('input[value="three"]').first();
      var input = $input[0];
      TestUtils.Simulate.change(input, {target: {checked: true, value: $input.val()}});
      expect(field.value()).toEqual('three');
    });
  });
});

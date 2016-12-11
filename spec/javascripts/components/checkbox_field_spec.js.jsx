describe('CheckboxField', function(){
  var options;
  beforeEach(function(){
    options = [
      {'value': 'one', 'label':'One'},
      {'value': 'two', 'label':'2'},
      {'value': 'three', 'label':'III'}
    ]
    field = TestUtils.renderIntoDocument(
      <CheckboxField name="myField" options={options}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
  });

  it("has a label", function(){
    var label = $(fieldNode).find('label');
    expect(label.attr('for')).toEqual('myField[]');
  });

  it('Has a default value of an empty array', function(){
    expect(field.value()).toEqual([]);
  });

  it('Has input elements of type checkbox with the provided name', function(){
    var input = $(fieldNode).find('input');
    expect(input.attr('type')).toEqual('checkbox');
    expect(input.attr('name')).toEqual('myField[]');
  });

  it('Has input elements with appropriate values', function(){
    options.forEach(function(option){
      var results = $(fieldNode).find('input[value="' + option['value'] +'"]');
      expect(results.length).toEqual(1);
    });
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
      <CheckboxField name="myField" options={[{'value': 'foobar'}]}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    expect($(fieldNode).find('label').text()).toContain('foobar');
  });

  it("updates it's value when a box is checked", function(){
    var $input = $(fieldNode).find('input').first();
    var input = $input[0];
    TestUtils.Simulate.change(input, {target: {checked: true, value: $input.val()}});
    expect(field.value()).toContain($input.val());
  });

  describe('with a provided value', function(){
    var checked_values = ['one', 'two']
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <CheckboxField name="myField" options={options} value={checked_values} />
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it("sets it's value", function(){
      expect(field.value()).toEqual(checked_values);
    });

    it('sets the appropriate inputs as checked', function(){
      var $checked = $(fieldNode).find('input:checked');
      expect($checked.length).toEqual(checked_values.length);
      checked_values.forEach(function(checked_value){
        expect($checked.filter('[value="' + checked_value+'"]').length).toEqual(1);
      });
    });

    it("can have it's value change", function(){
      var $input = $(fieldNode).find('input[value="' + checked_values[0] + '"]').first();
      var input = $input[0];
      TestUtils.Simulate.change(input, {target: {checked: false, value: $input.val()}});
      expect(field.value()).toEqual(checked_values.slice(1));
    });
  });
});

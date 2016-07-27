describe('SelectField', function(){
  var options;
  beforeEach(function(){
    options = [
      {'value':'one', 'label':'One'},
      {'value':'two', 'label':'2'},
      {'value':'three', 'label':'III'}
    ]
    field = TestUtils.renderIntoDocument(
      <SelectField type="select" name="myField" options={options}/>
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
});

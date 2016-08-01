describe('TextField', function(){
  var field, fieldNode, input, $input;
  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <TextField name="myField" label="Useful Label" private={true} required={true}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    input = field.refs.input;
    $input = $(input);
  });

  it("has a label", function(){
    var label = $(fieldNode).find('label');
    expect(label.attr('for')).toEqual('myField');
  });

  it('Has a default value of null', function(){
    expect(field.value()).toEqual(null);
  });

  it('Has an input element of type text with the provided name', function(){
    expect($input.attr('type')).toEqual('text');
    expect($input.attr('id')).toEqual('myField');
    expect($input.attr('name')).toEqual('myField');
  });

  it("updates it's value when text is entered", function(){
    TestUtils.Simulate.change(input, {target: {value: 'foo'}});
    expect(field.value()).toEqual('foo');
  });

  describe('with a provided value', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <TextField name="myField" label="Useful Label" value="Something" private={true} required={true}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      input = field.refs.input;
      $input = $(input);
    });

    it("sets it's value", function(){
      expect(field.value()).toEqual('Something');
    });

    it('sets the value of the input field', function(){
      expect($input.val()).toEqual('Something');
    });

    it("can have it's value change", function(){
      TestUtils.Simulate.change(input, {target: {value: 'foo'}});
      expect(field.value()).toEqual('foo');
    });
  });

  describe('with errors', function(){
    var errors;
    beforeEach(function(){
      errors = ['error messages'];
      field = TestUtils.renderIntoDocument(
        <TextField name="myField" errors={errors}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('prints the errors', function(){
      expect($(fieldNode).text()).toContain('error messages');
    });
  });
});

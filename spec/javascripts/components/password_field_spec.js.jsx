describe('PasswordField', function(){
  var field, fieldNode, input, $input;
  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <PasswordField name="myField" label="Useful Label" private={true} required={true}/>
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
    expect($input.attr('type')).toEqual('password');
    expect($input.attr('id')).toEqual('myField');
    expect($input.attr('name')).toEqual('myField');
  });

  it("updates it's value when text is entered", function(){
    $input.val('foo');
    TestUtils.Simulate.keyUp(input);
    expect(field.value()).toEqual('foo');
  });
});

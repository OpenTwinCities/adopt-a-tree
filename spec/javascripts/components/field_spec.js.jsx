describe('Field', function(){
  it('Has a name', function(){
    var field = TestUtils.renderIntoDocument(
      <Field name="foobar"/>
    );

    var fieldNode = ReactDOM.findDOMNode(field);

    expect(fieldNode.textContent).toContain('foobar');
  });
});

describe('LabeledField', function(){
  var field, fieldNode, input, $input;
  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <LabeledField name="myField" label="Useful Label" private={true} required={true}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
  });

  it('Has an appropriate label', function(){
    var label = $(fieldNode).find('label');
    expect(label.attr('for')).toEqual('myField');
    expect(label.text()).toContain('Useful Label');
  });


  it('Displays an indication of being a private field', function(){
    var privateIndicator = $(fieldNode).find('img.lock');
    expect(privateIndicator.length).toEqual(1);
    expect(privateIndicator.attr('alt')).toEqual('(private)');

    field = TestUtils.renderIntoDocument(
      <LabeledField name="myField" label="Useful Label" private={false}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    privateIndicator = $(fieldNode).find('img.lock');
    expect(privateIndicator.length).toEqual(0);
  });

  it('Displays an indication of being a required field', function(){
    var requiredIndicator = $(fieldNode).find('span.required');
    expect(requiredIndicator.length).toEqual(1);
    expect(requiredIndicator.attr('title')).toEqual('(required)');

    field = TestUtils.renderIntoDocument(
      <LabeledField name="myField" label="Useful Label" required={false}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    requiredIndicator = $(fieldNode).find('span.required');
    expect(requiredIndicator.length).toEqual(0);
  });

  describe('with children', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <LabeledField name="myField">
          <input id="myInput"/>
        </LabeledField>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('renders children', function(){
      var input = $(fieldNode).find('input');
      expect(input.attr('id')).toEqual('myInput');
    });
  });

  describe('with errors', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <LabeledField name="myField" errors={['error message', 'another message']}>
          <input id="myInput"/>
        </LabeledField>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('adds an error class', function(){
      expect($(fieldNode).filter('.error').length).toEqual(1);
    });

    it('prints out the provided errors', function(){
      expect($(fieldNode).text()).toContain('error message');
      expect($(fieldNode).text()).toContain('another message');
    });
  });
});

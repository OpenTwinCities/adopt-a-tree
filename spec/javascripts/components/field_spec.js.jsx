describe('Field', function(){
  var field;
  var fieldNode;
  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <Field name="myField" label="Useful Label" private={true} required={true}/>
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
      <Field name="myField" label="Useful Label" private={false}/>
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
      <Field name="myField" label="Useful Label" required={false}/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    requiredIndicator = $(fieldNode).find('span.required');
    expect(requiredIndicator.length).toEqual(0);
  });

  describe('of type "text"', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <Field type="text" name="myField"/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('Has an input element of type text with the provided name', function(){
      var input = $(fieldNode).find('input');
      expect(input.attr('type')).toEqual('text');
      expect(input.attr('id')).toEqual('myField');
      expect(input.attr('name')).toEqual('myField');
    });
  });

  describe('of type "password"', function(){
    beforeEach(function(){
      field = TestUtils.renderIntoDocument(
        <Field type="password" name="myField"/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('Has an input element of type password with the provided name', function(){
      var input = $(fieldNode).find('input');
      expect(input.attr('type')).toEqual('password');
      expect(input.attr('id')).toEqual('myField');
      expect(input.attr('name')).toEqual('myField');
    });
  });

  describe('of type "checkbox"', function(){
    var options;
    beforeEach(function(){
      options = [
        {'value':  'one', 'label':'One'},
        {'value':'two', 'label':'2'},
        {'value':'three', 'label':'III'}
      ]
      field = TestUtils.renderIntoDocument(
        <Field type="checkbox" name="myField" options={options}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
    });

    it('Has input elements of type checkbox with the provided name', function(){
      var input = $(fieldNode).find('input');
      expect(input.attr('type')).toEqual('checkbox');
      expect(input.attr('name')).toEqual('myField[]');
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
        <Field type="checkbox" name="myField" options={[{'value': 'foobar'}]}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      expect($(fieldNode).find('label').text()).toContain('foobar');
    });
  });

  describe('of type "radio"', function(){
    var options;
    beforeEach(function(){
      options = [
        {'value':'one', 'label':'One'},
        {'value':'two', 'label':'2'},
        {'value':'three', 'label':'III'}
      ]
      field = TestUtils.renderIntoDocument(
        <Field type="radio" name="myField" options={options}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
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
        <Field type="radio" name="myField" options={[{'value': 'foobar'}]}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      expect($(fieldNode).find('label').text()).toContain('foobar');
    });
  });

  describe('of type "select"', function(){
    var options;
    beforeEach(function(){
      options = [
        {'value':'one', 'label':'One'},
        {'value':'two', 'label':'2'},
        {'value':'three', 'label':'III'}
      ]
      field = TestUtils.renderIntoDocument(
        <Field type="select" name="myField" options={options}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
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
        <Field type="select" name="myField" options={[{'value': 'foobar'}]}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      expect($(fieldNode).find('option').text()).toEqual('foobar');
    });
  });
});

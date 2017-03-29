describe('ComboFormView', function(){
  var field, fieldNode, $field;

  var values = {
    email: 'foo@bar.com',
    user_status: 'new'
  };

  var errors = {
    email: ['bad email']
  };

  itBehavesLikeAForm(ComboFormView, values, errors);

  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <ComboFormView/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    $field = $(fieldNode);
  });

  it('Has Combo Form fields', function(){
    expect($field.find('input#email').length).toEqual(1); 
    expect($field.find('input#user_status_new').length).toEqual(1); 
    expect($field.find('input#user_status_existing').length).toEqual(1); 
  });

  describe('New user', function(){
    beforeEach(function(){
      values.user_status = 'new'
      field = TestUtils.renderIntoDocument(
        <ComboFormView value={values}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      $field = $(fieldNode);
    });

    it('Displays user signup fields', function(){
      expect($field.find('input#username').length).toEqual(1);
      expect($field.find('input#password').length).toEqual(1);
      expect(TestUtils.findRenderedComponentWithType(field, ShippingInformationPartial)).toBeDefined();
    });
  });

  describe('Existing user', function(){
    beforeEach(function(){
      values.user_status = 'existing';
      field = TestUtils.renderIntoDocument(
        <ComboFormView value={values}/>
      );
      fieldNode = ReactDOM.findDOMNode(field);
      $field = $(fieldNode);
    });

    it('Displays user sign in fields', function(){
      expect($field.find('input#password').length).toEqual(1, 'Password field not found');
      expect($field.find('input#remember_me').length).toEqual(1, 'Remember Me checkbox not found');
    });
  });
});

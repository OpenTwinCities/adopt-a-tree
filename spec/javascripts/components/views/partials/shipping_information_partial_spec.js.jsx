describe('ShippingInformationPartial', function(){
  var field, fieldNode, $field;

  var values = {
    first_name: 'First',
    last_name: 'Last',
    address_1: '123 Street',
    address_2: 'Suite Awesome',
    city: 'Minneapolis',
    state: 'Minnesota',
    zip: '12345'
  };

  var errors = {
    first_name: ['wrong'],
    last_name: ['bad'],
    address_1: ['incorrect'],
    address_2: ['terrible'],
    city: ['really?'],
    state: ['broken'],
    zip: ['stop']
  };

  itBehavesLikeAForm(ShippingInformationPartial, values, errors);

  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <ShippingInformationPartial/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    $field = $(fieldNode);
  });

  it('Has shipping fields', function(){
    expect($field.find('input#first_name').length).toEqual(1);
    expect($field.find('input#last_name').length).toEqual(1);
    expect($field.find('input#address_1').length).toEqual(1);
    expect($field.find('input#address_2').length).toEqual(1);
    expect($field.find('select#city').length).toEqual(1);
    expect($field.find('select#state').length).toEqual(1);
    expect($field.find('select#zip').length).toEqual(1);
  });
});

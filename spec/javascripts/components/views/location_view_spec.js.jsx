describe('LocationView', function(){
  var field, fieldNode, $field;

  var values = {
    city_state: 'Minneapolis, Minnesota',
    address: '123 Fake Street'
  };

  var errors = {
    city_state: ['foo'],
    address: ['bar']
  };

  itBehavesLikeAForm(LocationView, values, errors);

  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <LocationView/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    $field = $(fieldNode);
  });

  it('Has location fields', function(){
    expect($field.find('select#city_state').length).toEqual(1);
    expect($field.find('input#address').length).toEqual(1);
  });

  it('moves the map when the find trees button is clicked');
});

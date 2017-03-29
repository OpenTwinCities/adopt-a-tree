describe('LocationSearchView', function(){
  var field, fieldNode, $field;

  var values = {
    city_state: 'Minneapolis, Minnesota',
    address: '123 Fake Street'
  };

  var errors = {
    city_state: ['foo'],
    address: ['bar']
  };

  itBehavesLikeAForm(LocationSearchView, values, errors);

  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <LocationSearchView/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    $field = $(fieldNode);
  });

  it('Has location fields', function(){
    expect($field.find('select#city_state').length).toEqual(1);
    expect($field.find('input#address').length).toEqual(1);
  });

  describe('When the Find Trees button is clicked', function(){
    var fake_lat, fake_lng, fake_address, map_stub;
    beforeEach(function(){
      // Mock ajax fetch for geo-locating address
      fake_lat = -93.0;
      fake_lng = 45.0;
      fake_address = '123 Fake St.';
      spyOn($, 'ajax').and.callFake(function(e){
        e.success([fake_lat, fake_lng]);
      });

      // Mock various ThingMap things
      map_stub = jasmine.createSpyObj('map', ['setCenter', 'setZoom']);
      ThingMap.map = map_stub;
      spyOn(ThingMap, 'addMarkersAround');

      // Set some input and click the button
      TestUtils.Simulate.change(field.refs.address.refs.input, {target: {value: fake_address}});
      TestUtils.Simulate.click(field.refs.find_trees);
    });

    it('requests geolocation from the server', function(){
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET');
      expect($.ajax.calls.mostRecent().args[0].url).toEqual('/address.json');
      expect($.ajax.calls.mostRecent().args[0].data.address).toEqual(fake_address);
    });

    it('pans and zooms and populates the map', function(){
      expect(ThingMap.addMarkersAround).toHaveBeenCalledWith(fake_lat, fake_lng);
      expect(map_stub.setCenter).toHaveBeenCalled();
      expect(map_stub.setCenter.calls.mostRecent().args[0].lat()).toEqual(fake_lat);
      expect(map_stub.setCenter.calls.mostRecent().args[0].lng()).toEqual(fake_lng);
      expect(map_stub.setZoom).toHaveBeenCalled();
    });
  });
});

class LocationSearchView extends Form{

  constructor(props){
    super(props);
    var errors = this.props.errors;
    if (errors === undefined){
      errors = {};
    }
    ['city_state', 'address'].forEach(function(attr){
      if (!(attr in errors)){
        errors[attr] = null;
      }
    });
    this.state = {errors: errors}
    this.findTrees = this.findTrees.bind(this);
  }

  componentDidMount(){
    this.refs.address.refs.input.focus();
  }

  enableFindButton(){
   $(this.refs['find_tree']).attr('disabled', false);
  }

  disableFindButton(){
   $(this.refs['find_tree']).attr('disabled', true);
  }

  findTrees(event){
    event.preventDefault();
    var self = this;
    this.disableFindButton();

    $.ajax(
      {
        type: 'GET',
        url: '/address.json',
        data: {
          'utf8': '✓',
          'city_state': this.value()['city_state'],
          'address': this.value()['address']
        },
        error: function(jqXHR) {
          if (jqXHR.responseJSON && jqXHR.responseJSON.errors){
            self.setState({errors: jqXHR.responseJSON.errors});
          } else {
            // TODO Display a proper error modal to the user
            console.error(JSON.stringify(jqXHR));
          }
          self.enableFindButton();
        },
        success: function(data) {
          self.enableFindButton();
          if(data.errors) {
            self.setState({errors: data.errors});
          } else {
            ThingMap.addMarkersAround(data[0], data[1]);
            var center = new google.maps.LatLng(data[0], data[1]);
            ThingMap.map.setCenter(center);
            ThingMap.map.setZoom(19);
          }
        }
      }
    );
  }

  render(){
    var fetch = AdoptAUtils.fetch;
    return (
      <form className="search-form" ref="address_form" id="address_form">
        <SelectField ref='city_state' name='city_state' label={I18n.t('labels.city')} options={LocationSearchView.cityStateOptions} value='Minneapolis, Minnesota' errors={this.state.errors.city_state}/>
        <TextField ref='address' className='search-query' name='address' label={I18n.t('labels.address')} placeholder={I18n.t('defaults.address_1') + ', ' + I18n.t('defaults.neighborhood')} value={fetch(this.props.value, 'address')} errors={this.state.errors.address}/>
        <fieldset className='form-actions'>
          <input type='submit' ref='find_trees' className='btn btn-primary' value={I18n.t('buttons.find', {thing: I18n.t('defaults.thing') + 's'})} onClick={this.findTrees}/>
          <a id='edit_profile_link' className='btn'>{I18n.t('buttons.edit_profile')}</a>
          <a id='sign_out_link' className='btn btn-danger'>{I18n.t('buttons.sign_out')}</a>
        </fieldset>
      </form>
    )
  }

}

LocationSearchView.cityStateOptions = [
  {value: 'Minneapolis, Minnesota'}
]

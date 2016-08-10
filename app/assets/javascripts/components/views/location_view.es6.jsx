class LocationView extends Form{
  moveMap(){
  
  }

  render(){
    var fetch = AdoptAUtils.fetch;
    return (
      <form className="search-form" id="address_form">
        <SelectField ref='city_state' name='city_state' label={I18n.t('labels.city')} options={LocationView.cityStateOptions} value='Minneapolis, Minnesota' errors={fetch(this.props.errors, 'city_state')}/>
        <TextField ref='address' className='search-query' name='address' label={I18n.t('labels.address')} placeholder={I18n.t('defaults.address_1') + ', ' + I18n.t('defaults.neighborhood')} value={fetch(this.props.value, 'address')} errors={fetch(this.props.errors, 'address')}/>
        <fieldset className='form-actions'>
          <input type='submit' className='btn btn-primary' value={I18n.t('buttons.find', {thing: I18n.t('defaults.thing') + 's'})}/>
          <a id='edit_profile_link' className='btn'>{I18n.t('buttons.edit_profile')}</a>
          <a id='sign_out_link' className='btn btn-danger'>{I18n.t('buttons.sign_out')}</a>
        </fieldset>
      </form>
    )
  }

}

LocationView.cityStateOptions = [
  {value: 'Minneapolis, Minnesota'}
]

class ShippingInformation extends FormPartial{
  render(){
    var fetch = AdoptAUtils.fetch;
    var klass = ShippingInformation;
    return (
      <div>
        <h2>Shipping Information</h2>
        <TextField ref='first_name' name='first_name' label="First Name" private={true} value={fetch(this.props.value, 'first_name')} errors={fetch(this.props.errors, 'first_name')}/>
        <TextField ref='last_name' name='last_name' label="Last Name" private={true} value={fetch(this.props.value, 'last_name')} errors={fetch(this.props.errors, 'last_name')}/>
        <TextField ref='address_1' name='address_1' label="Address Line 1" private={true} value={fetch(this.props.value, 'address_1')} errors={fetch(this.props.errors, 'address_1')} />
        <TextField ref='address_2' name='address_2' label="Address Line 2" private={true} value={fetch(this.props.value, 'address_2')} errors={fetch(this.props.errors, 'address_2')}/>
        <SelectField ref='city' name='city' label="City" options={klass.cityOptions} private={true} value={fetch(this.props.value, 'city')} errors={fetch(this.props.errors, 'city')}/>
        <SelectField ref='state' name='state' label="State" options={klass.stateOptions} private={true} value={fetch(this.props.value, 'state')} errors={fetch(this.props.errors, 'state')}/>
        <SelectField ref='zip' name='zip' label="ZIP" options={klass.zipOptions} private={true} value={fetch(this.props.value, 'zip')} errors={fetch(this.props.errors, 'zip')}/>
      </div>
    );
  }
}

ShippingInformation.cityOptions = [
  {value: 'Minneapolis'}
];

ShippingInformation.stateOptions = [
  {value: 'MN', label: 'Minnesota'}
];

ShippingInformation.zipOptions = [
  {value: '55401'}, {value: '55402'}, {value: '55403'}, {value: '55404'}, {value: '55405'}, {value: '55406'}, {value: '55407'}, {value: '55408'}, {value: '55409'}, {value: '55410'},
  {value: '55411'}, {value: '55412'}, {value: '55413'}, {value: '55414'}, {value: '55415'}, {value: '55416'}, {value: '55417'}, {value: '55418'}, {value: '55419'}, {value: '55420'},
  {value: '55421'}, {value: '55422'}, {value: '55423'}, {value: '55424'}, {value: '55425'}, {value: '55426'}, {value: '55427'}, {value: '55428'}, {value: '55429'}, {value: '55430'},
  {value: '55431'}, {value: '55432'}, {value: '55433'}, {value: '55434'}, {value: '55435'}, {value: '55436'}, {value: '55437'}, {value: '55438'}, {value: '55439'}, {value: '55440'},
  {value: '55441'}, {value: '55442'}, {value: '55443'}, {value: '55444'}, {value: '55445'}, {value: '55446'}, {value: '55447'}, {value: '55448'}, {value: '55449'}, {value: '55450'},
  {value: '55451'}, {value: '55452'}, {value: '55453'}, {value: '55454'}, {value: '55455'}, {value: '55456'}, {value: '55457'}, {value: '55458'}, {value: '55459'}, {value: '55460'},
  {value: '55461'}, {value: '55462'}, {value: '55463'}, {value: '55464'}, {value: '55465'}, {value: '55466'}, {value: '55467'}, {value: '55468'}, {value: '55469'}, {value: '55470'},
  {value: '55471'}, {value: '55472'}, {value: '55473'}, {value: '55474'}, {value: '55475'}, {value: '55476'}, {value: '55477'}, {value: '55478'}, {value: '55479'}, {value: '55480'},
  {value: '55481'}, {value: '55482'}, {value: '55483'}, {value: '55484'}, {value: '55485'}, {value: '55486'}, {value: '55487'}, {value: '55488'}
];

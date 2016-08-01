class ShippingInformation extends React.Component{

  cityOptions: [
    {value: 'Minneapolis'}
  ];

  stateOptions: [
    {value: 'MN', label: 'Minnesota'}
  ];

  zipOptions: [
    {value: '55401'}, {value: '55402'}, {value: '55403'}, {value: '55404'}, {value: '55405'}, {value: '55406'}, {value: '55407'}, {value: '55408'}, {value: '55409'}, {value: '55410'},
    {value: '55411'}, {value: '55412'}, {value: '55413'}, {value: '55414'}, {value: '55415'}, {value: '55416'}, {value: '55417'}, {value: '55418'}, {value: '55419'}, {value: '55420'},
    {value: '55421'}, {value: '55422'}, {value: '55423'}, {value: '55424'}, {value: '55425'}, {value: '55426'}, {value: '55427'}, {value: '55428'}, {value: '55429'}, {value: '55430'},
    {value: '55431'}, {value: '55432'}, {value: '55433'}, {value: '55434'}, {value: '55435'}, {value: '55436'}, {value: '55437'}, {value: '55438'}, {value: '55439'}, {value: '55440'},
    {value: '55441'}, {value: '55442'}, {value: '55443'}, {value: '55444'}, {value: '55445'}, {value: '55446'}, {value: '55447'}, {value: '55448'}, {value: '55449'}, {value: '55450'},
    {value: '55451'}, {value: '55452'}, {value: '55453'}, {value: '55454'}, {value: '55455'}, {value: '55456'}, {value: '55457'}, {value: '55458'}, {value: '55459'}, {value: '55460'},
    {value: '55461'}, {value: '55462'}, {value: '55463'}, {value: '55464'}, {value: '55465'}, {value: '55466'}, {value: '55467'}, {value: '55468'}, {value: '55469'}, {value: '55470'},
    {value: '55471'}, {value: '55472'}, {value: '55473'}, {value: '55474'}, {value: '55475'}, {value: '55476'}, {value: '55477'}, {value: '55478'}, {value: '55479'}, {value: '55480'},
    {value: '55481'}, {value: '55482'}, {value: '55483'}, {value: '55484'}, {value: '55485'}, {value: '55486'}, {value: '55487'}, {value: '55488'}
  ]

  render(){
    return (
      <div>
        <h2>Shipping Information</h2>
        <TextField name='first_name' label="First Name" private={true}/>
        <TextField name='last_name' label="Last Name" private={true}/>
        <TextField name='address_1' label="Address Line 1" private={true}/>
        <TextField name='address_2' label="Address Line 2" private={true}/>
        <SelectField name='city' label="City" options={cityOptions} private={true}/>
        <SelectField name='state' label="State" options={stateOptions} private={true}/>
        <SelectField name='zip' label="ZIP" options={zipOptions} private={true}/>
      </div>
    );
  }
}

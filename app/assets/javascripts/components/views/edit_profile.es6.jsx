class EditProfile extends React.Component{

  render(){
    return (
      <div>
        <TextField name='email' label="Email Address" private={true}/>
        <TextField name='username' label="Username" private={false}/>
        <ShippingInformation/>
      </div>
    );
  }
}

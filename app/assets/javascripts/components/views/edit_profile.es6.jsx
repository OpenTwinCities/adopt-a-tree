class EditProfile extends React.Component{

  render(){
    return (
      <form>
        <TextField name='email' label="Email Address" private={true}/>
        <TextField name='username' label="Username" private={false}/>
        <ShippingInformation/>
        <Survey/>
      </form>
    );
  }
}

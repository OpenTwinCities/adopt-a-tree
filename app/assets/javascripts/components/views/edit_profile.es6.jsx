class EditProfile extends React.Component{

  render(){
    return (
      <form>
        <TextField name='email' label="Email Address" private={true}/>
        <TextField name='username' label="Username" private={false}/>
        <ShippingInformation/>
        <Survey/>
        <h2>Change Password</h2>
        <PasswordField name='password' label='New Password' private={true}/>
        <PasswordField name='current_password' label='Current Password' private={true}/>
        <fieldset className='form-actions'>
          <input className='btn btn-primary' name='commit' type='submit' value='Update'/>
          <a className='btn'>Back</a> 
        </fieldset>
      </form>
    );
  }
}

class ComboFormView extends Form{

  constructor(props){
    super(props);
    var errors = this.props.errors;
    if (errors === undefined){
      errors = {};
    }
    ['email', 'username', 'password'].forEach(function(attr){
      if (!(attr in errors)){
        errors[attr] = null;
      }
    });
    var user_status = AdoptAUtils.fetch(this.props.value, 'user_status', 'new');
    this.state = {
      errors: errors,
      user_status: user_status
    }
  }

  componentDidMount(){
    this.refs.email.refs.input.focus();
  }

  isNew(){
    return (this.state.user_status === 'new');
  }

  renderSignUpForm(){
    var fetch = AdoptAUtils.fetch;
    return(
      <fieldset id='user_sign_up_fields'>
        <TextField rel='username' name='username' label={I18n.t('labels.username')} value={fetch(this.props.value, 'username')} errors={this.state.errors.username}/> 
        <PasswordField rel='password' name='password' label={I18n.t('labels.password')} value={fetch(this.props.value, 'password')} errors={this.state.errors.password}/> 
        <ShippingInformationPartial value={this.props.value} errors={this.props.errors}/>
      </fieldset>
    );
  }

  renderSignInForm(){
    var fetch = AdoptAUtils.fetch;
    return (
      <fieldset id='user_sign_in_fields'>
        <PasswordField rel='password' name='password' label={I18n.t('labels.password')} value={fetch(this.props.value, 'password')} errors={this.state.errors.password}/>
        <CheckboxField rel='remember' name='remember' options={[{value: 'me', label: I18n.t('labels.remember_me')}]} value={fetch(this.props.value, 'remember')} errors={this.state.errors.remember}/>
      </fieldset>
    );
  }

  renderRemainder(){
    if (this.isNew()){
      return this.renderSignUpForm();
    } else {
      return this.renderSignInForm();
    }
  }

  render(){
    var fetch = AdoptAUtils.fetch;
    return (
      <form id='combo-form' className='form-vertical'>
        <fieldset id='common_fields'>
          <TextField ref='email' name='email' label={I18n.t('labels.email')} private={true} value={fetch(this.props.value, 'email')} errors={this.state.errors.email}/>
          <RadioField ref='user_status' name='user_status' options={ComboFormView.userStatusOptions} value={this.state.user_status}/> 
        </fieldset>
        {this.renderRemainder()}
      </form>
    );
  }
}

ComboFormView.userStatusOptions = [
  {value: 'new', label: I18n.t('labels.user_new')},
  {value: 'existing', label: I18n.t('labels.user_existing')}
]

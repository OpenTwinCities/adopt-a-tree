class PasswordField extends React.Component{

  constructor(props) {
    super(props);
    this.state = {value: null};
    this.handleChange = this.handleChange.bind(this);
  }

  value(){
    return this.state.value;
  }

  handleChange(){
    var input = $(this.refs.input);
    this.setState({value: input.val()});
  }

  render(){
    return (
      <LabeledField name={this.props.name} label={this.props.label}>
        <input type="password" id={this.props.name} name={this.props.name} ref="input" onKeyUp={this.handleChange}/>
      </LabeledField>
    );
  }
}

PasswordField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool
};

class TextField extends React.Component{

  constructor(props) {
    super(props);
    this.state = {value: (props.value || null)}
    this.handleChange = this.handleChange.bind(this);
  }

  value(){
    return this.state.value;
  }

  handleChange(e){
    this.setState({value: e.target.value});
  }

  render(){
    return (
      <LabeledField name={this.props.name} label={this.props.label} private={this.props.private} required={this.props.required} errors={this.props.errors}>
        <input type="text" id={this.props.name} name={this.props.name} className={this.props.className} ref="input" placeholder={AdoptAUtils.fetch(this.props, 'placeholder')} value={this.value() || ''} onChange={this.handleChange}/>
      </LabeledField>
    );
  }
}

TextField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  errors: React.PropTypes.array
};

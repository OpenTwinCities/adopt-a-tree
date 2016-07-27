class TextField extends React.Component{

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
        <input type="text" id={this.props.name} name={this.props.name} ref="input" onKeyUp={this.handleChange}/>
      </LabeledField>
    );
  }
}

TextField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool
};

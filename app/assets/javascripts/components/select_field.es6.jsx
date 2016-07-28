class SelectField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
    this.handleChange = this.handleChange.bind(this);
  }

  value(){
    return this.state.value;
  }

  optionId(option){
    return this.props.name + '_' + option['value'];
  }


  handleChange(e){
    this.setState({value: e.target.value});
  }

  render(){
    var self = this;
    return (
      <LabeledField name={this.props.name} label={this.props.label}>
        <select id={this.props.name} name={this.props.name} ref='input' onChange={this.handleChange}>
          {
            this.props.options.map(function(option){
              return <option id={self.optionId(option)}>{option['label'] || option['value']}</option>
            })
          }
        </select>
      </LabeledField>
    );
  }
}

SelectField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool,
  options: React.PropTypes.array
};

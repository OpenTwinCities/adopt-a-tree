class RadioField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  value(){
    return this.state.value;
  }

  optionId(option){
    return this.props.name + '_' + option['value'];
  }

  render(){
    var self = this;
    return(
      <LabeledField name={this.props.name} label={this.props.label}>
        {
          this.props.options.map(function(option){
            return <label><input type='radio' id={self.optionId(option)} name={self.props.name}/>{option['label'] || option['value']}</label>
          })
        }
      </LabeledField>

    );
  }
}

RadioField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool,
  options: React.PropTypes.array
};

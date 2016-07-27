class CheckboxField extends React.Component{

  constructor(props) {
    super(props);
    this.state = {value: []};
  }

  optionId(option){
    return this.props.name + '_' + option['value'];
  }

  name(){
    return this.props.name + '[]';
  }

  value(){
    return this.state.value;
  }

  optionsMarkup(){
    var self = this;
    return this.props.options.map(function(option){
      return <label><input type='checkbox' id={self.optionId(option)} name={self.name()}/>{option['label'] || option['value']}</label>
    });
  }

  render(){
    return (
      <LabeledField name={this.props.name} label={this.props.label}>
        {this.optionsMarkup()}
      </LabeledField>
    );
  }
}

CheckboxField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool,
  options: React.PropTypes.array
};

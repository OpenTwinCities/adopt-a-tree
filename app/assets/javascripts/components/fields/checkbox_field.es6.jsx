class CheckboxField extends React.Component{

  constructor(props) {
    super(props);
    this.state = {value: (props.value ? props.value.slice(0) : [])};
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e){
    var value = this.state.value;
    var index = $.inArray(e.target.value, value);
    if (e.target.checked){
      if (index === -1){
        value.push(e.target.value);
      } 
    } else {
      value.splice(index, 1)
    } 
  }

  optionsMarkup(){
    var self = this;
    return this.props.options.map(function(option){
      return (
        <div className="checkbox">
          <label className="checkbox">
            <input type='checkbox' id={self.optionId(option)} name={self.name()} className={self.props.className} value={option['value']} checked={self.value().indexOf(option['value']) > -1} onChange={self.handleChange}/>
            {option['label'] || option['value']}
          </label>
        </div>
      );
    });
  }

  render(){
    return (
      <LabeledField name={this.name()} label={this.props.label} private={this.props.private} required={this.props.required} errors={this.props.errors}>
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
  options: React.PropTypes.array,
  errors: React.PropTypes.array
};

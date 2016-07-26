class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
    this.handleChange = this.handleChange.bind(this);
  }

  /* Properties */

  id(){
    return this.props.name;
  }

  name(){
    if (['checkbox'].indexOf(this.props.type) != -1){
      return this.props.name + '[]';
    } else {
      return this.props.name;
    }
  }

  value(){
    return this.state.value;
  }

  optionId(option){
    return this.props.name + '_' + option['value'];
  }

  /* Markup Methods */

  requiredMarkup(){
    if (this.props.required === true){
      return <span className="required" title={I18n.t('captions.required')}/>
    }
  }

  privateMarkup(){
    if (this.props.private === true){
      return <img className="lock" src="/assets/lock.png" alt={I18n.t('captions.private')}/>
    }
  }

  labelMarkup() {
    return <label htmlFor={this.name()}>{this.props.label} {this.requiredMarkup()} {this.privateMarkup()} </label>
  }

  inputMarkup () {
    var self = this;
    switch (this.props.type){
      case 'text':
        return <input type='text' id={this.id()} name={this.name()} ref="input" onKeyUp={this.handleChange}/>
      case 'password':
        return <input type='password' id={this.id()} name={this.name()}/>
      case 'checkbox':
        return this.props.options.map(function(option){
          return <label><input type='checkbox' id={self.optionId(option)} name={self.name()}/>{option['label'] || option['value']}</label>
        });
      case 'radio':
        return this.props.options.map(function(option){
          return <label><input type='radio' id={self.optionId(option)} name={self.name()}/>{option['label'] || option['value']}</label>
        });
      case 'select':
        return <select id={this.id()} name={this.name()}>{
          this.props.options.map(function(option){
            return <option id={self.optionId(option)}>{option['label'] || option['value']}</option>
          })
        }</select>
    }
  }

  handleChange(){
    var input = $(this.refs.input);
    this.setState({value: input.val()});
  }

  render () {
    return (
      <fieldset className="control-group">
        {this.labelMarkup()}
        {this.inputMarkup()}
      </fieldset>
    );
  }
}

Field.propTypes = {
  name: React.PropTypes.string,
  type: React.PropTypes.oneOf(['text', 'password', 'checkbox', 'radio', 'select']),
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool,
  options: React.PropTypes.array
};

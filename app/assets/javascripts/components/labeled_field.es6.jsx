class LabeledField extends React.Component {

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
    return <label htmlFor={this.props.name}>{this.props.label} {this.requiredMarkup()} {this.privateMarkup()} </label>
  }

  render () {
    return (
      <fieldset className="control-group">
        {this.labelMarkup()}
        {this.props.children}
      </fieldset>
    );
  }
}

LabeledField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool
};

class Field extends React.Component {
  render () {
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>Type: {this.props.type}</div>
        <div>Label: {this.props.label}</div>
        <div>Required: {this.props.required}</div>
        <div>Private: {this.props.private}</div>
      </div>
    );
  }
}

Field.propTypes = {
  name: React.PropTypes.string,
  type: React.PropTypes.oneOf(['text', 'password', 'checkbox', 'radio', 'select']),
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
  private: React.PropTypes.bool
};

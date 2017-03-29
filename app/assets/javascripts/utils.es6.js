class AdoptAUtils{
  static fetch(obj, attr, fail_value = null){
    return (obj !== undefined && obj.hasOwnProperty(attr)) ? obj[attr] : fail_value;
  }
}

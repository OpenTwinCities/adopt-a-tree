class Survey extends FormPartial{
  render(){
    var fetch = AdoptAUtils.fetch;
    return (
      <div>
        <h2>Survey</h2>
        <TextField ref='awareness_code' name='awareness_code' label={I18n.t('labels.tree_tag')} private={true} value={fetch(this.props.value, 'awareness_code')} errors={fetch(this.props.errors, 'awareness_code')}/>
        <TextField ref='yob' name='yob' label={I18n.t('labels.yob')} private={true} value={fetch(this.props.value, 'yob')} errors={fetch(this.props.errors, 'yob')}/>
        <RadioField ref='gender' name='gender' label={I18n.t('labels.gender')} options={Survey.genderOptions} private={true} value={fetch(this.props.value, 'gender')} errors={fetch(this.props.errors, 'gender')} />
        <CheckboxField ref='ethnicity' name='ethnicity' options={Survey.ethnicityOptions} label={I18n.t('labels.ethnicity')} private={true} value={fetch(this.props.value, 'ethnicity')} errors={fetch(this.props.errors, 'ethnicity')}/>
        <CheckboxField ref='heardOfAdoptATreeVia' name='heardOfAdoptATreeVia' options={Survey.heardOfAdoptATreeViaOptions} label={I18n.t('labels.heardOfAdoptATreeVia')} private={true} value={fetch(this.props.value, 'heardOfAdoptATreeVia')} errors={fetch(this.props.errors, 'heardOfAdoptATreeVia')}/>
        <TextField ref='yearsInMinneapolis' name='yearsInMinneapolis' label={I18n.t('labels.yearsInMinneapolis')} private={true} value={fetch(this.props.value, 'yearsInMinneapolis')} errors={fetch(this.props.errors, 'yearsInMinneapolis')}/>
        <RadioField ref='rentOrOwn' name='rentOrOwn' options={Survey.rentOrOwnOptions} label={I18n.t('labels.rentOrOwn')} private={true} value={fetch(this.props.value, 'rentOrOwn')} errors={fetch(this.props.errors, 'rentOrOwn')}/>
        <RadioField ref='previousTreeWateringExperience' name='previousTreeWateringExperience' options={Survey.yesNoOptions} label={I18n.t('labels.previousTreeWateringExperience')} private={true} value={fetch(this.props.value, 'previousTreeWateringExperience')} errors={fetch(this.props.errors, 'previousTreeWateringExperience')}/>
        <RadioField ref='previousEnvironmentalActivities' name='previousEnvironmentalActivities' options={Survey.yesNoOptions} label={I18n.t('labels.previousEnvironmentalActivities')} private={true} value={fetch(this.props.value, 'previousEnvironmentalActivities')} errors={fetch(this.props.errors, 'previousEnvironmentalActivities')}/>
        <RadioField ref='valueForestryWork' name='valueForestryWork' options={Survey.valueForestryWorkOptions} label={I18n.t('labels.valueForestryWork')} private={true} value={fetch(this.props.value, 'valueForestryWork')} errors={fetch(this.props.errors, 'valueForestryWork')}/>
      </div>
    );
  }
}

Survey.genderOptions = [
  {value: 'female', label: I18n.t('labels.female')},
  {value: 'male', label: I18n.t('labels.male')},
  {value: 'other', label: I18n.t('labels.other')}
];

Survey.ethnicityOptions = [
  {value: 'african-american', label: I18n.t('labels.african_american')},
  {value: 'asian-american', label: I18n.t('labels.asian_american_pacific_islander')},
  {value: 'caucasian', label: I18n.t('labels.caucasian')},
  {value: 'hispanic-latino', label: I18n.t('labels.hispanic_latino')},
  {value: 'native-american', label: I18n.t('labels.native_american')},
  {value: 'other', label: I18n.t('labels.other')}
];

Survey.heardOfAdoptATreeViaOptions = [
  {value: 'brew-a-better-forest', label: I18n.t('labels.brewing_a_better_forest')},
  {value: 'minneapolis-park-board', label: I18n.t('sponsors.board')},
  {value: 'tee4trees', label: I18n.t('labels.tees4trees')},
  {value: 'other', label: I18n.t('labels.other')}
];

Survey.rentOrOwnOptions = [
  {value: 'rent', label: I18n.t('labels.rent')},
  {value: 'own', label: I18n.t('labels.own')}
];

Survey.yesNoOptions = [
  {value: true , label: I18n.t('buttons.pos')},
  {value: false, label: I18n.t('buttons.neg')}
];

Survey.valueForestryWorkOptions = [
  {value: 10,  label: '10 - ' + I18n.t('labels.strongly_agree')},
  {value: 9},
  {value: 8},
  {value: 7},
  {value: 6},
  {value: 5},
  {value: 4},
  {value: 3},
  {value: 2},
  {value: 1, label: '1 - ' + I18n.t('labels.strongly_disagree')}
];

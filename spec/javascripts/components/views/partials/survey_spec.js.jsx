describe('Suvey', function(){
  var field, fieldNode, $field;

  var values = {
    awareness_code: '123',
    yob: '1990',
    gender: 'female',
    ethnicity: ['human'],
    heardOfAdoptATreeVia: ['people'],
    yearsInMinneapolis: 50,
    rentOrOwn: 'rent',
    previousTreeWateringExperience: 3,
    previousEnvironmentalActivities: 2,
    valueForestryWork: 5
  };

  var errors = {
    awareness_code: ['123'],
    yob: ['abc'],
    gender: ['456'],
    ethnicity: ['def'],
    heardOfAdoptATreeVia: ['ghi'],
    yearsInMinneapolis: ['789'],
    rentOrOwn: ['jkl'],
    previousTreeWateringExperience: ['mno'],
    previousEnvironmentalActivities: ['pqr'],
    valueForestryWork: ['stu']
  };

  itBehavesLikeAFormPartial(Survey, values, errors);

  beforeEach(function(){
    field = TestUtils.renderIntoDocument(
      <Survey/>
    );
    fieldNode = ReactDOM.findDOMNode(field);
    $field = $(fieldNode);
  });

  it('Has survey fields', function(){
    expect($field.find('input#awareness_code').length).toEqual(1);
    expect($field.find('input#yob').length).toEqual(1);
    expect($field.find('input[name="gender"]').length).toBeGreaterThan(1);
    expect($field.find('input[name="ethnicity[]"]').length).toBeGreaterThan(1);
    expect($field.find('input[name="heardOfAdoptATreeVia[]"]').length).toBeGreaterThan(1);
    expect($field.find('input#yearsInMinneapolis').length).toEqual(1);
    expect($field.find('input[name="rentOrOwn"]').length).toBeGreaterThan(1);
    expect($field.find('input[name="previousTreeWateringExperience"]').length).toBeGreaterThan(1);
    expect($field.find('input[name="previousEnvironmentalActivities"]').length).toBeGreaterThan(1);
    expect($field.find('input[name="valueForestryWork"]').length).toBeGreaterThan(1);
  });
});

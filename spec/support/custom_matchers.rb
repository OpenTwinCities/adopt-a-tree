RSpec::Matchers.define :have_invalid_attribute do |attribute, error_num = 1|
  match do |subject|
    expect(subject).to_not be_valid
    expect(subject.errors[attribute].count).to eq error_num
  end
end

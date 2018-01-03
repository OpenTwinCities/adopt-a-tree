# www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods

  config.before(:suite) do
    FactoryBot.lint
  end
end

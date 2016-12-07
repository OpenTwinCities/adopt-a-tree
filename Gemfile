source 'https://rubygems.org'
ruby '2.2.6'

gem 'rails', '~> 4.1.16'

gem 'autoprefixer-rails'
gem 'bcrypt'
gem 'bootstrap-sass'
gem 'devise'
gem 'geokit'
gem 'haml'
gem 'hashie'
gem 'jquery-rails'
gem 'pg'
gem 'puma'
gem 'rails_admin'
gem 'rails_admin_enum4'
gem 'sass-rails'
gem 'validates_formatting_of'

group :development do
  gem 'annotate'
  gem 'guard-rspec'
  gem 'libnotify' if /linux/ =~ RUBY_PLATFORM
  gem 'growl' if /darwin/ =~ RUBY_PLATFORM
  gem 'spring'
  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  gem 'capistrano-rbenv-install'
  gem 'capistrano3-nginx'
  gem 'capistrano3-puma'
  gem 'dotenv-rails'
  gem 'factory_girl_rails'
  gem 'pry-rails'
  gem 'rspec-rails'
end

group :production do
  gem 'rails_12factor'
end

group :test do
  gem 'capybara'
  gem 'codeclimate-test-reporter', require: nil
  gem 'database_cleaner'
  gem 'faker'
  gem 'launchy'
  gem 'poltergeist'
  gem 'selenium-webdriver'
end

# BEGIN: gems used in test_code.sh script
group :development, :testing do
  gem 'bundler-audit' # Checks for vulnerable versions of gems
  gem 'brakeman' # Checks for security vulnerabilities
  gem 'sandi_meter' # Checks for compliance with Sandi Metz' four rules
  gem 'gemsurance' # Checks for outdated and insecure gems
end
# END: gems used in test_code.sh script

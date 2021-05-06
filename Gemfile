source 'https://rubygems.org'
ruby '2.6.6'

gem 'pg', '~> 1.2.3'
gem 'rails', '~> 6.1.3'

gem 'autoprefixer-rails', '~> 10.2.4.0'
gem 'aws-sdk-ec2', '~> 1'
gem 'bcrypt', '~> 3.1.11'
gem 'bootstrap-sass', '~> 3.4.1'
gem 'devise', '~> 4.7.3'
gem 'geokit', '~> 1.13.1'
gem 'haml', '~> 5.2.1'
gem 'hashie', '~> 4.1.0'
gem 'jquery-rails', '~> 4.4.0'
gem 'puma', '~> 3.12.6'
gem 'rails_admin', '~> 2.1.1'
gem 'sass-rails', '~> 5.1.0'
gem 'validates_formatting_of', '~> 0.9.0'

group :development do
  gem 'guard-rspec', '~> 4.7.3'
  gem 'libnotify' if /linux/ =~ RUBY_PLATFORM
  gem 'growl' if /darwin/ =~ RUBY_PLATFORM
  gem 'spring', '~> 2.1.1'
  gem 'spring-commands-rspec', '~> 1.0.4'
  gem 'byebug', '~> 11.1.3'
end

group :development, :test do
  gem 'capistrano', '~> 3.16.0'
  gem 'capistrano-bundler', '~> 1.5.0'
  gem 'capistrano-rails', '~> 1.4.0'
  gem 'capistrano-rbenv', '~> 2.1.3'
  gem 'capistrano-rbenv-install', '~> 1.2.0'
  gem 'capistrano3-nginx', '~> 3.0.1'
  gem 'capistrano3-puma', '~> 3.1.1'
  gem 'dotenv-rails', '~> 2.7.4'
  gem 'faker', '~> 2.17.0'
  gem 'factory_bot_rails', '~> 6.1.0'
  gem 'pry-rails', '~> 0.3.4'
  gem 'rspec-rails', '~> 5.0.1'
end

group :production do
  gem 'rails_12factor', '~> 0.0.3'
end

group :test do
  gem 'capybara', '~> 3.35.3'
  gem 'capybara-slow_finder_errors', '0.1.5'
  gem 'database_cleaner', '~> 2.0.1'
  gem 'launchy', '~> 2.5.0'
  gem 'poltergeist', '~> 1.18.0'
  gem 'rails-controller-testing', '~> 1.0.2'
  gem 'selenium-webdriver', '~> 3.142.7'
end

# BEGIN: gems used in docker/test_code script
group :development, :testing do
  # gem 'bundler-audit' # Checks for vulnerable versions of gems
  # gem 'brakeman' # Checks for security vulnerabilities
  # gem 'sandi_meter' # Checks for compliance with Sandi Metz' four rules
  # gem 'gemsurance' # Checks for outdated and insecure gems
end
# END: gems used in docker/test_code script

# BEGIN: test coverage
gem 'codecov', '0.5.1', require: false, group: :test
gem 'simplecov', '0.21.2', require: false, group: :test
# END: test coverage

# BEGIN: docker/outline
group :development do
  gem 'annotate', '~> 3.1.1' # Adds comments listing parameters and the output of "rails routes"
  # gem 'railroady' # Generates block diagrams of controllers
  # gem 'rails-erd' # Generates block diagram of models
end
# END: docker/outline

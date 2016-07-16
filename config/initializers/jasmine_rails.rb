#if Rails.env.in? %w(test development)
#  require 'jasmine_rails/runner'
#
#  module JasmineRails
#    module Runner
#      class << self
#        private
#        def run_cmd(cmd)
#          puts "Running `#{cmd}`"
#          system(cmd)
#        end
#      end
#    end
#  end
#end

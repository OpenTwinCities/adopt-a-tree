require 'aws-sdk-ec2'

def wait_for_instances(ec2, state, ids)
  begin
    ec2.wait_until(state, instance_ids: ids)
    puts "Success: #{state}."
  rescue Aws::Waiters::Errors::WaiterFailed => error
    puts "Failed: #{error.message}"
  end
end

namespace :aws do
  namespace :ec2 do
    task :client do
      @ec2 = Aws::EC2::Client.new
    end

    desc 'Start the provided EC2 instances'
    task :start => :client do |task, args|
      puts "Attempting to start provided instances. This may take a few minutes..."
      @ec2.start_instances({instance_ids: args})
      wait_for_instances(@ec2, :instance_running, args)
    end

    desc 'Stop the provided EC2 instances'
    task :stop => :client  do |task, args|
      puts "Attempting to start provided instances. This may take a few minutes..."
      @ec2.stop_instances({instance_ids: args})
      wait_for_instances(@ec2, :instance_stopped, args)
    end
  end
end

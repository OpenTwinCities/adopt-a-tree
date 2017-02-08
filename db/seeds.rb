n = 10

trees_file_path = Rails.root.join('db', 'trees.json')
puts "Reading and parsing #{trees_file_path}"
puts "NOTE: To save time during the seeding process,"
puts "only 1 out of #{n} trees will be fed into the database."
trees_file      = File.read(trees_file_path)
trees_hash      = JSON.parse(trees_file)

# this is a weird nested hash
trees_meta = trees_hash["meta"]
# this is just a huge array
trees_data = trees_hash["data"]
# this is an array of all the field names
tree_fields = trees_meta['view']['columns'].map do |column|
  column['fieldName']
end

puts 'Processing trees'

num_trees = trees_data.length
puts "Number of trees: #{num_trees}"
i = 0

trees_data.each do |tree|
  if i % n == 0
    Thing.find_or_create_by!(mpls_id: tree[8]) do |t|
      t.properties = {}
      tree_fields.map.with_index do |f, index|
        t.properties[tree_fields[index]] = tree[index]
      end

      t.mpls_unique = tree[9]
      t.lng         = tree[64]
      t.lat         = tree[65]
      t.species     = tree[66]
    end
  end
  i += 1
  print " #{i} " if (i % 100).zero?
end

puts "Finished processing #{num_trees} trees"

User.create!(last_name: 'Tarter', first_name: 'Jill',
             username: 'jtarter',
             email: 'jill_tarter@rubyonracetracks.com',
             organization: 'SETI Institute',
             address_1: Faker::Address.street_address,
             city: Faker::Address.city,
             state: Faker::Address.state_abbr,
             zip: Faker::Address.zip_code,
             admin: true,
             password: 'Drake Equation',
             password_confirmation: 'Drake Equation')

puts "Users: #{User.count}/52"

User.create!(last_name: 'Arroway', first_name: 'Ellie',
             username: 'earroway',
             email: 'ellie_arroway@rubyonracetracks.com',
             organization: 'Project Argus',
             address_1: Faker::Address.street_address,
             city: Faker::Address.city,
             state: Faker::Address.state_abbr,
             zip: Faker::Address.zip_code,
             admin: false,
             password: '3.14159265',
             password_confirmation: '3.14159265')

puts "Users: #{User.count}/52"

10.times do |n|
  name_l = Faker::Name.last_name
  name_f = Faker::Name.first_name
  email_address = "user-#{n + 1}@rubyonracetracks.com"

  User.create!(last_name: name_l, first_name: name_f,
               username: "user#{n + 1}",
               email: email_address,
               organization: "#{Faker::Company.name} #{Faker::Company.suffix}",
               address_1: Faker::Address.street_address,
               city: Faker::Address.city,
               state: Faker::Address.state_abbr,
               zip: Faker::Address.zip_code,
               admin: false,
               password: 'Daytona 500',
               password_confirmation: 'Daytona 500')
  print  " #{User.count} " if (User.count % 10).zero?
end

40.times do |n|
  name_l = Faker::Name.last_name
  name_f = Faker::Name.first_name
  email_address = Faker::Internet.email(name_f)

  User.create!(last_name: name_l, first_name: name_f,
               username: "user-faker#{n + 1}", email: email_address,
               organization: "#{Faker::Company.name} #{Faker::Company.suffix}",
               address_1: Faker::Address.street_address,
               city: Faker::Address.city,
               state: Faker::Address.state_abbr,
               zip: Faker::Address.zip_code,
               admin: false,
               password: 'Daytona 500',
               password_confirmation: 'Daytona 500')
  print " #{User.count} " if (User.count % 10).zero?
end

puts "Users: #{User.count}/52"

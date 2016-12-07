trees_file_path = Rails.root.join('db', 'trees.json')
puts "Reading and parsing #{trees_file_path}"
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
  i += 1
  print " #{i}/#{num_trees} " if (i % 100).zero?
end

puts "Finished processing #{num_trees} trees"

def parse_tree_json(file_path)
  trees_file      = File.read(file_path)
  trees_hash      = JSON.parse(trees_file)

  # this is a weird nested hash
  trees_meta = trees_hash["meta"]
  # this is just a huge array
  trees_data = trees_hash["data"]

  return trees_meta, trees_data
end

namespace :db do
  namespace :trees do
    desc 'List the fields contained in the provided file'
    task :list_fields, [:file_path] => :environment do |task, args|
      trees_meta, trees_data = parse_tree_json(args.file_path)
      # this is an array of all the field names
      tree_fields = trees_meta['view']['columns'].each_with_index do |column, i|
        puts "#{i} - #{column['fieldName']}"
      end
    end

    desc 'Import tree data from the provided file'
    task :import, [:file_path, :mpls_id_col, :mpls_uniq_col, :lng_col, :lat_col, :species_col] => :environment do |task, args|
      trees_meta, trees_data = parse_tree_json(args.file_path)
      # this is an array of all the field names
      tree_fields = trees_meta['view']['columns'].map do |column|
        column['fieldName']
      end
      
      trees_data.each do |tree|
        Thing.find_or_create_by!(mpls_id: tree[args.mpls_id_col.to_i]) do |t|
          t.properties = {}
          tree_fields.map.with_index do |f, index|
            t.properties[tree_fields[index]] = tree[index]
          end
      
          t.mpls_unique = tree[args.mpls_uniq_col.to_i]
          t.lng         = tree[args.lng_col.to_i]
          t.lat         = tree[args.lat_col.to_i]
          t.species     = tree[args.species_col.to_i]
        end
      end
    end

    desc "Replace (mostly) the database's trees with the provided file" 
    task :replace, [:file_path, :mpls_id_col, :mpls_uniq_col, :lng_col, :lat_col, :species_col] => :environment do |task, args|
      # 1.) Get a list of all adopted trees
      # 2.) Get a list of all trees in the DB that are not in the provided file
      # 3.) Delete all trees from 2 that are not adopted
      # 4.) Do :import
    end

    desc "List Minneapolis IDs of Trees currently in the DB that are not in the file to be imported"
    task :db_only, [:file_path, :mpls_id_col] => :environment do |task, args|
      trees_meta, trees_data = parse_tree_json(args.file_path)
      file_tree_ids = trees_data.map{|tree| tree[args.mpls_id_col.to_i].to_i}
      db_only_ids = Thing.pluck(:mpls_id) - file_tree_ids
      db_only_ids.each do |tree_id| 
        tree = Thing.find_by(mpls_id: tree_id)
        puts tree.mpls_id
        puts '\t Adopted' if tree.adopted?
      end
    end
  end
end

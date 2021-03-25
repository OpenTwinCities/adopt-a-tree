# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_01_06_164112) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", id: :serial, force: :cascade do |t|
    t.integer "event_type", null: false
    t.integer "thing_id"
    t.integer "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reminders", id: :serial, force: :cascade do |t|
    t.integer "thing_id", null: false
    t.integer "from_user_id", null: false
    t.integer "to_user_id", null: false
    t.boolean "sent", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["from_user_id"], name: "index_reminders_on_from_user_id"
    t.index ["thing_id"], name: "index_reminders_on_thing_id"
    t.index ["to_user_id"], name: "index_reminders_on_to_user_id"
  end

  create_table "things", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.integer "mpls_id"
    t.string "mpls_unique"
    t.decimal "lat", precision: 32, scale: 29, null: false
    t.decimal "lng", precision: 32, scale: 29, null: false
    t.string "species"
    t.json "properties"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username", null: false
    t.string "organization"
    t.string "voice_number"
    t.string "sms_number"
    t.string "address_1"
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.boolean "admin", default: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "yob"
    t.string "gender"
    t.string "ethnicity", array: true
    t.integer "yearsInMinneapolis"
    t.string "rentOrOwn"
    t.boolean "previousTreeWateringExperience"
    t.boolean "previousEnvironmentalActivities"
    t.integer "valueForestryWork"
    t.string "heardOfAdoptATreeVia", array: true
    t.string "awareness_code"
    t.string "first_name"
    t.string "last_name"
    t.datetime "emailed_at"
    t.datetime "mailed_token_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

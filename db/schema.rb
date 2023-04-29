# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_28_230158) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cars", force: :cascade do |t|
    t.string "make", null: false
    t.string "model", null: false
    t.integer "year", null: false
    t.integer "mpg", null: false
    t.integer "doors_count", null: false
    t.integer "seats_count", null: false
    t.string "category", null: false
    t.boolean "automatic", default: true
    t.text "description", null: false
    t.text "guidelines", null: false
    t.integer "daily_rate", null: false
    t.text "location", default: [], array: true
    t.boolean "active", default: true
    t.bigint "host_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["host_id"], name: "index_cars_on_host_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "cleanliness_rating", null: false
    t.integer "maintenance_rating", null: false
    t.integer "communication_rating", null: false
    t.integer "convenience_rating", null: false
    t.integer "accuracy_rating", null: false
    t.string "comment", null: false
    t.bigint "driver_id", null: false
    t.bigint "car_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_reviews_on_car_id"
    t.index ["driver_id", "car_id"], name: "index_reviews_on_driver_id_and_car_id", unique: true
    t.index ["driver_id"], name: "index_reviews_on_driver_id"
  end

  create_table "trips", force: :cascade do |t|
    t.integer "total_price", null: false
    t.datetime "start_date", null: false
    t.datetime "end_date", null: false
    t.string "protection_plan", null: false
    t.bigint "driver_id", null: false
    t.bigint "car_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_trips_on_car_id"
    t.index ["driver_id"], name: "index_trips_on_driver_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.boolean "approved_to_drive", default: true
    t.boolean "is_superhost", default: false
    t.boolean "is_clean_certified", default: false
    t.string "email", null: false
    t.string "phone_number"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cars", "users", column: "host_id"
  add_foreign_key "reviews", "cars"
  add_foreign_key "reviews", "users", column: "driver_id"
  add_foreign_key "trips", "cars"
  add_foreign_key "trips", "users", column: "driver_id"
end

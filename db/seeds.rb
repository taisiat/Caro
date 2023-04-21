# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    first_name: "Dominic",
    last_name: "Toretto",
    approved_to_drive: true,
    is_superhost: true,
    is_clean_certified: true,
    email: "dominic.toretto@example.com",
    phone_number: "222-333-4444",
    password: 'password1',
    created_at: "2023-02-14T00:00:00.000Z"
  )

    User.create!(
        first_name: "John",
        last_name: "Wick",
        approved_to_drive: false,
        is_superhost: false,
        is_clean_certified: true,
        email: "john.wick@example.com",
        phone_number: "999-888-7777",
        password: 'password22',
        created_at: "2022-01-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password2',
        first_name: "Emma",
        last_name: "Watson",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "emma.watson@example.com",
        phone_number: "222-222-2222",
        created_at: "2022-02-14T00:00:00.000Z"
    )

    User.create!(
        password: 'password6',
        first_name: "Tom",
        last_name: "Hanks",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: true,
        email: "tom.hanks@example.com",
        phone_number: "666-666-6666",
        created_at: "2022-12-25T00:00:00.000Z"
    )

    User.create!(
        password: 'password3',
        first_name: "Elon",
        last_name: "Musk",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: false,
        email: "elon.musk@example.com",
        phone_number: "333-333-3333",
        created_at: "2021-11-11T00:00:00.000Z"
    )

    User.create!(
        password: 'password4',
        first_name: "Serena",
        last_name: "Williams",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: false,
        email: "serena.williams@example.com",
        phone_number: "444-444-4444",
        created_at: "2022-01-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password5',
        first_name: "Harry",
        last_name: "Potter",
        approved_to_drive: false,
        is_superhost: false,
        is_clean_certified: false,
        email: "harry.potter@example.com",
        phone_number: "555-555-5555",
        created_at: "2023-03-15T00:00:00.000Z"
    )

    User.create!(
        password: 'password7',
        first_name: "Beyonce",
        last_name: "Knowles",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "beyonce.knowles@example.com",
        phone_number: "777-777-7777",
        created_at: "2021-07-04T00:00:00.000Z"
    )

    User.create!(
        password: 'password8',
        first_name: "Leonardo",
        last_name: "DiCaprio",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: false,
        email: "leonardo.dicaprio@example.com",
        phone_number: "888-888-8888",
        created_at: "2022-06-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password9',
        first_name: "Jennifer",
        last_name: "Lawrence",
        approved_to_drive: false,
        is_superhost: true,
        is_clean_certified: true,
        email: "jennifer.lawrence@example.com",
        phone_number: "999-999-9999",
        created_at: "2023-02-14T00:00:00.000Z"
    )

    User.create!(
        password: 'password10',
        first_name: "Michael",
        last_name: "Jordan",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "michael.jordan@example.com",
        phone_number: "000-000-0000",
        created_at: "2021-08-08T00:00:00.000Z"
    )

    User.create!(
        password: 'password11',
        first_name: "Wonder",
        last_name: "Woman",
        approved_to_drive: false,
        is_superhost: false,
        is_clean_certified: true,
        email: "wonder.woman@example.com",
        phone_number: "111-222-3333",
        created_at: "2022-09-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password12',
        first_name: "John",
        last_name: "Travolta",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "john.travolta@example.com",
        phone_number: "222-333-4444",
        created_at: "2021-12-31T00:00:00.000Z"
    )

    User.create!(
        password: 'password13',
        first_name: "Taylor",
        last_name: "Swift",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: true,
        email: "taylor.swift@example.com",
        phone_number: "333-444-5555",
        created_at: "2022-01-15T00:00:00.000Z"
    )

    User.create!(
        password: 'password14',
        first_name: "James",
        last_name: "Bond",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "james.bond@example.com",
        phone_number: "444-555-6666",
        created_at: "2021-06-30T00:00:00.000Z"
    )

    User.create!(
        password: 'password15',
        first_name: "Katy",
        last_name: "Perry",
        approved_to_drive: false,
        is_superhost: true,
        is_clean_certified: true,
        email: "katy.perry@example.com",
        phone_number: "555-666-7777",
        created_at: "2023-03-10T00:00:00.000Z"
    )

    User.create!(
        password: 'password16',
        first_name: "Tony",
        last_name: "Stark",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: false,
        email: "tony.stark@example.com",
        phone_number: "666-777-8888",
        created_at: "2021-05-15T00:00:00.000Z"
    )

    User.create!(
        password: 'password17',
        first_name: "Steve",
        last_name: "Jobs",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "steve@example.com",
        phone_number: "777-888-9999",
        created_at: "2022-11-11T00:00:00.000Z"
    )

    User.create!(
        password: 'password18',
        first_name: "Allie",
        last_name: "Wong",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: true,
        email: "allie@example.com",
        phone_number: "888-999-0000",
        created_at: "2023-01-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password19',
        first_name: "Adele",
        last_name: "Adkins",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "adele.adkins@example.com",
        phone_number: "999-000-1111",
        created_at: "2021-09-20T00:00:00.000Z"
    )

    User.create!(
        password: 'password20',
        first_name: "Han",
        last_name: "Lue",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "han.lue@example.com",
        phone_number: "777-888-9999",
        created_at: "2023-04-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password21',
        first_name: "Letty",
        last_name: "Ortiz",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "letty.ortiz@example.com",
        phone_number: "111-222-3333",
        created_at: "2022-05-05T00:00:00.000Z"
    )

    User.create!(
        password: 'password25',
        first_name: "Roman",
        last_name: "Pearce",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "roman.pearce@example.com",
        phone_number: "555-666-7777",
        created_at: "2022-06-20T00:00:00.000Z"
    )

    User.create!(
        password: 'password23',
        first_name: "Mia",
        last_name: "Toretto",
        approved_to_drive: true,
        is_superhost: false,
        is_clean_certified: true,
        email: "mia.toretto@example.com",
        phone_number: "333-444-5555",
        created_at: "2022-09-01T00:00:00.000Z"
    )

    User.create!(
        password: 'password24',
        first_name: "Brian",
        last_name: "O'Conner",
        approved_to_drive: true,
        is_superhost: true,
        is_clean_certified: false,
        email: "brian.oconner@example.com",
        phone_number: "444-555-6666",
        created_at: "2021-08-12T00:00:00.000Z"
    )

  puts "Done!"
end
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

// Models
const User = require('./models/userModel');
const Merch = require('./models/merchModel');
const Show = require('./models/showModel');
const Track = require('./models/trackModel');
const Album = require('./models/albumModel');

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('DB connection error:', err));

// Read JSON data files
const users = JSON.parse(fs.readFileSync('./dev-data/users.json', 'utf-8'));
const merchItems = JSON.parse(
  fs.readFileSync('./dev-data/merch.json', 'utf-8')
);
const shows = JSON.parse(fs.readFileSync('./dev-data/shows.json', 'utf-8'));
const tracks = JSON.parse(fs.readFileSync('./dev-data/tracks.json', 'utf-8'));
const albums = JSON.parse(fs.readFileSync('./dev-data/albums.json', 'utf-8'));

// Import Data Function
const importData = async () => {
  try {
    // Insert data into DB
    await User.create(users);
    await Merch.create(merchItems);
    await Show.create(shows);
    await Track.create(tracks);
    await Album.create(albums);

    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.error('Error loading data:', err);
    process.exit(1);
  }
};

// Delete Data Function
const deleteData = async () => {
  try {
    // Delete all data from DB
    await User.deleteMany();
    await Merch.deleteMany();
    await Show.deleteMany();
    await Track.deleteMany();
    await Album.deleteMany();

    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1);
  }
};

// Command-line arguments handling
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(
    'Invalid command. Use --import to import data or --delete to delete data.'
  );
  process.exit(1);
}

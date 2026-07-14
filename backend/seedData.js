const mongoose = require('mongoose');
const Sprite = require('./models/Sprite');
const dotenv = require('dotenv');

dotenv.config();

const sampleSprites = [
  // Skins
  { name: 'Jonesy', category: 'skin', rarity: 'common', season: 1, imageUrl: 'https://via.placeholder.com/200?text=Jonesy' },
  { name: 'Ramirez', category: 'skin', rarity: 'uncommon', season: 1, imageUrl: 'https://via.placeholder.com/200?text=Ramirez' },
  { name: 'Brutus', category: 'skin', rarity: 'epic', season: 12, imageUrl: 'https://via.placeholder.com/200?text=Brutus' },
  
  // Back Blings
  { name: 'Elite Shield', category: 'back_bling', rarity: 'common', season: 1, imageUrl: 'https://via.placeholder.com/200?text=EliteShield' },
  { name: 'Assassin Pack', category: 'back_bling', rarity: 'epic', season: 1, imageUrl: 'https://via.placeholder.com/200?text=AssassinPack' },
  
  // Pickaxes
  { name: 'Pickaxe', category: 'pickaxe', rarity: 'common', season: 1, imageUrl: 'https://via.placeholder.com/200?text=Pickaxe' },
  { name: 'Crowbar', category: 'pickaxe', rarity: 'rare', season: 1, imageUrl: 'https://via.placeholder.com/200?text=Crowbar' },
  
  // Gliders
  { name: 'Glider', category: 'glider', rarity: 'common', season: 1, imageUrl: 'https://via.placeholder.com/200?text=Glider' },
  { name: 'Battle Bus', category: 'glider', rarity: 'legendary', season: 1, imageUrl: 'https://via.placeholder.com/200?text=BattleBus' },
  
  // Emotes
  { name: 'Take the L', category: 'emote', rarity: 'rare', season: 3, imageUrl: 'https://via.placeholder.com/200?text=TakeTheL' },
  { name: 'Orange Justice', category: 'emote', rarity: 'rare', season: 4, imageUrl: 'https://via.placeholder.com/200?text=OrangeJustice' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Sprite.deleteMany({});
    await Sprite.insertMany(sampleSprites);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

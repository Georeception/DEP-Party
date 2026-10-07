const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const images = [
  {
    name: 'chairman-placeholder.jpg',
    url: 'https://placehold.co/800x600/e3e3e3/31343C?text=National+Chairman'
  },
  {
    name: 'award-placeholder.jpg',
    url: 'https://placehold.co/800x600/e3e3e3/31343C?text=Award'
  },
  {
    name: 'activism-placeholder.jpg',
    url: 'https://placehold.co/800x600/e3e3e3/31343C?text=Activism'
  },
  {
    name: 'forum-placeholder.jpg',
    url: 'https://placehold.co/800x600/e3e3e3/31343C?text=Forum'
  }
];

const downloadAllImages = async () => {
  const publicDir = path.join(__dirname, '../public/images');
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const image of images) {
    const filepath = path.join(publicDir, image.name);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.name}`);
    } catch (err) {
      console.error(`Error downloading ${image.name}:`, err.message);
    }
  }
};

downloadAllImages(); 
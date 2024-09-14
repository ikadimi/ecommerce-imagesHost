const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Paths to the input and output directories
const inputDir = path.join(__dirname, 'public/product/images');
const output500Dir = path.join(__dirname, 'public/product/images/500x500');
const output270Dir = path.join(__dirname, 'public/product/images/270x270');

// Ensure the output directory exists
if (!fs.existsSync(output500Dir)) {
  fs.mkdirSync(output500Dir, { recursive: true });
}
if (!fs.existsSync(output270Dir)) {
  fs.mkdirSync(output270Dir, { recursive: true });
}

// Function to resize an image
function resizeImageto500(inputPath, outputPath) {
  sharp(inputPath)
    .resize(500, 500)
    .toFormat('webp')
    .toFile(outputPath)
    .then(() => {
      console.log(`Resized and saved: ${outputPath}`);
    })
    .catch(err => {
      console.error(`Error resizing ${inputPath}: `, err);
    });
}
function resizeImageto270(inputPath, outputPath) {
  sharp(inputPath)
    .resize(270, 270)
    .toFormat('webp')
    .toFile(outputPath)
    .then(() => {
      console.log(`Resized and saved: ${outputPath}`);
    })
    .catch(err => {
      console.error(`Error resizing ${inputPath}: `, err);
    });
}

// Function to process all images in the directory
function resizeImagesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return console.error('Unable to read directory:', err);
    }

    files.forEach(file => {
      const inputFilePath = path.join(directory, file);

      // Ensure it's a file and not a directory
      if (fs.lstatSync(inputFilePath).isFile()) {
        const ext = path.extname(file).toLowerCase();
        // Check if the file is an image (JPEG, PNG)
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp' || ext === '.avif') {
          const fileName = `${file.split('.')[0]}.webp`
          const outputFilePath500 = path.join(output500Dir, fileName);
          const outputFilePath270 = path.join(output270Dir, fileName);

          // Resize the image
          resizeImageto500(inputFilePath, outputFilePath500);
          resizeImageto270(inputFilePath, outputFilePath270);
        }
      }
    });
  });
}

// Run the resizing process
resizeImagesInDirectory(inputDir);

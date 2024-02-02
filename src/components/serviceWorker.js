function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

let image = document.querySelector('#image');
image.addEventListener('change', async function() {
  // GET IMAGE
  const imageFile = this.files[0];

  // SET OPTIONS
  const options = {
      maxSizeMB: document.getElementById('maxsize').value,
      maxWidthOrHeight: document.getElementById('resolution').value,
      useWebWorker: true
  }

  document.getElementById('loading').classList.remove('hidden');
  document.querySelector('#compression-success').textContent = '';
  document.querySelector('#compression-download').textContent = '';
  document.querySelector('#orig-size').textContent = '';
  document.querySelector('#new-size').textContent = '';

  try {
      const compressedFile = await imageCompression(imageFile, options);

      // DISPLAY FILE SIZES
      document.querySelector('#orig-size').textContent = readableBytes(imageFile.size);
      document.querySelector('#new-size').textContent = readableBytes(compressedFile.size);
      document.querySelector('#compression-success').textContent = 'Compression successful!';
      document.querySelector('#compression-download').textContent = 'Download your compressed file!';

      // SET OUTPUT IMAGE
      let output = document.querySelector('#output');
      var img = document.getElementById('output');
      img.classList.remove('hidden'); 
    
      output.src = URL.createObjectURL(compressedFile);

      // SHOW HIDDEN ELEMENTS
      document.getElementById('loading').classList.add('hidden');

      let infoContainer = document.querySelector('#info-container');
      infoContainer.style.display = 'flex';

      let dlContainer = document.querySelector('#dl-container');
      dlContainer.style.display = 'flex';

      // SET SOURCE IN DL BUTTON
      let dl = document.querySelector('#download-link');
      dl.setAttribute('href', output.src);
      
  } catch(error) {
      console.log(error);
      document.getElementById('loading').classList.add('hidden');
  }
});
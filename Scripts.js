// Function to get the query parameter from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to sanitize and format the name for folder/filenames
function sanitizeName(name) {
  return name.toLowerCase().replace(/\s+/g, '_');
}

// Fetch characters from JSON and dynamically create the character selection grid
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
      const characterGrid = document.getElementById('characterGrid');
      data.characters.forEach(character => {
          const sanitizedName = sanitizeName(character.name);
          const imagePath = `images/${sanitizedName}/${sanitizedName}.png`; // Dynamically generate the image path inside character folder
          const voicelinesFile = `characters/${sanitizedName}.json`;

          const characterDiv = document.createElement('div');
          characterDiv.classList.add('character');
          characterDiv.innerHTML = `
              <img src="${imagePath}" alt="${character.name}">
              <p>${character.name}</p>
          `;
          characterDiv.onclick = () => {
              window.location.href = `character.html?name=${sanitizedName}`;
          };
          characterGrid.appendChild(characterDiv);
      });
  })
  .catch(error => console.error('Error loading characters:', error));



// Variables to keep track of currently playing audio
let currentAudio = null;

// Function to play the audio
function playVoice(file) {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(file);
  currentAudio.play();
}

// Function to stop the audio
function stopVoice() {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
  }
}

document.addEventListener('DOMContentLoaded', function () {
    // Character selection page
    if (document.getElementById('character-list')) {
      fetch('assets/json/characters.json')
        .then(response => response.json())
        .then(data => {
          const characterList = document.getElementById('character-list');
          data.characters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character-item';
            characterDiv.innerHTML = `
              <img src="assets/photos/${character.name}/${character.name}.png" alt="${character.name}">
              <a href="character.html?name=${character.name}">${character.name}</a>
            `;
            characterList.appendChild(characterDiv);
          });
        });
    }
  
    // Character page
    if (document.getElementById('voiceline-player')) {
      const urlParams = new URLSearchParams(window.location.search);
      const characterName = urlParams.get('name');
  
      fetch(`assets/json/${characterName}.json`)
        .then(response => response.json())
        .then(data => {
          const voicelinePlayer = document.getElementById('voiceline-player');
          data.voicelines.forEach(line => {
            const voicelineDiv = document.createElement('div');
            voicelineDiv.className = 'voiceline-item';
            voicelineDiv.innerHTML = `
              <strong>${line.title}</strong>
              <p>${line.text}</p>
              <audio controls>
                <source src="assets/ogg/${characterName}/${line.filename}" type="audio/ogg">
                Your browser does not support the audio element.
              </audio>
            `;
            voicelinePlayer.appendChild(voicelineDiv);
          });
        });
    }
  });
  
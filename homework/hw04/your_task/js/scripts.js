const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    const elem = document.querySelector('#tracks');
    elem.innerHTML = "";

    fetch(baseURL + "?type=track&q=" + term)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                data.forEach((element,index) => {
                    if(index >= 5) return
                    elem.innerHTML += getTracksHTML(element);
                });
           
            }
            
            else {
                elem.innerHTML += `<p>No tracks found that match your search criteria.</p>`;
            }
        });
};

const getAlbums = (term) => {
    const elem = document.querySelector('#albums');
    elem.innerHTML = "";

    fetch(baseURL + "?type=album&q=" + term)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                console.log(data,"datadatadatadata");
                data.forEach((element,index) => {
                    elem.innerHTML += getAlbumsHTML(element);
                })
            }
            else {
                elem.innerHTML += `<p>no results returned</p>`;
            }
        });
};
const getArtist = (term) => {
    const elem = document.querySelector('#artist');
    elem.innerHTML = "";

    fetch(baseURL + "?type=artist&q=" + term)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                const firstArtis = data[0];
                elem.innerHTML += getArtistHTML(firstArtis);
            }
            else {
                elem.innerHTML += `<p>no results returned</p>`;
            }
        });
};

const getArtistHTML = (data) => {
    if (!data.image_url) {
        data.image_url =
            "http://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png";
    }
    return ` 
    <section class="artist-card" id="${data.id}">
    <div>
        <img alt="Image of ${data.name}" src="${data.image_url}">
        <h2>${data.name}</h2>
        <div class="footer">
            <a href="${data.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</section>`;
};

const getTracksHTML = (data) => {
    if (!data.album.image_url) {
        data.image_url =
            "http://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png";
    }
    return `    
        <button class="track-item preview" onclick="handleTrackClick(this)" 
        data-name="${data.name}" 
        data-artist-name="${data.artist.name}" 
        data-image-url="${data.album.image_url}" 
        data-preview-track="${data.preview_url}">
        <img  src="${data.album.image_url}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
        <h2>${data.name}</h2>
            <p>
                ${data.artist.name}
            </p>
        </div>
    </button>`;
};

const getAlbumsHTML = (data) => {
    if (!data.image_url) {
        data.image_url =
            "http://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png";
    }
    return `    
    <section class="album-card" id="2lATw9ZAVp7ILQcOKPCPqp">
    <div>
        <img src="${data.image_url}">
        <h2>${data.name}</h2>
        <div class="footer">
            <a href="${data.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</section>`;
};
const getCurrentHTML = (music) => {
    return `    
    <img src="${music.image}">
    <i class="fas play-track fa-pause" aria-hidden="true"></i>
    <div class="label">
        <h2>${music.name}</h2>
        <p>
            ${music.artistName}
        </p>
    </div>`;
};

const updateCurrentTrack = (music) => {
    const elem = document.querySelector('#current-track');
    elem.innerHTML = getCurrentHTML(music);
};

const handleTrackClick = (ev) => {
    console.log(ev);
    const music = {}
     music.previewUrl = ev.getAttribute('data-preview-track');
     music.name = ev.getAttribute('data-name');
     music.artistName = ev.getAttribute('data-artist-name');
     music.image = ev.getAttribute('data-image-url');
    const audio =  AudioPlayer('.player', music.previewUrl );
    updateCurrentTrack(music)
    audio.play();
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
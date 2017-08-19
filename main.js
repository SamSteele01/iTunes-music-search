/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

// url = https://itunes.apple.com/search?parameterkeyvalue

let list = document.querySelector('.results');
let button = document.getElementById('button');
let input = document.getElementById('search');
button.addEventListener('click', fetchSearch );
input.addEventListener('keypress', function(e) {
// var key = e.which || e.keyCode;
if (e.keyCode === 13) {
  e.preventDefault();
  fetchSearch()}});
function fetchSearch() {
  console.log("Button press");
  let searchTerm = document.getElementById('search').value

  let address = `https://itunes.apple.com/search?term=${searchTerm}`

  list.innerHTML = ``;
  fetch(address)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          console.log("Here is the data:", data);
          // need img, song title, and band name

          data.results.map((key) =>{
          let image = key.artworkUrl100;
          let songName = key.trackName;
          let artist = key.artistName;
          let audio = key.previewUrl;
          let searchResult =`
            <div class="search-result" id=${audio}>
              <img src="${image}" alt="">
              <p>${songName}</p>
              <p>${artist}</p>
            </div>`
            console.log(image);
            console.log(songName);
            console.log(artist);
            list.innerHTML += searchResult;
        })
        // need to have click listener for song src
        // container is "results"
        let player = document.getElementById('audio');
        list.addEventListener('click', playAudio);
        function playAudio(e) {
          console.log(e.target.id);
          player.setAttribute('src', e.target.id);
        }

        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

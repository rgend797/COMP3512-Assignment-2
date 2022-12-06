const artist = JSON.parse(artistContent);
const genre = JSON.parse(genreContent);
const songy = JSON.parse(getFile);

let enabled = null;
let list = [];
let dir = 1;
let favorites = [];

const filterBody = document.querySelector("#filterTable tbody");
const favoriteBody = document.querySelector("#favoriteTable tbody");
const form = document.getElementById("form");
const filter = document.getElementById("filter");
const columnHeader = document.getElementById("columnHeader");
const songInformation = document.getElementById("songInformation");
const songInfoList = document.getElementById("songInfoList");
const playInfo = document.querySelector("#playlistPage div span");
const searchPage = document.getElementById("searchPage");
const songPage = document.getElementById("songPage");
const playlistPage = document.getElementById("playlistPage");

let radar = [1, 1, 1, 1];
let chart = document.getElementById("chart");
// Below here is the search stuff
document.addEventListener("DOMContentLoaded", function () {
    
    
    
    list = songy;
    filterBody.innerHTML = createSongList(list);
    
    
    
  //Filter
  form.addEventListener("change", function (e) {
    if (e.target.id == "search") {
      document.querySelector("#title").disabled = true;
      document.querySelector("#artist").disabled = true;
      document.querySelector("#genre").disabled = true;
      e.target.nextElementSibling.nextElementSibling.disabled = false;
      enabled = e.target.nextElementSibling.nextElementSibling;
    }
  });

  //Filter
  filter.addEventListener("click", function () {
    if (enabled != null) {
      if (enabled.parentElement.parentElement && enabled.value != "") {
        if (enabled.id == "title") {
          list = songy.filter(e => String(e.title).toLowerCase().includes(String(enabled.value).toLowerCase()));
        } else if (enabled.id == "artist") {
          list = songy.filter(e => e.artist.name == enabled.value);
        } else if (enabled.id == "genre") {
          list = songy.filter(e => e.genre.name == enabled.value);
        }
        filterBody.innerHTML = createSongList(list);
      }
    }
  });

  //Sort
  columnHeader.addEventListener("click", (e) => {
      let toSort = [];
      console.log(e.target.parentElement.parentElement.parentElement);
      if(e.target.parentElement.parentElement.parentElement.id == "filterTable"){
          toSort = list;
      } else {
           toSort = favorites;
      }
    if (e.target.textContent == "Title") {
        toSort.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 * dir : (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 * dir : 0);
    } else if (e.target.textContent == "Artist") {
        toSort.sort((a, b) => (a.artist.name.toLowerCase() > b.artist.name.toLowerCase()) ? 1 * dir : (a.artist.name.toLowerCase() < b.artist.name.toLowerCase()) ? -1 * dir : 0);
    } else if (e.target.textContent == "Year") {
        toSort.sort((a, b) => {return (b.year - a.year) * dir});
    } else if (e.target.textContent == "Genre") {
        toSort.sort((a, b) => (a.genre.name.toLowerCase() > b.genre.name.toLowerCase()) ? 1 * dir : (a.genre.name.toLowerCase() < b.genre.name.toLowerCase()) ? -1 * dir : 0);
    } else if (e.target.textContent == "Popularity") {
        toSort.sort((a, b) => {return (b.details.popularity - a.details.popularity) * dir});
    }
      if(e.target.parentElement.parentElement.parentElement.id == "filterTable"){
        filterBody.innerHTML = createSongList(toSort);
      }
      else {
        favoriteBody.innerHTML = createSongList(toSort);          
      }
      dir = dir * -1;
  });

  filterBody.addEventListener("click", function (e) {
      console.log(e.target);
    if (e.target.nodeName == "TD") {
      showSongInformation(e.target.parentElement.id);
    }
  });
});

function createSongList(so) {
    let result = "";
    count = 10;
    if (so.length < 10) count = so.length;
    for (let i = 0; i < count; i++) {
        result +=
            "<tr id='" +
            so[i].song_id +
            "'><td>" +
            so[i].title +
            "</td><td>" +
            so[i].artist.name +
            "</td><td>" +
            so[i].year +
            "</td><td>" +
            so[i].genre.name +
            "</td><td>" +
            so[i].details.popularity +
            "</td><td><input type='button' onClick='favorite(this)' value='";
            if(favorites.includes(so[i])){result += "Unfavorite";
            } else {result += "Favorite"}
            result += "'></td></tr>";
    }
    return result;
}

//Tab function
function openTab(e) {
  searchPage.classList.add("hidden");
  songPage.classList.add("hidden");
  playlistPage.classList.add("hidden");
  e.classList.remove("hidden");
}
//Song information function
function showSongInformation(e) {
  openTab(songPage);
  let song = songy.find((songy) => songy.song_id == e);
  chart.removeChild(chart.firstElementChild);
  chart.appendChild(document.createElement("canvas"));
  songInformation.innerHTML =
    song.title +
    ", " +
    song.artist.name +
    ", " +
    artist.find((id) => id.id == song.artist.id).type +
    ", " +
    song.genre.name +
    ", " +
    song.year +
    ", " +
    song.details.duration;
  songInfoList.innerHTML =
    "<li>Energy: " +
    song.analytics.energy +
    "</li><li>Danceability: " +
    song.analytics.danceability +
    "</li><li>Liveness: " +
    song.analytics.liveness +
    "</li><li>Valence: " +
    song.analytics.valence +
    "</li><li>Acousticness: " +
    song.analytics.acousticness +
    "</li><li>Speechiness: " +
    song.analytics.speechiness +
    "</li>";
  radar = {
    type: "radar",
    data: {
      labels: [
        "Energy",
        "Danceability",
        "Liveness",
        "Valence",
        "Acousticness",
        "Speechiness",
      ],
      datasets: [
        {
          label: song.title + ", by " + song.artist.name,
          data: [
            song.analytics.energy,
            song.analytics.danceability,
            song.analytics.liveness,
            song.analytics.valence,
            song.analytics.acousticness,
            song.analytics.speechiness,
          ],
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        r: {
          min: 0,
        },
      },
    },
  };
  new Chart(chart.firstElementChild, radar);
}
//Favorite function
function favorite(button){
    if (button.value == "Clear Playlist"){
        favorites = [];
        favoriteBody.innerHTML = "";
    }
    else {
    if (button.value == "Favorite"){
        button.value = "Unfavorite";
    } else {
        button.value = "Favorite";
    }
    const test = songy.find(e => e.song_id == button.parentElement.parentElement.id);
    console.log(test);
    if (favorites.some(e => e.song_id == test.song_id)){
        console.log("Already In");
        favorites = favorites.filter(e => e.song_id != test.song_id);
        console.log(favorites.filter(e => e.song_id != test.song_id));
    } else {
        console.log("Not in");
        favorites.push(test);
    }
    }
    let number = favorites.length;
    let total = 0;
    favorites.forEach(e => total = total + e.details.popularity);
    console.log(total);
    console.log(playInfo);
    playInfo.innerHTML = "Total Songs: " + number + ", Average Popularity: " + (total / number).toFixed(2);
    favoriteBody.innerHTML = createSongList(favorites);
}
// Drop down lists
function artistList() {
  for (let art of artist) {
    const artLi = document.getElementById("artist");
    const opt = document.createElement("option");

    opt.text = art.name;
    opt.value = art.name;
    artLi.add(opt);
  }
}

function genreList() {
  for (let genres of genre) {
    const genLi = document.getElementById("genre");
    const opt = document.createElement("option");

    opt.text = genres.name;
    opt.value = genres.name;
    genLi.add(opt);
  }
}

artistList();
genreList();

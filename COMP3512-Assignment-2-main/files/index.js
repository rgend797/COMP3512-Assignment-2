const artist = JSON.parse(artistContent);
const genre = JSON.parse(genreContent);
const songs = JSON.parse(songsContent);
const songy = JSON.parse(getFile);

let enabled = null;
let list = [];
let count = 0;
let counts = 10;

const a = document.querySelector("tbody");
const table = document.querySelector("table");
const form = document.getElementById("form");
const filter = document.getElementById("filter");
const collumnHeader = document.getElementById("columnHeader");
const songInformation = document.getElementById("songInformation");
const songInfoList = document.getElementById("songInfoList");

const searchPage = document.getElementById("searchPage");
const songPage = document.getElementById("songPage");
const playlistPage = document.getElementById("playlistPage");

let radar = [1, 1, 1, 1];
let chart = document.getElementById("chart");
// Below here is the search stuff
document.addEventListener("DOMContentLoaded", function () {
  
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
  filter.addEventListener("click", function() {
    if (enabled != null) {
      if (enabled.parentElement.parentElement && enabled.value != "") {
        if (enabled.id == "title") {
          list = songy.filter(searchTitle);
        } else if (enabled.id == "artist") {
          list = songy.filter(searchArtist);
        } else if (enabled.id == "genre") {
          list = songy.filter(searchGenre);
        }
        let count = 10;
        if (list.length < 10) {
          count = list.length;
        }
        let result = "";
        for (let i = 0; i < count; i++) {
          result +=
            "<tr id='" +
            list[i].song_id +
            "'><td>" +
            list[i].title +
            "</td><td>" +
            list[i].artist.name +
            "</td><td>" +
            list[i].year +
            "</td><td>" +
            list[i].genre.name +
            "</td><td>" +
            list[i].details.popularity +
            "</td></tr>";
        }
        a.innerHTML = result;
      }
    }
  });

  //Sort 
  columnHeader.addEventListener("click", function (e) {
    let result = "";

    if (e.target.textContent == "Title") {
      if (count == 0) {
        list.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 1;
      } else if (count == 1) {
        list.sort(function (a, b) {
          if (b.title.toLowerCase() < a.title.toLowerCase()) {
            return -1;
          }
          if (b.title.toLowerCase() > a.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 0;
      }
    } else if (e.target.textContent == "Artist") {
      if (count == 0) {
        list.sort(function (a, b) {
          if (a.artist.name.toLowerCase() < b.artist.name.toLowerCase()) {
            return -1;
          }
          if (a.artist.name.toLowerCase() > b.artist.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 1;
      } else if (count == 1) {
        list.sort(function (a, b) {
          if (b.artist.name.toLowerCase() < a.artist.name.toLowerCase()) {
            return -1;
          }
          if (b.artist.name.toLowerCase() > a.artist.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 0;
      }
    } else if (e.target.textContent == "Year") {
      if (count == 0) {
        list.sort(function (a, b) {
          return b.year - a.year;
        });
        sorting();
        count = 1;
      } else if (count == 1) {
        list.sort(function (a, b) {
          return a.year - b.year;
        });
        sorting();
        count = 0;
      }
    } else if (e.target.textContent == "Genre") {
      if (count == 0) {
        list.sort(function (a, b) {
          if (a.genre.name.toLowerCase() < b.genre.name.toLowerCase()) {
            return -1;
          }
          if (a.genre.name.toLowerCase() > b.genre.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 1;
      } else if (count == 1) {
        list.sort(function (a, b) {
          if (b.genre.name.toLowerCase() < a.genre.name.toLowerCase()) {
            return -1;
          }
          if (b.genre.name.toLowerCase() > a.genre.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        sorting();
        count = 0;
      }
    } else if (e.target.textContent == "Popularity") {
      if (count == 0) {
        list.sort(function (a, b) {
          if (a.details.popularity < b.details.popularity) {
            return -1;
          }
          if (a.details.popularity > b.details.popularity) {
            return 1;
          }
          return 0;
        });

        sorting();
        count = 1;
      } else if (count == 1) {
        list.sort(function (a, b) {
          if (b.details.popularity < a.details.popularity) {
            return -1;
          }
          if (b.details.popularity > a.details.popularity) {
            return 1;
          }
          return 0;
        });
        sorting();
        count = 0;
      }
    }

    function sorting() {
      if (list.length < 10) {
        counts = list.length;
      }

      for (let i = 0; i < 10; i++) {
        result +=
          "<tr id='" +
          list[i].song_id +
          "'><td>" +
          list[i].title +
          "</td><td>" +
          list[i].artist.name +
          "</td><td>" +
          list[i].year +
          "</td><td>" +
          list[i].genre.name +
          "</td><td>" +
          list[i].details.popularity +
          "</td></tr>";
      }
    }

    a.innerHTML = result;
  });

  a.addEventListener("click", function(e) {
     if (e.target.nodeName == "TD") {
         showSongInformation(e.target.parentElement.id);
     }
  });
});

  //Tab function
  function openTab(e){
      searchPage.classList.add("hidden");
      songPage.classList.add("hidden");
      playlistPage.classList.add("hidden");
      e.classList.remove("hidden");
  }
  //Song information function
  function showSongInformation(e) {
    openTab(songPage);
    let song = songy.find(songy => songy.song_id == e);
    chart.removeChild(chart.firstElementChild);
    chart.appendChild(document.createElement("canvas"));
    songInformation.innerHTML = song.title + ", " + song.artist.name + ", " + artist.find(id => id.id == song.artist.id).type + ", " + song.genre.name + ", " + song.year + ", " + song.details.duration;
    songInfoList.innerHTML = "<li>Energy: " + song.analytics.energy + "</li><li>Danceability: " + song.analytics.danceability + "</li><li>Liveness: " + song.analytics.liveness + "</li><li>Valence: " + song.analytics.valence + "</li><li>Acousticness: " + song.analytics.acousticness + "</li><li>Speechiness: " + song.analytics.speechiness + "</li>";
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
            data: [song.analytics.energy, song.analytics.danceability, song.analytics.liveness, song.analytics.valence, song.analytics.acousticness, song.analytics.speechiness],
            fill: true,
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            min: 0,
          },
        },
      },
    };
    new Chart(chart.firstElementChild, radar);  }
  //Search functions
  function searchTitle(songy) {
    const titleCopy = String(songy.title).toLowerCase();

    const title = songy.title;

    if (titleCopy.includes(enabled.value.toLowerCase())) {
      return title;
    }
  }

  function searchArtist(songy) {
    return songy.artist.name == enabled.value;
  }

  function searchGenre(songy) {
    return songy.genre.name == enabled.value;
  }

  // Drop down lists
  function artistList() {
    for (let art of artist) {
      const artLi = document.getElementById("artist");
      const opt = document.createElement("option");

      opt.text = art.name;
      artLi.add(opt);
    }
  }

  function genreList() {
    for (let genres of genre) {
      const genLi = document.getElementById("genre");
      const opt = document.createElement("option");

      opt.text = genres.name;
      genLi.add(opt);
    }
  }

  artistList();
  genreList();

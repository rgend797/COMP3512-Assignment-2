/**
 * Executes commands after all elements have been loaded.
 */
document.addEventListener("DOMContentLoaded", async function () {
  const filterBody = document.querySelector("#filterTable tbody");
  const favoriteBody = document.querySelector("#favoriteTable tbody");
  const form = document.getElementById("form");
  const filter = document.getElementById("filter");
  const columnHeader = document.getElementById("columnHeader");
  const songInformation = document.getElementById("songInformation");
  const songInfoList = document.getElementById("songInfoList");
  const playInfo = document.querySelector("#playlistPage div span");
  const page = document.getElementById("page");
  const searchPage = document.getElementById("searchPage");
  const songPage = document.getElementById("songPage");
  const playlistPage = document.getElementById("playlistPage");
  const songy = await APIStuff();
  let chart = document.getElementById("chart");
  let enabled = null;
  let list = [];
  let favorites = [];
  let dir = 1;

  /**
   * Enables and disables search inputs.
   * @param {HTML Element} e The chosen search criteria.
   */
  form.addEventListener("change", (e) => {
    if (e.target.id == "search") {
      document.querySelector("#title").disabled = true;
      document.querySelector("#artist").disabled = true;
      document.querySelector("#genre").disabled = true;
      e.target.nextElementSibling.nextElementSibling.disabled = false;
      enabled = e.target.nextElementSibling.nextElementSibling;
    }
  });

  /**
   * Filters and displays a list of songs from the enabled search criteria.
   */
  filter.addEventListener("click", () => {
    if (enabled != null) {
      if (enabled.parentElement.parentElement && enabled.value != "") {
        if (enabled.id == "title") {
          list = songy.filter((e) => String(e.title).toLowerCase().includes(String(enabled.value).toLowerCase()));
        } else if (enabled.id == "artist") {
          list = songy.filter((e) => e.artist.name == enabled.value);
        } else if (enabled.id == "genre") {
          list = songy.filter((e) => e.genre.name == enabled.value);
        }
        filterBody.innerHTML = createSongList(list);
      }
    }
  });

  /**
   * Sorts and displays the songs in ascending or descending order of the criteria clicked.
   * @param {HTML Element} e The chosen sort criteria.
   */
  columnHeader.addEventListener("click", (e) => {
    let toSort = [];
    if (e.target.parentElement.parentElement.parentElement.id == "filterTable") {
      toSort = list;
    } else {
      toSort = favorites;
    }
    if (e.target.textContent == "Title") {
      toSort.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 * dir
        : a.title.toLowerCase() < b.title.toLowerCase() ? -1 * dir
        : 0
      );
    } else if (e.target.textContent == "Artist") {
      toSort.sort((a, b) =>
        a.artist.name.toLowerCase() > b.artist.name.toLowerCase() ? 1 * dir
        : a.artist.name.toLowerCase() < b.artist.name.toLowerCase() ? -1 * dir
        : 0
      );
    } else if (e.target.textContent == "Year") {
      toSort.sort((a, b) => {
        return (b.year - a.year) * dir;
      });
    } else if (e.target.textContent == "Genre") {
      toSort.sort((a, b) =>
        a.genre.name.toLowerCase() > b.genre.name.toLowerCase() ? 1 * dir
        : a.genre.name.toLowerCase() < b.genre.name.toLowerCase() ? -1 * dir
        : 0
      );
    } else if (e.target.textContent == "Popularity") {
      toSort.sort((a, b) => {return (b.details.popularity - a.details.popularity) * dir;});
    }
    if (e.target.parentElement.parentElement.parentElement.id == "filterTable") {
      filterBody.innerHTML = createSongList(toSort);
    } else {
      favoriteBody.innerHTML = createSongList(toSort);
    }
    dir = dir * -1;
  });

  /**
   * Handles favoriting and unfavoriting from the search tab as well as calling showInformation.
   * @param {HTML Element} e The song or (un)favorite button clicked.
   */
  filterBody.addEventListener("click", (e) => {
    if (e.target.nodeName == "INPUT") {
      favorite(e.target);
    } else if (e.target.nodeName == "TD") {
      showSongInformation(e.target.parentElement.id);
    }
  });

  /**
   * Handles favoriting and unfavoriting from the playlist tab as well as calling showInformation.
   * @param {HTML Element} e The song or (un)favorite button clicked.
   */
  favoriteBody.addEventListener("click", (e) => {
    if (e.target.nodeName == "INPUT") {
      favorite(e.target);
    } else if (e.target.nodeName == "TD") {
      showSongInformation(e.target.parentElement.id);
    }
  });

  /**
   * Handles the playlist and close view button. (They are the same).
   */
  page.addEventListener("click", () => {
    if (page.value == "Playlist") {
      openTab(playlistPage);
      page.value = "Close View";
    } else {
      openTab(searchPage);
      page.value = "Playlist";
    }
  });

  /**
   * Creates a radar diagram of the desired song and list relevent statistics.
   * @param {int} id The song_id of the desired song.
   */
  function showSongInformation(sid) {
    openTab(songPage);
    page.value = "Close View";
    let song = songy.find((songy) => songy.song_id == sid);
    chart.removeChild(chart.firstElementChild);
    chart.appendChild(document.createElement("canvas"));
    songInformation.innerHTML =
      song.title + ", " +
	  song.artist.name + ", " +
	  artist.find((id) => id.id == song.artist.id).type + ", " +
	  song.genre.name + ", " +
	  song.year + ", " +
	  song.details.duration;
    songInfoList.innerHTML =
      "<li>Energy: " + song.analytics.energy +
      ", </li><li>Danceability: " + song.analytics.danceability +
      ", </li><li>Liveness: " + song.analytics.liveness +
      ", </li><li>Valence: " + song.analytics.valence +
      ", </li><li>Acousticness: " + song.analytics.acousticness +
      ", </li><li>Speechiness: " + song.analytics.speechiness +
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

  /**
   * Adds or removes song from favorites list and changes button to reflect action.
   * @param {HTML Element} button The favorite button of the song.
   */
  function favorite(button) {
    openTab(playlistPage);
    page.value = "Close View";
    if (button.value == "Clear Playlist") {
      favorites = [];
      favoriteBody.innerHTML = "";
    } else {
      if (button.value == "Favorite") {
        button.value = "Unfavorite";
      } else {
        button.value = "Favorite";
        const b = "[id='" + button.parentElement.parentElement.id + "'] td input";
        document.querySelector(b).value = "Favorite";
      }
      const test = songy.find(
        (e) => e.song_id == button.parentElement.parentElement.id
      );
      if (favorites.some((e) => e.song_id == test.song_id)) {
        favorites = favorites.filter((e) => e.song_id != test.song_id);
      } else {
        favorites.push(test);
      }
    }
    let number = favorites.length;
    let total = 0;
    favorites.forEach((e) => (total = total + e.details.popularity));
    playInfo.innerHTML = "Total Songs: " + number + ", Average Popularity: " + (total / number).toFixed(2);
    favoriteBody.innerHTML = createSongList(favorites);
  }

  /**
   * Fills the tbody of search results or favorites with inputed songs.
   * @param {Object Array} song An array of songs we want to add to the results.
   * @returns
   */
  function createSongList(song) {
    let result = "";
    count = 10;
    if (song.length < 10) count = song.length;
    for (let i = 0; i < count; i++) {
      result +=
        "<tr id='" + song[i].song_id +
        "'><td>" + song[i].title +
        "</td><td>" + song[i].artist.name +
        "</td><td>" + song[i].year +
        "</td><td>" + song[i].genre.name +
        "</td><td>" + song[i].details.popularity +
        "</td><td><input type='button' value='";
      if (favorites.includes(song[i])) {
        result += "Unfavorite";
      } else {
        result += "Favorite";
      }
      result += "'></td></tr>";
    }
    return result;
  }

  /**
   * Hides and displays desired tab.
   * @param {HTML Element} goTo The desired tab to switch to.
   */
  function openTab(goTo) {
    searchPage.style.display = "none";
    songPage.style.display = "none";
    playlistPage.style.display = "none";
    goTo.style.display = "block";
  }

  /**
   * Fills the artist and genre select list in the search section.
   */
  function selectList() {
	const artist = JSON.parse(artistContent);
	const genre = JSON.parse(genreContent);
	for (let art of artist) {
      const artLi = document.getElementById("artist");
      const opt = document.createElement("option");
      opt.text = art.name;
      opt.value = art.name;
      artLi.add(opt);
    }
    for (let genres of genre) {
      const genLi = document.getElementById("genre");
      const opt = document.createElement("option");
      opt.text = genres.name;
      opt.value = genres.name;
      genLi.add(opt);
    }
  }

  //Start up functions
  selectList();
  openTab(searchPage);
});

/**
 * Fetches and stores to localStorage or returns it from local storage if already present.
 * @returns The api as an array of objects.
 */
async function APIStuff() {
  if (localStorage.getItem("store") != null) {
    return JSON.parse(localStorage.getItem("store"));
  } else {
    const fet = await fetch("https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php").then((response) => response.json());
    localStorage.setItem("store", JSON.stringify(fet));
    return JSON.parse(fet);
  }
}

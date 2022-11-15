const artist = JSON.parse(artistContent);
const genre = JSON.parse(genreContent);
const songs = JSON.parse(getFile);

// Below here is the search stuff 


function artistList(){
        for(let art of artist){
            const artLi = document.getElementById("artist");
            const opt = document.createElement("option");

            opt.text = art.name;
            artLi.add(opt);
        }
}

function genreList(){
    for(let genres of genre){
        const genLi = document.getElementById("genre");
        const opt = document.createElement("option");

            opt.text = genres.name;
            genLi.add(opt);
        }
}

//Change this to take the song api thing 
function songList(){
    for(let song of songs){
        // Remove line 32 as its just a tester
        console.log(song.title);
    }
}

artistList();
genreList();
songList();

// Trying to make the filter work
// function filter(event) {
//     console.log("hello");
//   }

// const form = document.getElementById('form');
// form.addEventListener('#filter', filter);



















    
const artist = JSON.parse(artistContent);
const genre = JSON.parse(genreContent);
const songs = JSON.parse(songsContent);
const songy = JSON.parse(getFile);
let enabled = null;
let list = [];
const a = document.querySelector("tbody");
const table = document.querySelector("table")
// Below here is the search stuff 
document.addEventListener("DOMContentLoaded", function () {
    
document.querySelector("#form").addEventListener("change", function (e) {
    if(e.target.id == "search"){
        console.log(e.target);
        document.querySelector("#title").disabled = true;
        document.querySelector("#artist").disabled = true;
        document.querySelector("#genre").disabled = true;
        e.target.nextElementSibling.nextElementSibling.disabled = false;
        enabled = e.target.nextElementSibling.nextElementSibling;
    }
});
    
document.querySelector("#filter").addEventListener("click", function () {
    if(enabled.parentElement.parentElement && enabled.value != ""){
    //let value = enabled;
        
        
        
    if(enabled.id == "title"){
        console.log("title");
        list = songy.filter(searchTitle);
    }
    else if(enabled.id == "artist"){
         console.log("artist");
       list = songy.filter(searchArtist);
    }
    else if(enabled.id == "genre"){
         console.log("genre");
       list = songy.filter(searchGenre);
    }
        let count = 10
        if(list.length < 10){
            count = list.length;    
        }
        let result = "";
        for(let i = 0; i < count; i++){
        result += "<tr><td>" + list[i].title + "</td><td>" + list[i].artist.name + "</td><td>" + list[i].year + "</td><td>" + list[i].genre.name + "</td><td>" + list[i].details.popularity + "</td></tr>";
    }
    a.innerHTML = result;
    }
});
function searchTitle(songy){
    return String(songy.title).includes(enabled.value);
}
function searchArtist(songy){
    return songy.artist.name == enabled.value;
}
function searchGenre(songy){
    return songy.genre.name == enabled.value;
}
// function filter(event) {
//     console.log("hello");
//   }

// const form = document.getElementById('form');
// form.addEventListener('#filter', filter);
});
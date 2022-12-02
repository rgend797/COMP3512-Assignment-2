const artist = JSON.parse(artistContent);
const genre = JSON.parse(genreContent);
const songs = JSON.parse(songsContent);
const songy = JSON.parse(getFile);
let enabled = null;
let list = [];
let count = 0;
let counts = 10;
const a = document.querySelector("tbody");
const table = document.querySelector("table")

// Below here is the search stuff 
document.addEventListener("DOMContentLoaded", function () {
    //Filter
document.querySelector("#form").addEventListener("change", function (e) {
    if(e.target.id == "search"){
        document.querySelector("#title").disabled = true;
        document.querySelector("#artist").disabled = true;
        document.querySelector("#genre").disabled = true;
        e.target.nextElementSibling.nextElementSibling.disabled = false;
        enabled = e.target.nextElementSibling.nextElementSibling;
    }
});

    //Filter
document.querySelector("#filter").addEventListener("click", function () {
    if(enabled.parentElement.parentElement && enabled.value != ""){
        
    if(enabled.id == "title"){
        list = songy.filter(searchTitle); 
    }
    else if(enabled.id == "artist"){
       list = songy.filter(searchArtist);
    }
    else if(enabled.id == "genre"){
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

// Sort 
document.querySelector("#table").addEventListener("click", function(e){

    let result = "";
    
    if(e.target.textContent == 'Title'){
        
        if(count == 0){
            
            list.sort(function(a,b){ 
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

        } else if (count == 1){
            list.sort(function(a,b){ 
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

    } else if(e.target.textContent == 'Artist'){

        if(count == 0){

            list.sort(function(a,b){ 
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
        } else if (count == 1){
            list.sort(function(a,b){ 
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

    } else if(e.target.textContent == 'Year'){
        
        if(count == 0){
            list.sort(function(a,b){ return b.year - a.year});
            sorting();
            count = 1;
        } else if (count == 1){
            list.sort(function(a,b){ return a.year - b.year});
            sorting();
            count = 0;
        }
        
       
    } else if(e.target.textContent == 'Genre'){
        
        if(count == 0){
            list.sort(function(a,b){ 
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
        } else if (count == 1){
            list.sort(function(a,b){ 
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
    } else if(e.target.textContent == 'Popularity'){

        if(count == 0){
            list.sort(function(a,b){ 
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
        } else if (count == 1){
            list.sort(function(a,b){ 
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

    function sorting(){
        
        if(list.length < 10){
            counts = list.length;    
        }

        for(let i = 0; i < list.length; i++){
            result += "<tr><td>" + list[i].title + "</td><td>" + list[i].artist.name + "</td><td>" + list[i].year + "</td><td>" + list[i].genre.name + "</td><td>" + list[i].details.popularity + "</td></tr>";
        } 
    }
    
    a.innerHTML = (result);
})



//Search functions
function searchTitle(songy){

    const titleCopy = String(songy.title).toLowerCase();

    const title = songy.title;

    if(titleCopy.includes(enabled.value.toLowerCase())){
        return title;            
    } 

}

function searchArtist(songy){
    return songy.artist.name == enabled.value;
}

function searchGenre(songy){
    return songy.genre.name == enabled.value;
}

// Drop down lists
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



artistList();
genreList();

});
/* url of song api --- https versions hopefully a little later this semester */	
const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

//if localstorage is not empty then dont need to regrab the file.
// Line 6 is to a tester
// localStorage.clear(); 

let getFile = [];   

if(localStorage){
    getFile = localStorage.getItem('store');
    
} else {


file = fetch(api).then((response => response.json())).then((data) => {

      const json = JSON.stringify(data);
      localStorage.setItem('store', json);
      getFile = json;
});

}



/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

fetch('https://api.teleport.org/api/')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJSON){
        console.log(JSON.stringify(myJSON));
    })
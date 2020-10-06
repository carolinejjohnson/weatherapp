"use strict";

(function() {
    const BASE_URL = "http://api.weatherapi.com/v1";


    window.addEventListener("load", init);

    function init(){
        id("form").addEventListener("submit", getWeather);
    }

    function getWeather(event){
        console.log(event);
        event.preventDefault();
        let data = new FormData(id("form"));
        let searched = data.get("input");
        console.log(searched);
        fetch(BASE_URL + "/current.json?key=d5bead0c3ecc401aa4e181841200809&q=" + searched)
            .then(checkStatus)
            .then(resp => resp.json())
            .then(processData)
            .catch(handleError);
    }

    function processData(response){
        id("main").classList.remove("hidden");
        id("main").innerHTML= "";
        console.log(response);

        let location = gen("h2");
        id("main").appendChild(location);
        location.textContent = response.location.name + ", " + response.location.region;

        let country = gen("h2");
        id("main").appendChild(country);
        country.textContent = response.location.country;

        let temp = gen("h2");
        id("main").appendChild(temp);
        temp.textContent = response.current.temp_f + " F";

        let type = gen("h1");
        id("main").appendChild(type);
        type.textContent = response.current.condition.text;


        let icon = gen('img');
        id("main").appendChild(icon);
        icon.src = "http:" + response.current.condition.icon;
    }
    function id(selector){
        return document.getElementById(selector);
    }

    function checkStatus(response){
        if(response.ok){
            return response;
        }else{
            throw Error("Error in request: " + response.statusText);
        }
    }

    function handleError(err){
        id("main").classList.remove("hidden");
        id("main").innerHTML= "";
        let error = gen("h3");
        id("main").appendChild(error);
        error.textContent = "Please enter a valid location.";
    }

    function gen(selector){
        return document.createElement(selector);
    }

})();
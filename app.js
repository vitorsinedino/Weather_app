window.addEventListener('load', ()=>{
    // main definitions
    let long;
    let lat;
    //html file modfying variables
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    //
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //proxy definition to bypass api host lock
            const proxy = "https://cors-anywhere.herokuapp.com/";

            //api definition (with proxy)
            const api = `${proxy}https://api.darksky.net/forecast/28da3e4d4c941caed12e624c648d2e40/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                //setting the api DOM elements
                let { temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone
                // icon setting
                setIcons(icon, document.querySelector(".icon"));

                // temperature formulas
                let celcius =(((temperature-32)/9) * 5);
                let farenheit = (((celcius/5) * 9) + 32);
                //temperature handling
                temperatureSection.addEventListener('click', ()=> {
                    if (temperatureSpan.textContent === "ºF"){

                        temperatureDegree.textContent = Math.ceil(celcius);
                        temperatureSpan.textContent = "ºC";
                    }
                    else{
                        temperatureSpan.textContent = "ºF";
                        temperatureDegree.textContent = Math.ceil(farenheit);
                    }
                })

                
            });
        });
       
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
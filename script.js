let clcasNum = document.querySelector(".clcasNum")
let frhntNum = document.querySelector(".frhntNum")
let ctName = document.querySelector(".ctName")
let hmdtNum = document.querySelector(".hmdtNum")
let windNum = document.querySelector(".windNum")
let srcBtn = document.querySelector(".srcBtn")
let lctionBx = document.querySelector(".lctionBx")
let srcLction = document.querySelector(".srcLction")
let wIcn = document.querySelector(".wIcn")
let mainBox = document.querySelector(".mainBox")
let wIcnNm = document.querySelector(".wIcnNm")
let cntrName = document.querySelector(".cntrName")

const apiKey = "50b5a8fcbb8844188da150944231008"
const apiUrl = `https://api.weatherapi.com/v1/current.json?`

async function checkWeather() {
    const response = await fetch(apiUrl + `key=${apiKey}` + `&q=${lctionBx.value}`);
    let data = await response.json()

    if (data.location === undefined) {
        if (data.error.message === "No matching location found.") {
            alert("No matching location found!")
        }
        else if (data.error.message === "Parameter q is missing.") {
            alert("Please enter city name!")
        }
    }

    clcasNum.innerHTML = (data.current.temp_c).toFixed()
    frhntNum.innerHTML = (data.current.temp_f).toFixed()
    ctName.innerHTML = data.location.name
    cntrName.innerHTML = data.location.country
    hmdtNum.innerHTML = data.current.humidity
    windNum.innerHTML = data.current.wind_kph

    if (data.current.condition.text === "Clouds") {
        wIcn.src = "weatherIcons/clouds.png"
    }
    else if (data.current.condition.text === "Clear") {
        wIcn.src = "weatherIcons/clear.png"
    }
    else if (data.current.condition.text === "Rain") {
        wIcn.src = "weatherIcons/rain.png"
    }
    else if (data.current.condition.text === "Drizzle") {
        wIcn.src = "weatherIcons/drizzle.png"
    }
    else if (data.current.condition.text === "Haze") {
        wIcn.src = "weatherIcons/mist.png"
    }

    mainBox.style.filter = "none"
    wIcnNm.innerHTML = data.current.condition.text
}
let search = () => {
    checkWeather()
    lctionBx.value = ""
}

async function checklocation() {
    const response = await fetch("https://ipinfo.io/json?token=183b306a66e200");
    let data = await response.json()
    console.log(data);
    lctionBx.value = data.city
    checkWeather()
}

let lction = () => {
    checklocation()
}


srcBtn.addEventListener("click", search)
srcLction.addEventListener("click", lction)
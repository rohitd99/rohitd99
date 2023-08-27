// Get all the elements from DOM.
const ip = document.getElementById("ip");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const submit = document.getElementById("submitDetails");
const ipInput = document.getElementById("ipInput");
const resource = "https://ipgeolocation.abstractapi.com/v1/?api_key=7a2a03a7fa4b43699176ed43380efd14";

// Get Map
let map = L.map('map').setView([51.505, -0.09], 13);

// set the icon for map
const locationIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30,40]
});

// Tiles for Map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Set Marker
let marker = L.marker([51.505, -0.09],{icon: locationIcon}).addTo(map);

// Check validity of IP and if valid send a API Request.
submit.addEventListener('click',() => {

    const ipValue = ipInput.value;
    if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipValue))
    {
        getIP(resource,ipValue).catch((e) =>{
            setIPDetails("NA","NA","NA","NA ");
            setMap(28.70,77.10);
            console.log(e);
        });
        ipInput.classList.remove("invalid");
    }else{

        ipInput.classList.add("invalid");
    }
});

// Set the Lat Lng for the view and marker
function setMap(latitude,longitude)
{   
    marker.setLatLng([latitude,longitude]);
    map.setView([latitude,longitude],10);
}

function setIPDetails(ipAddress,location,ispName,time)
{
    ip.innerText = ipAddress;
    loc.innerText = location;
    isp.innerText = ispName;
    timezone.innerText = time;
}

// API request to get the details.
async function getIP(resource,ipAddress)
{
    if(ipAddress)
    {
        resource += "&ip_address=" + ipAddress;
    }
    const response = await fetch(resource);
    const details = await response.json();
    console.log(details);
    const ipLocation = details.city + " " + details.region + " " + details.country;
    const timeZone = details.timezone.abbreviation + " " + details.timezone.name + " " + details.timezone.current_time;
    setIPDetails(details.ip_address,ipLocation,details.connection.isp_name,timeZone);
    setMap(details.latitude,details.longitude);
}

// Initial call
getIP(resource).catch((e) =>{
    setIPDetails("NA","NA","NA","NA ");
    setMap(28.70,77.10);
    console.log(e);
});

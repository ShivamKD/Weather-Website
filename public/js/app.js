console.log('Client-Side JavaScript Loaded.')


const weatherForm = document.querySelector('.search')
const currentLocation = document.querySelector('.current-location')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

// From given Location
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })

    console.log(location)
})

// from current location
currentLocation.addEventListener('submit', (e) => {
    e.preventDefault();

    // if browser supports geolocation
    if (navigator.geolocation) {
        const success = (position) => {
            // getting the current latitude and longitude
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            url = '/weather-current?latitude=' + latitude + '&longitude=' + longitude

            fetch(url).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.forecast
                        messageTwo.textContent = data.location
                        search.value = data.location
                    }
                })
            })
            console.log(position)
        }

        const error = (position) => {
            console.log(position)
        }
        const watchId = navigator.geolocation.getCurrentPosition(success, error)


    } else {
        messageOne.textContent = 'Your browser doesnot support geolocation'
    }
})
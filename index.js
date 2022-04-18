let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get("movieId")
console.log(id)
const url =id? "https://striveschool-api.herokuapp.com/api/movies/" + id : "https://striveschool-api.herokuapp.com/api/movies"


    const addMovies = async(event) => {
        try {
            let myMovies = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                category: document.getElementById("category").value,
                imageUrl: document.getElementById("imageUrl").value
            }
            event.preventDefault()
            const response = await fetch(url, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmQxY2E5MDIzOTAwMTVkOTY1YzciLCJpYXQiOjE2NTAyMjgxOTEsImV4cCI6MTY1MTQzNzc5MX0.7kfsRfWSfVlffKfi616rtQhRdS8oUqq13eW68vuYKRU"
                    },
                body: JSON.stringify(myMovies)
            })
            if(response.ok){
                const movie = await response.json()
                console.log(movie)
                popAlert("success", "movie added successfully")
            }
            
        } catch (error) {
            console.log(error)
            popAlert("danger", error.msg)
        }
    }

    const popAlert = (type, msg) => {

        const alertContainer = document.getElementById("alert-container")

        alertContainer.innerHTML = `
        <div class="alert alert-${type}" role="alert">
        ${msg}
        </div>
        `

        setTimeout(() => {
            alertContainer.innerHTML = ""
        }, 3000)
    }

window.onload = async() => {
    if(id){
        const response = await fetch(url, {
            method:"PUT", 
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmQxY2E5MDIzOTAwMTVkOTY1YzciLCJpYXQiOjE2NTAyMjgxOTEsImV4cCI6MTY1MTQzNzc5MX0.7kfsRfWSfVlffKfi616rtQhRdS8oUqq13eW68vuYKRU"
                }
            })
         const movies = await response.json()
         console.log(response)
        document.getElementById("name").value = movies.name
        document.getElementById("description").value = movies.description
        document.getElementById("category").value = movies.category
        document.getElementById("imageUrl").value = movies.imageUrl
    }
}

const handleSubmit =async (event) => {
    try {
        event.preventDefault()
        let myMovies = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value,
            imageUrl: document.getElementById("imageUrl").value
        }
        event.preventDefault()
        const response = await fetch(url, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmQxY2E5MDIzOTAwMTVkOTY1YzciLCJpYXQiOjE2NTAyMjgxOTEsImV4cCI6MTY1MTQzNzc5MX0.7kfsRfWSfVlffKfi616rtQhRdS8oUqq13eW68vuYKRU"
                },
            body: JSON.stringify(myMovies)
        })
        if(response.ok){
            const movies = await response.json()
            console.log(movies)
            if (id) {
                popAlert("success", "movie with " + movies._id + " got edited successfully" )
                window.location.assign("./movies.html")
            } else {
                popAlert( "success", "Movie created successfully")
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

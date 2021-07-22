import fallback from '../assets/fallback-img.jpg'

export const sendRequest = async (url, reqConfig, errorMsg) => {
     const response = await fetch(url , reqConfig)
     const responseData = await response.json()

     if(!response.ok) {
          throw new Error(responseData.status_message || errorMsg)
     }

     return responseData
}

export const formatNumber = (num) => {
     return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const generateProfile = (path) => {
     return path ? `https://image.tmdb.org/t/p/original/${path}` : fallback
}

export const validateEmail = (email) => {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     return re.test(String(email).toLowerCase())
}

export const generateMoviesPerPage = (currentPage, movies) => {
     const start = (currentPage - 1) * 20 
     const end = currentPage * 20
     return movies.slice(start, end)
}
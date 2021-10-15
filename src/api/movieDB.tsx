import axios from 'axios'

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '8557dbb056a82ddc1a9379098da36b7d',
        language: 'es-ES'
    }
})

export default movieDB
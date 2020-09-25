import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://libros-dani.firebaseio.com/',
});

export default instance;

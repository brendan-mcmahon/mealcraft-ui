import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function getGrocery(id) {
	return axios
		.get(`${API_URL}/grocery?id=${id}`)
		.then((response) => mapGrocery(response.data))
		.catch((error) => {
			throw error;
		});
}

export function getAllGroceries() {
	return axios
		.get(`${API_URL}/grocery`)
		.then((response) => response.data.map(mapGrocery))
		.catch((error) => {
			throw error;
		});
}

export function saveGrocery(grocery) {
	grocery.tags = [...new Set(grocery.tags)];

	return axios
		.post(`${API_URL}/grocery`, grocery)
		.then((response) => mapGrocery(response.data))
		.catch((error) => {
			throw error;
		});
}

export function deleteGrocery(id) {
	console.log('deleting grocery', `${API_URL}/grocery?id=${id}`);
	return axios
		.delete(`${API_URL}/grocery?id=${id}`)
		.then((response) => { console.log("response", response.data); return response.data })
		.catch((error) => {
			console.log("this threw an error");
			throw error;
		});
}

export function getRecipe(recipeId) {
	return axios
		.get(`${API_URL}/recipe?id=${recipeId}`)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
}

export function getAllRecipes() {
	return axios
		.get(`${API_URL}/recipe`)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
}

const mapGrocery = (grocery) => {
	return {
		...grocery,
		statusDate: grocery.statusDate ? new Date(grocery.statusDate) : null,
		expirationDate: grocery.expirationDate ? new Date(grocery.expirationDate) : null,
	};
}

export function updateRecipe(recipe) {
	return axios
		.put(`${API_URL}/recipe`, recipe)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
}

export function getAllTags() {
	return axios
		.get(`${API_URL}/tag`)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
}

export function updateGroceries() {
	throw new Error('Not implemented');
}

export async function createRecipeFromUrl(url) {
	const baseUrl = "https://dlrov3uqkcqqgili5r2gpcl3jq0vaekm.lambda-url.us-east-2.on.aws/";
	try {
		const response = await axios.post(baseUrl, { url });
		return response.data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
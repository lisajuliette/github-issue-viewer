import axios from 'axios';

export async function fetchIssues(org: string, repo: string, page: number = 1) {
	const url = `https://api.github.com/repos/${org}/${repo}/issues?page=${page}&per_page=10`;
	const response = await axios.get(url);
	return response.data;
}

export interface Issue {
	id: string;
	title: string;
	number: number;
	state: string;
	created_at: string;
	user: {
		login: string;
		avatar_url: string;
	};
	labels: { id: string; name: string; color: string }[];
}

export interface IssueListProps {
	org: string;
	repo: string;
	onError: (message: string) => void;
	filterText: string;
	sortOrder: 'ascending' | 'descending';
}

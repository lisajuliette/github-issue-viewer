import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { fetchIssues } from '../../utils/api';
import { Issue } from '../components/IssueViewer/IssueList/IssueList.types';

interface UseIssuesProps {
	org: string;
	repo: string;
	filterText: string;
	sortOrder: 'ascending' | 'descending';
	onError: (message: string) => void;
}

interface IssueWithUrl extends Issue {
	url: string;
}

export const useIssues = ({
	org,
	repo,
	filterText,
	sortOrder,
	onError,
}: UseIssuesProps) => {
	const [issues, setIssues] = useState<IssueWithUrl[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const data: Issue[] = await fetchIssues(org, repo, page);
			const updatedData: IssueWithUrl[] = data.map((issue) => ({
				...issue,
				url: `https://github.com/${org}/${repo}/issues/${issue.number}`,
			}));
			setIssues((prev) =>
				page === 1 ? updatedData : [...prev, ...updatedData]
			);
		} catch (error) {
			onError(`Error loading issues: ${error}`);
		} finally {
			setLoading(false);
		}
	}, [org, repo, page, onError]);

	useEffect(() => {
		if (org && repo) {
			fetchData();
		}
	}, [org, repo, fetchData]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					setPage((prev) => prev + 1);
				}
			},
			{
				root: null,
				rootMargin: '20px',
				threshold: 1.0,
			}
		);

		const currentLoader = loaderRef.current;
		if (currentLoader) {
			observer.observe(currentLoader);
		}

		return () => observer.disconnect();
	}, [loading]);

	const filteredAndSortedIssues = useMemo(() => {
		return issues
			.filter((issue) =>
				issue.title.toLowerCase().includes(filterText.toLowerCase())
			)
			.sort((a, b) => {
				const dateA = new Date(a.created_at).getTime();
				const dateB = new Date(b.created_at).getTime();
				return sortOrder === 'descending' ? dateB - dateA : dateA - dateB;
			});
	}, [issues, filterText, sortOrder]);

	return {
		issues: filteredAndSortedIssues,
		loading,
		loaderRef,
	};
};

import React from 'react';
import LoadingIndicator from '../../LoadingIndicator';
import { formatDate } from '../../../../utils/formatDate';
import { isLight } from '../../../../utils/color';
import { useIssues } from '../../../hooks/useIssues';
import { IssueListProps } from './IssueList.types';

const IssueList: React.FC<IssueListProps> = ({
	org,
	repo,
	onError,
	filterText,
	sortOrder,
}) => {
	const { issues, loading, loaderRef } = useIssues({
		org,
		repo,
		filterText,
		sortOrder,
		onError,
	});

	return (
		<section>
			{issues.map((issue) => (
				<article
					key={issue.id}
					className="flex items-center p-2 sm:p-4 border-b"
					style={{
						backgroundColor: 'var(--bg-primary)',
						color: 'var(--text-primary)',
						borderColor: 'var(--border-color)',
					}}
				>
					<img
						className="h-10 w-10 rounded-full"
						src={issue.user.avatar_url}
						alt={`${issue.user.login} avatar`}
					/>
					<div className="ml-6 flex-grow">
						<div className="mb-2">
							<span
								className={`text-xs px-2 inline-flex leading-5 font-semibold rounded-full mr-2 ${
									issue.state === 'open'
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}
							>
								{issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
							</span>
							<a
								href={issue.url}
								target="_blank"
								rel="noopener noreferrer"
								className="font-bold hover:underline mr-2"
								style={{ color: 'var(--text-secondary)' }}
							>
								{issue.title}
							</a>
							<span
								className="text-sm"
								style={{ color: 'var(--text-primary)' }}
							>
								#{issue.number}
							</span>
						</div>
						<div className="text-sm" style={{ color: 'var(--text-primary)' }}>
							Issue #{issue.number} opened on {formatDate(issue.created_at)} by{' '}
							{issue.user.login}
						</div>
						<div className="mt-2 flex flex-wrap">
							{issue.labels.map((label) => (
								<span
									key={label.id}
									className="inline-block text-xs font-semibold mr-2 mb-2 px-2 py-0.5 rounded"
									style={{
										backgroundColor: `#${label.color}`,
										color: isLight(label.color)
											? 'var(--text-dark)'
											: 'var(--text-light)',
									}}
								>
									{label.name}
								</span>
							))}
						</div>
					</div>
				</article>
			))}
			{loading && <LoadingIndicator />}
			<div ref={loaderRef} />
		</section>
	);
};

export default IssueList;

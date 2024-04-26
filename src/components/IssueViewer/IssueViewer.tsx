'use client';

import React, { useState } from 'react';
import IssueList from './IssueList/IssueList';
import InputForm from './InputForm';
import ErrorMessage from '../ErrorMessage';

const IssueViewer: React.FC = () => {
	const [org, setOrg] = useState('vercel');
	const [repo, setRepo] = useState('next.js');
	const [error, setError] = useState('');
	const [filterText, setFilterText] = useState('');
	const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>(
		'descending'
	);

	const handleOrgRepoChange = (newOrg: string, newRepo: string) => {
		setOrg(newOrg);
		setRepo(newRepo);
		setError('');
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFilterText = e.target.value;
		setFilterText(newFilterText);
	};

	const handleError = (errorMessage: string) => {
		setError(errorMessage);
	};

	const subtitle =
		org && repo
			? `${org}/${repo} issues`
			: `Submit an org and repo to view issues`;

	return (
		<div
			className="min-h-screen p-2 sm:p-8 mb-4"
			style={{ color: 'var(--text-primary)' }}
		>
			<div
				className="container mx-auto max-w-6xl rounded-lg p-6"
				style={{ backgroundColor: 'var(--bg-primary)' }}
			>
				<h1
					className="text-3xl font-bold mb-4"
					style={{ color: 'var(--text-secondary)' }}
				>
					GitHub Issue Viewer
				</h1>
				<InputForm
					org={org}
					repo={repo}
					onOrgRepoChange={handleOrgRepoChange}
				/>
				<h2
					className="text-2xl mb-4"
					style={{ color: 'var(--text-secondary)' }}
				>
					{subtitle}
				</h2>
				<div className="flex flex-col sm:flex-row justify-between items-end space-x-4">
					<input
						type="text"
						value={filterText}
						onChange={handleFilterChange}
						placeholder="Filter issues by title"
						className="mb-4 p-2 border rounded w-full sm:w-1/2 focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-500"
						style={{ color: 'var(--text-dark)' }}
					/>

					<button
						onClick={() =>
							setSortOrder(
								sortOrder === 'ascending' ? 'descending' : 'ascending'
							)
						}
						className="mb-4 p-2 primary-button text-white rounded"
					>
						Sort by Date {sortOrder === 'descending' ? '🔽' : '🔼'}
					</button>
				</div>

				{error && <ErrorMessage message={error} />}
				<IssueList
					org={org}
					repo={repo}
					onError={handleError}
					filterText={filterText}
					sortOrder={sortOrder}
				/>
			</div>
		</div>
	);
};

export default IssueViewer;

import React from 'react';

interface InputFormProps {
	onOrgRepoChange: (org: string, repo: string) => void;
	org?: string;
	repo?: string;
}

const InputForm: React.FC<InputFormProps> = ({ onOrgRepoChange }) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const org = formData.get('org') as string;
		const repo = formData.get('repo') as string;
		onOrgRepoChange(org, repo);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-6xl mx-auto my-8 p-4 shadow-md rounded-lg bg-var(--bg-primary) border w-full"
			style={{ borderColor: 'var(--border-color)' }}
		>
			<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="w-full">
					<label
						htmlFor="org"
						className="text-sm font-medium text-var(--text-primary)"
					>
						Organization:
					</label>
					<input
						name="org"
						type="text"
						id="org"
						placeholder="Enter organization"
						className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-500"
						style={{ color: 'var(--text-dark)' }}
					/>
				</div>
				<div className="w-full">
					<label
						htmlFor="repo"
						className="block text-sm font-medium text-var(--text-primary)"
					>
						Repository:
					</label>
					<input
						name="repo"
						type="text"
						id="repo"
						placeholder="Enter repository"
						className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-500"
						style={{ color: 'var(--text-dark)' }}
					/>
				</div>
				<button type="submit" className="primary-button w-full mt-4 sm:mt-0">
					Submit
				</button>
			</div>
		</form>
	);
};

export default InputForm;

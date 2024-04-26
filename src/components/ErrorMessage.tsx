import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
	return (
		<div>
			<p>{message}</p>
		</div>
	);
};

export default ErrorMessage;

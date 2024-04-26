import React from 'react';

const LoadingIndicator: React.FC = () => {
	return (
		<>
			<style>
				{`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1.0);
            }
          }
        `}
			</style>
			<div className="flex justify-center items-center h-20">
				<div className="flex space-x-2">
					<div
						className="w-2.5 h-2.5 bg-current rounded-full"
						style={{
							animation: 'bounce 1.4s infinite ease-in-out both',
							animationDelay: '-0.32s',
						}}
					></div>
					<div
						className="w-2.5 h-2.5 bg-current rounded-full"
						style={{
							animation: 'bounce 1.4s infinite ease-in-out both',
							animationDelay: '-0.16s',
						}}
					></div>
					<div
						className="w-2.5 h-2.5 bg-current rounded-full"
						style={{
							animation: 'bounce 1.4s infinite ease-in-out both',
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default LoadingIndicator;

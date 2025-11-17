import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message, retry }) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-700 dark:text-red-300 text-sm mb-4">
            {message || 'Failed to load news. Please try again.'}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

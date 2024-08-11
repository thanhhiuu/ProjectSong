import { useRouteError } from 'react-router-dom';
import './index.css';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="text-center flex items-center justify-center flex-col h-screen"
    >
      <h1 className="text-red-600 text-4xl">Oops!</h1>
      <p className="mt-6 mb-6">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-gray-600">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

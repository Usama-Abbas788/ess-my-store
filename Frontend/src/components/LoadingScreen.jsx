function LoadingScreen({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>

        <p className="text-sm text-gray-600">
          {title}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
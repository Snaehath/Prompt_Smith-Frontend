'use client';

type LoaderProps = {
  loading: boolean;
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, text = 'Loading...' }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
};

export default Loader;

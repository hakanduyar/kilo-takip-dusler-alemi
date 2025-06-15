
export const DashboardBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-300 via-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-yellow-200 via-orange-200 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '4s'}}></div>
    </div>
  );
};

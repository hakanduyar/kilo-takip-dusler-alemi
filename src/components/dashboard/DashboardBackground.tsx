
export const DashboardBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
    </div>
  );
};

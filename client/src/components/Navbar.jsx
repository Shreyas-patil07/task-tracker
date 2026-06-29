function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          📋 Task Tracker
        </h1>
        <span className="text-blue-200 text-sm hidden sm:block">
          Stay organized. Stay productive.
        </span>
      </div>
    </nav>
  );
}

export default Navbar;

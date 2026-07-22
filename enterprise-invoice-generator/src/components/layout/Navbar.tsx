function Navbar() {
  return (
    <header className="bg-white shadow px-6 h-16 flex justify-between items-center">
      <h2 className="font-semibold text-lg">
        Enterprise Invoice Generator
      </h2>

      <div className="flex gap-4 items-center">
        <button>
          🔔
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />
      </div>
    </header>
  );
}

export default Navbar;
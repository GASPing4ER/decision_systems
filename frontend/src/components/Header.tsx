import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full bg-white z-10 top-0 left-0 h-20 border flex justify-between items-center px-20">
      <Link href="/">
        <h2>WISE VENTURE</h2>
      </Link>
      <Link href="/archive">ARCHIVE</Link>
    </header>
  );
};

export default Header;

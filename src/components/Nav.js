const Nav = ({ children }) => {
  return (
    <nav className="nav col">
      <div className="row--col">{children}</div>
    </nav>
  );
};

export default Nav;

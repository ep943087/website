import HeaderLink from "../utils/HeaderLink";

function TopNavigation() {
  return (
    <div className="topNavigation">
      <HeaderLink linkURL="/" label="Home" />
      <div>
        <HeaderLink linkURL="/about" label="About" />
      </div>
    </div>
  );
}

export default TopNavigation;
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const homeNavbar = () => {
  return (
    <div className="home-nav">
      <div className="home-logo">theJAPANDIstore</div>
      <div className="home-menu-icons d-flex">
        <div className="home-nav-menu mr-16">Living</div>
        <div className="home-nav-menu mr-16">Bedroom</div>
        <div className="home-nav-menu mr-16">Kitchen</div>
        <div className="home-nav-menu mr-16">Bathroom</div>
        <div className="home-nav-menu mr-16">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="home-nav-menu mr-16">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="home-nav-menu mr-16 ">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </div>
    </div>
  );
};

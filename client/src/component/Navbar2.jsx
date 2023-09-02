import { Dropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiShoppingBag, BiUser, BiMenu } from "react-icons/bi";
import useFetchData from "../hooks/fetchData";
import { getCategories, loginUser } from "../config/api";
import Sidebar from "./sidebar";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Account from "./Account";
export default function Navbar() {
  const [showSerach, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShow = () => setShowLoginModal(!showLoginModal);
  const navigate = useNavigate();
  const { data } = useFetchData(getCategories);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`search/`);
    }
  };
  return (
    <nav className="py-2 px-3 shadow fixed-top w-100 bg-white">
      <div className="layout-container">
        <div className="d-flex align-items-center">
          {!showSerach && (
            <>
              <Sidebar />
              <NavLink to="/" className="fs-3 text-black fw-bold mt-1 me-4">
                SHOP
              </NavLink>
              <Dropdown className="flex-grow-1 d-none d-lg-block">
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  size="sm"
                  className="text-black fw-bold fs-5"
                >
                  COLLECTIONS
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data.map((category) => (
                    <Dropdown.Item
                      href="#/action-1"
                      key={category._id}
                      as={NavLink}
                      to={`/collections/${category.name}`}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div className="d-flex align-items-center gap-4 ms-auto">
                <BsSearch
                  style={{ cursor: "pointer" }}
                  size="23px"
                  onClick={() => setShowSearch(!showSerach)}
                />
                <BiShoppingBag style={{ cursor: "pointer" }} size="24px" />
                <BiUser style={{ cursor: "pointer" }} size="24px" onClick={handleShow}/>
                <Account show={showLoginModal} onHide={handleShow} />
                
              </div>
            </>
          )}
          {showSerach && (
            <form
              className="position-relative ms-auto searchBox"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Search for shoes, beauty, and more..."
                className="position-absolute top-50 start-50 translate-middle search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AiOutlineClose
                style={{ cursor: "pointer" }}
                className="position-absolute top-50 end-0 translate-middle"
                onClick={() => {
                  {
                    setShowSearch(!showSerach);
                    setSearchQuery(""); // set search input back to empty after search
                  }
                }}
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

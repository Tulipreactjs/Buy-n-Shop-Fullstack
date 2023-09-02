import { BiMenu } from "react-icons/bi";
import { Offcanvas } from "react-bootstrap";
import useFetchData from "../hooks/fetchData";
import { getCategories } from "../config/api";
import { NavLink } from "react-bootstrap";
import { useState } from "react";
export default function Sidebar() {
  const [show, setShow] = useState(false);
  const { data } = useFetchData(getCategories);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <BiMenu
        style={{ cursor: "pointer" }}
        size="24px"
        className="me-2 d-md-none"
        onClick={handleShow}
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <NavLink className="fs-3 fw-bold" to="/">SHOP</NavLink>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <hr />
            <h1 className="mb-2 fs-4 pb-3">Collections</h1>
            {data.map((category) => (
              <div key={category._id} className="mb-3">
                <NavLink
                  to={`/collecti/${category.name}`}
                  className={({ isActive }) =>
                    isActive ? "text-success fw-bold" : "text-black fw-medium"
                  }
                  onClick={handleClose}
                >
                  {category.name}

                </NavLink>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

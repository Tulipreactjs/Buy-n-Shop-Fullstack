import { BiShoppingBag } from "react-icons/bi";
import { Badge, Image, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
export default function ShoppingBag() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
      <div className="position-relative mx-4" onClick={handleShow}>
        <BiShoppingBag style={{ cursor: "pointer" }} size="24px" />
        <h6 className="position-absolute top-0 start-100 translate-middle fs-6">
          <Badge pill bg="dark">
            0
          </Badge>
        </h6>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

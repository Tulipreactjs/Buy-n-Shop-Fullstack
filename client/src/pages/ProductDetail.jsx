import { useParams } from "react-router-dom";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from "react-hot-toast";
import Loader from "../utils/Loader";
import PageLayout from "../component/PageLayout";
import ImageModal from "../component/ImageModal";
import ProductCard from "../component/ProductCard";
import { useState, useEffect, useReducer, useCallback } from "react";
import { initialState, productReducer } from "../reducers/productReducer";
import {
  getOneProduct,
  getAllProducts,
  likeProduct,
  disLikeProduct,
} from "../config/api";
import useFetchData from "../hooks/fetchData";
import { useStore } from "../config/store";
import useScroll from "../hooks/scroll";
import { AiFillLike } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function ProductDetail() {
  const { slug } = useParams();
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { error, data, loading } = useFetchData(getAllProducts);
  const { scroll, scrollRef } = useScroll();
  const { currentUser, setCurrentUser, increaseCartQty , setShow} = useStore();
  const suggestedProducts = data.filter(
    (product) => product.category !== state?.product?.category
  );

  const addToCart = (item)=> {
    increaseCartQty(item)
    toast.success(`${item.title} Added to bag`)
    setShow(true)
  }

  const handleLike = async () => {
    try {
      await likeProduct(
        state?.product?._id,
        currentUser?.user?._id,
        currentUser?.access_token
      );

      dispatch({
        type: "LIKE_PRODUCT",
        payload: currentUser?._id,
      });
      getProductDetail();
      toast.success("You liked this");
    } catch (error) {
      toast.error("unable to like, pls log in first");
    }
  };

  const handleDislLike = async () => {
    try {
      await disLikeProduct(
        state?.product?._id,
        currentUser?.user?._id,
        currentUser?.access_token
      );
      dispatch({
        type: "DISLIKE_PRODUCT",
        payload: currentUser?._id,
      });
      getProductDetail();
      toast.success("You disliked this");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getProductDetail = async () => {
    dispatch({ type: "PRODUCT_REQUEST" });
    try {
      const res = await getOneProduct(slug);
      dispatch({ type: "GET_PRODUCT_DETAIL_SUCCESS", payload: res.data });
      console.log("selected product", res.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "PRODUCT_ERROR", payload: error.message });
      toast.error("Unable to get product details");
    } finally {
      dispatch({ type: "END_PRODUCT_REQUEST" });
    }
  };


  useEffect(() => {
    getProductDetail();
  }, [slug]);

  return (
    <>
      <PageLayout>
        {state?.loading ? (
          <Loader />
        ) : (
          <Row className="justify-content-around g-4 mt-2">
            {state?.errorMessage && (
              <p className="fs-5">{state?.errorMesssage}</p>
            )}
            <Col lg={6} className="mb-5">
              <Row className="g-2">
                {state?.product?.images?.map((image, i) => (
                  <Col xs={6} key={i}>
                    <Image
                      src={image}
                      alt={state?.product.title}
                      className="w-100 h-100"
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        {
                          setShowModal(true);
                          setCurrent(i);
                        }
                      }}
                    />
                    {showModal && (
                      <ImageModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        current={current}
                        setCurrent={setCurrent}
                        data={state?.product}
                      />
                    )}
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={3}>
              <h1 className="fw-bold fs-3">{state?.product?.title}</h1>
              <div className="mt-3 d-flex justify-content-between align-items-center flex-wrap">
                <span className="fs-5">
                  Brand: <b>{state?.product?.brand}</b>
                </span>
                <AiFillLike
                  style={{ cursor: "pointer" }}
                  size="1.8rem"
                  className={
                    state?.product?.likes?.includes(currentUser?.user?._id)
                      ? "color"
                      : ""
                  }
                  onClick={() => {
                    console.log("Current user ID:", currentUser?.user?._id);
                    console.log("Product likes:", state?.product?.likes);

                    if (
                      state?.product?.likes?.includes(currentUser?.user?._id)
                    ) {
                      console.log("Calling handleDislike");
                      handleDislLike();
                    } else {
                      console.log("Calling handleLike");
                      handleLike();
                    }
                  }}
                />
              </div>
              <p className="mt-3 fs-5">
                {formatCurrency(state?.product?.price)}
              </p>
              <Button variant="dark" className="mt-3 w-100 rounded-0" onClick={()=>addToCart(state?.product)}>
                ADD TO BAG
              </Button>

              <div className="mt-5">
                <p className="fw-bold fs-6 text-uppercase">
                  Product description{" "}
                </p>
                <p className="fs-6">{state?.product?.description}</p>
              </div>
              {state?.product?.extra?.length > 0 && (
                <div className="mt-5">
                  <hr />
                  <p className="fw-bold fs-6 text-uppercase">ADDITIONAL</p>
                  {state?.product?.extra?.map((item, i) => (
                    <p key={i} className="fs-6">
                      -{item}
                    </p>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        )}
      </PageLayout>
      <h1 className="mt-5 text-center fw-bold fs-4">You may also like</h1>
      <Container fluid className="mt-4 mx-auto">
        {error && <p className="fs-5">{error.message}</p>}
        {loading ? (
          <Loader />
        ) : (
          <div className="d-flex gap-4 overflow-x-auto overflow-x-hidden h-100">
            <div className="position-relative">
              <BsArrowLeftCircle
                className="position-absolute top-50 start-0 translate-middle text-black z-2"
                size="1.8rem"
                style={{ cursor: "pointer" }}
                onClick={() => scroll("left")}
              />
              <BsArrowRightCircle
                className="position-absolute top-50 start-100 translate-middle text-black z-2"
                size="1.8rem"
                style={{ cursor: "pointer" }}
                onClick={() => scroll("right")}
              />
              <div
                className="d-flex gap-4 overflow-x-auto overflow-y-hidden h-100"
                ref={scrollRef}
              >
                {suggestedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  ></ProductCard>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

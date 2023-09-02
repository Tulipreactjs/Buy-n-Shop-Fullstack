import { useParams } from "react-router-dom";
import { Headings, PageLayout, ProductCard } from "../component";
import { getProductByCategory } from "../config/api";
import useFetchData from "../hooks/fetchData";
import Loader from "../utils/Loader";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
export default function Categories() {
  const { collectionName } = useParams();
  const { data, error, loading } = useFetchData(
    getProductByCategory,
    collectionName
  );
  useEffect(() => {
    document.title = collectionName;
  }, [collectionName]);

  return (
    <PageLayout>
      <Headings
        title={collectionName}
        text={`Browse our latest collection of ${collectionName} items for you.`}
      />
      {error && <p className="fs-5">{error.message}</p>}

      {loading ? (
        <Loader />
      ) : (
        <Row className="mt-4 gy-3">
          {data.map((product) => (
            <Col key={product._id} xs={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  );
}

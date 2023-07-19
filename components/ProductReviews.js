import styled from "@emotion/styled";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import TextArea from "./TextArea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ReviewsWrapper = styled.div`
  margin-bottom: 20px;
  border-top: solid 1px #ddd;
  min-height: 5em;
  h4 {
    margin: 5px 0;
    font-size: 1rem;
    color: #444;
  }
  p {
    margin: 5px 0;
    line-height: 1rem;
    color: black;
    font-size: 0.9rem;
    font-weight: normal;
  }
`;

const ReviewHeader = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  time {
    font-size: 14px;
    color: gray;
  }
`;
export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  function submitReview() {
    const data = {
      title,
      text,
      stars,
      product: product._id
    };
    axios.post("/api/reviews", data).then((response) => {
      setTitle("");
      setText("");
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((response) => {
      if (response.data.length > 0) {
        setReviews(response.data);
      }
      setLoading(false);
    });
  }

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitle>Add review</Subtitle>
            <div>
              <StarsRating onChange={setStars} size={"md"} disabled={false} />
            </div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            <TextArea
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></TextArea>
            <div>
              <Button onClick={submitReview}>Submit</Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>All reviews</Subtitle>
            {loading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>no reviews</p>}
            {reviews.map((review) => (
              <ReviewsWrapper key={review._id}>
                <ReviewHeader>
                  <StarsRating
                    disabled={true}
                    defaultN={review.stars}
                    key={review._id}
                    size={"sm"}
                  />
                  <time>
                    {new Date(review.createdAt).toLocaleString("en-GB", {
                      dateStyle: "short",
                      timeStyle: "short"
                    })}
                  </time>
                </ReviewHeader>
                <h4>{review.title}</h4>
                <p>{review.text}</p>
              </ReviewsWrapper>
            ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}

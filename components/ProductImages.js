import styled from "@emotion/styled";
import { useState } from "react";

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
`;

const SmallImages = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
`;

const SmallImage = styled.img`
  height: 69px;
  cursor: pointer;
  border-radius: 3px;
  ${(props) =>
    props.active ? `border:solid 2px #ccc;` : `border:solid 2px transparent`}
`;

const BigImageWrap = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [bigImage, setBigImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrap>
        <BigImage src={bigImage} />
      </BigImageWrap>
      <div>
        <SmallImages>
          {images.map((image, index) => (
            <SmallImage
              src={image}
              alt=""
              key={index}
              active={image === bigImage}
              onClick={() => setBigImage(image)}
            />
          ))}
        </SmallImages>
      </div>
    </>
  );
}

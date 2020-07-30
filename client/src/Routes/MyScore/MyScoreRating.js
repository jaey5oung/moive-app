import React, { useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const StarsWrapper = styled.span`
  line-height: 1;
  margin-left: 50px;
`;

const Rating = ({ movieId, count, setCount, genres, imageUrl, title }) => {//{ movieId, count, setCount, genres, imageUrl, title }

const onClickHandler = (value) => {
  // console.log("props:", props);

    // console.log("genres:", genres);
    axios.post("/api/myscore/giveStarRating", {
      userFrom: localStorage.getItem("userId"),
      movieId: movieId,
      genres: genres,
      score: value,
      imageUrl: imageUrl,
      title: title,
    }).then(response => {
      if (response.data.success && response.data.exist) {
        setCount(count)
      } else if(response.data.success && !response.data.exist) {
        setCount(count+1)  
      } else {
        alert("평가하기를 실패했습니다.")
      }
    })
  };

  return (
    <StarsWrapper>
      <Rate onChange={onClickHandler} />
    </StarsWrapper>
  );

}


export default Rating;
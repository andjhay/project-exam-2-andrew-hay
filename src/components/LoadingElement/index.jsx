import React from "react";
import styled from "styled-components";

const LoadingElement1 = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  background-color: #aab9bf;
  border-radius: 50%;
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;

  @keyframes loading {
    0% {
      right: 0%;
    }
    25% {
      right: -50%;
    }
    50% {
      right: 0%;
    }
    75% {
      right: 50%;
    }
    100% {
      right: 0%;
    }
  }
`;

const LoadingElement2 = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: #252617;
  border-radius: 50%;
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  animation-delay: -1s;

  @keyframes loading {
    0% {
      right: 0%;
    }
    25% {
      right: -50%;
    }
    50% {
      right: 0%;
    }
    75% {
      right: 50%;
    }
    100% {
      right: 0%;
    }
  }
`;

const LoadingElement3 = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: #d9b282;
  border-radius: 50%;
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  animation-delay: -2s;

  @keyframes loading {
    0% {
      right: 0%;
    }
    25% {
      right: -50%;
    }
    50% {
      right: 0%;
    }
    75% {
      right: 50%;
    }
    100% {
      right: 0%;
    }
  }
`;

function LoadingElement() {
  return (
    <div className="m-auto w-60">
      <h2 className="text-center font-subheader text-xl">Loading</h2>
      <div className="flex w-full items-center justify-center p-3">
        <LoadingElement1 />
        <LoadingElement2 />
        <LoadingElement3 />
      </div>
    </div>
  );
}

export default LoadingElement;

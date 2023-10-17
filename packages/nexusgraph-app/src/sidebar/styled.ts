// Copyright 2023 Paion Data. All rights reserved.
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import nlp from "./img/nlp.png";

export const CreateButtonStyled = styled.button`
  position: absolute;
  width: 90%;
  height: 20%;
  border-radius: 1rem;
  border: none;
  margin: 5%;
  color: #f9bfd5;
  background: rgba(256, 256, 256, 0.6);
  cursor: pointer;
  word-wrap: break-word;
  font-size: 20px;
  & svg {
    height: 30%;
    stroke-width: 1px;
    stroke: #f9bfd5;
  }

  &:hover {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(245, 95, 145, 0.45);
  }
`;

export const FeatureButton = styled.button`
  position: absolute;
  width: 20%;
  height: 30%;
  margin: 5%;
  background-image: url(${nlp});
  background-size: 100% 100%;
  line-height: 1px;
  vertical-align: top;
  border-radius: 1rem;
  border-style: solid;
  border-width: 3px;
  border-color: #f7b5ce;
  cursor: pointer;
  word-wrap: break-word;
  font-size: 20px;
  &:hover {
    border-color: rgba(245, 95, 145);
  }

  & p {
    position: absolute;
    top: 15px;
    left: 85px;
  }
`;

export const IntelligentAITextarea = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  & textarea {
    border-radius: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #000;
    margin: 2% 4% 4% 4%;
    width: 90%;
    height: 65%;
    font-size: 20px;
    padding: 1%;
  }

  & textarea:focus {
    outline: none;
  }

  & button {
    justify-content: center;
    align-items: center;
    margin: 0% 25%;
    width: 50%;
    height: 10%;
    background: #fa87b3;
    border: none;
    border-radius: 2rem;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    word-wrap: break-word;
    font-size: 20px;
    &:hover {
      background: #f55f91;
    }
  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  flex-direction: column;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(256, 256, 256, 0.3);
  flex-grow: 0px;
  flex-shrink: 1px;
  z-index: 100;
`;

export const StyledModalContent = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -600px;
  top: 50%;
  margin-top: -350px;
  z-index: 999;
  border-radius: 1rem;
  border: none;
  width: 1200px;
  height: 700px;
  background: rgba(256, 256, 256, 0.6);
  & .modalClose {
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    margin: 10px;
    position: absolute;
    right: 0%;
    top: 0%;
  }

  & .modalContent {
    width: 100%;
    height: 100%;
  }
`;

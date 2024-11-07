import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 800;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      text-transform: uppercase;
      font-size: 2rem;
      font-weight: 800;
    `}
      
      ${(props) =>
    props.as === "h3" &&
    css`
      text-transform: uppercase;
      font-size: 2rem;
      font-weight: 400;
    `}
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;

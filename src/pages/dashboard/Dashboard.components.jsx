import styled from "styled-components";

const DashboardWrapper = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Error = styled.div`
  margin: auto;
  width: 300px;
  height: 40px;
  padding: 14px;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.3);
  color: red;
  font-size: 12px;
`;

export { DashboardWrapper, Title, Error };

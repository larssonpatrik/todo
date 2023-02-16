import React, { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "./Typography";
import { AiOutlineClose } from "react-icons/ai";

type TaskItemProps = {
  status: boolean;
  removeTask: Function;
  changeStatus: Function;
};

export default function TaskItem({
  children,
  removeTask,
  changeStatus,
  status,
}: React.PropsWithChildren<TaskItemProps>) {
  const [hover, setHover] = useState(false);
  return (
    <ScDiv
      status={status}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Paragraph action={changeStatus} style={{ lineHeight: "23.5px" }}>
        {children}
      </Paragraph>
      {hover && (
        <AiOutlineClose
          size={16}
          style={{ cursor: "pointer", color: "#CF4242" }}
          onClick={() => {
            changeStatus();
            removeTask(children);
          }}
        />
      )}
    </ScDiv>
  );
}

const ScDiv = styled.div<{ status: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;

  ${(props) =>
    props.status === true
      ? "text-decoration: line-through; color: #dcdcdc"
      : "text-decoration: none"};

  @media (max-width: 480px) {
    width: 300px;
  }
`;

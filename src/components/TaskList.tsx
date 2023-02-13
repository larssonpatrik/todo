import React from "react";
import styled from "styled-components";
import InputItem from "./InputItem";
import Spacer from "./Spacer";
import TaskItem from "./TaskItem";
import { H2, Paragraph } from "./Typography";

type TaskListProps = {
  taskList: { task: string; completed: boolean }[];
  title: string;
  functions: any[];
};

export default function TaskList({
  taskList,
  title,
  functions,
}: TaskListProps) {
  //
  // functions from props
  const [addToList, removeFromList, changeState, removeList] = functions;
  return (
    <ScDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <H2>{title}</H2>
        <Paragraph
          action={() => removeList(title)}
          style={{ textDecoration: "underline", fontSize: 14 }}
          button={true}
        >
          Remove list
        </Paragraph>
      </div>
      <Spacer size={3} />
      {taskList.map((obj, i) => {
        return (
          <>
            <TaskItem
              removeTask={removeFromList}
              status={obj.completed}
              changeStatus={() => changeState(i)}
            >
              {obj.task}
            </TaskItem>
            <Spacer size={1} />
          </>
        );
      })}
      <InputItem action={addToList} />
    </ScDiv>
  );
}

const ScDiv = styled.div`
  padding: 24px;
  border-radius: 8px;
  background-color: #f0f0f0;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

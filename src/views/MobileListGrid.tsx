import React from "react";
import Spacer from "../components/Spacer";
import ListPresenter from "../presenters/ListPresenter";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineLeft } from "react-icons/ai";
import { H1, H2, Paragraph } from "../components/Typography";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";

type ListGridProps = {
  activePageState: [
    {
      title: string;
      lists: {
        label: string;
        taskList: { task: string; completed: boolean }[];
      }[];
    },
    Function
  ];

  addingState: [addingState: boolean, setAddingState: Function];
  addList: Function;
  removeList: Function;
};

export default function ListGrid({
  activePageState,
  addingState,
  addList,
  removeList,
}: ListGridProps) {
  const [addingStateVar, setAddingState] = addingState;
  const [activePage, changeActivePage] = activePageState;
  const navigate = useNavigate();
  return (
    <>
      <Spacer size={4} />
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: 32 }}
        onClick={() => navigate(-1)}
      >
        <AiOutlineLeft size={25} />
        <Spacer size={0} />
        <Paragraph>Pages</Paragraph>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Spacer size={5} />
        <H1>{activePage.title}</H1>
        <Spacer size={6} />
        <ScDiv>
          {activePage.lists.map((listObj, i) => {
            function addTaskToList(task: string) {
              let temp = { ...activePage };
              temp.lists[i].taskList = [
                ...temp.lists[i].taskList,
                { task: task, completed: false },
              ];
              changeActivePage({ ...temp });
            }

            function removeTaskFromList(task: string) {
              let temp = { ...activePage };
              temp.lists[i].taskList = temp.lists[i].taskList.filter(
                (taskObj) => {
                  return taskObj.task !== task;
                }
              );
              changeActivePage({ ...temp });
            }

            function changeState(index: number) {
              let temp = { ...activePage };
              temp.lists[i].taskList[index].completed =
                !temp.lists[i].taskList[index].completed;
              changeActivePage({ ...temp });
            }

            return (
              <>
                <ListPresenter
                  taskList={listObj.taskList}
                  title={listObj.label}
                  addTask={addTaskToList}
                  removeTask={removeTaskFromList}
                  removeList={removeList}
                  changeState={changeState}
                />
                <Spacer size={6} />
              </>
            );
          })}
          <ScAddListElement addingState={addingStateVar}>
            {addingStateVar ? (
              <div>
                <H2>List name</H2>
                <Spacer size={1} />
                <InputForm action={addList} />
                <Spacer size={1} />
                <Paragraph
                  align="center"
                  button={true}
                  action={() => setAddingState(!addingStateVar)}
                >
                  Cancel
                </Paragraph>
              </div>
            ) : (
              <div
                style={{ textAlign: "center", padding: 12, cursor: "pointer" }}
                onClick={() => setAddingState(!addingStateVar)}
              >
                <AiOutlinePlus size={42} color="#dcdcdc" />
                <Spacer size={0} />
                <Paragraph color="#cccccc">Add new list</Paragraph>
              </div>
            )}
          </ScAddListElement>
        </ScDiv>
      </div>
      <Spacer size={7} />
    </>
  );
}

const ScDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ScAddListElement = styled.div<{ addingState: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    !props.addingState ? "justify-content: center; align-items: center;" : null}
  padding: 21px;
  border-radius: 8px;
  border: 3px solid #f0f0f0;
  width: 300px;
`;

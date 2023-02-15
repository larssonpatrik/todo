import React, { useState } from "react";
import Spacer from "../components/Spacer";
import { H1 } from "../components/Typography";
import Wrapper from "../components/Wrapper";
import ListGridPresenter from "./ListGridPresenter";
import SidebarPresenter from "./SidebarPresenter";

export default function PagePresenter() {
  const [pageList, setPageList] = useState<
    {
      title: string;
      lists: {
        label: string;
        taskList: { task: string; completed: boolean }[];
      }[];
    }[]
  >([{ title: "Apartment stuff", lists: [] }]);
  const [activePage, setActivePage] = useState<{
    title: string;
    lists: {
      label: string;
      taskList: { task: string; completed: boolean }[];
    }[];
  }>(pageList[0]);
  const [addingState, setAddingState] = useState<boolean>(false);

  function changeActivePage(page: {
    title: string;
    lists: {
      label: string;
      taskList: { task: string; completed: boolean }[];
    }[];
  }) {
    setActivePage(page);

    let temp = [...pageList];
    temp.forEach((pageObj, i) => {
      if (pageObj.title === activePage.title) {
        temp[i] = page;
      }
    });

    setPageList([...temp]);
  }

  console.log("PAGELIST: ", pageList);
  console.log("ACTIVEPAGE: ", activePage);
  return (
    <Wrapper direction="row">
      <SidebarPresenter
        SBpageList={[pageList, setPageList]}
        SBactivePage={[activePage, setActivePage]}
        SBaddingState={[addingState, setAddingState]}
      />
      <Wrapper direction="col" style={{ width: "80vw" }}>
        <Spacer size={7} />
        <Spacer size={5} />
        <H1>{activePage.title}</H1>
        <Spacer size={6} />
        <ListGridPresenter activePageState={[activePage, changeActivePage]} />
      </Wrapper>
    </Wrapper>
  );
}

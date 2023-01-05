import React, { useEffect } from "react";
import BoardComponent from "../../components/Boards/Board";
import { useStoreActions, useStoreState } from "../../Hooks/useState";
import "./BoardPage.css";

const BoardsPage = () => {
  const boards = useStoreState((state) => state.board.boards);
  const getBoards = useStoreActions((action) => action.board.getBoards);

  useEffect(() => {
    if (!boards.length) getBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BoardComponent />
    </div>
  );
};

export default BoardsPage;

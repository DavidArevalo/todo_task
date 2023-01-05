import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getBoard } from "../../service/boards";
import { Board } from "../../types/board";
import { BoardArea } from "./BoardArea/BoardArea";
import "./Board.css";

const BoardComponent = () => {
  let { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(id: string) {
      setIsLoading(true);
      setBoard(getBoard(id));
      setIsLoading(false);
    }
    fetchData(id || "0");
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="BoardLoading">
        <CircularProgress />
      </div>
    );
  }

  return <>{board ? <BoardArea board={board} /> : <Typography>Board not found</Typography>}</>;
};

export default BoardComponent;

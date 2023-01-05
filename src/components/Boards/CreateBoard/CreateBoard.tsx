import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addNewBoard } from "../../../service/boards";
import { RoutesPath } from "../../../service/config";
import { NewBoard } from "../../../types/board";
import "./CreateBoard.css";

export const CreateBoard = () => {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const board: NewBoard = {
      name: boardName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    const newBoardId = await addNewBoard(board);
    navigate(`${RoutesPath.boards}/${newBoardId}`);
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" className="CreateBoardCard">
          <CardHeader
            className="CreateBoardCardHeader"
            title="Create New Task Board"
            titleTypographyProps={{ variant: "h4" }}
          />
          <CardContent className="CreateBoardCardContent">
            <TextField
              className="CreateBoardTextField"
              required
              id="filled-required"
              label="Board Name"
              defaultValue={boardName}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value)}
            />
            <TextField
              className="CreateBoardTextField"
              required
              id="filled-required"
              label="Description"
              defaultValue={createdBy}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCreatedBy(event.target.value)}
            />
          </CardContent>
          <CardActions className="CreateBoardCardAction">
            <Button type="submit" variant="contained" color="primary" className="CreateBoardButton">
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};

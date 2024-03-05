import { useState } from "react";
import store from "../../../../../Redux/Store";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import CustomLink from "../../../../Utils/CustomLink/CustomLink";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

function GameReview() {
  const length = store.getState().gameReducer.questionIndex;
  const game = store.getState().gameReducer.game;
  const userAnswers = store.getState().gameReducer.userAnswers;
  const correctAnswers = useState(store.getState().gameReducer.userAnswers.filter((answer) => answer.isCorrect));

  return (
    <div>
      <TableContainer component={Paper} >
        <p>Total correct answers: {correctAnswers.length} / {length}</p>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {game?.questions?.map((question, index) => {
              const userAnswer = userAnswers.find((answer) => answer.questionIndex === index);
              const isCorrect = userAnswer?.isCorrect || false;
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{question.questionBody}</TableCell>
                  <TableCell>{isCorrect ? <CheckSharpIcon color="success" fontSize="medium" />  : "❌"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} marginTop={2} >
        <CustomLink to="/">home</CustomLink>
      </Box>
    </div>
  );
}
export default GameReview;
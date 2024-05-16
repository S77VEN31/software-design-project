import { ChangeEvent, Fragment, useEffect, useState } from "react";
// Components
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
// Types
import { Comment } from "@enumerables";
// Libraries
import {
  addActivityCommentRequest,
  addReplyCommentRequest,
  getActivityCommentsRequest,
} from "@api";
// Utils
import { formatDate } from "@utils";
// Interfaces
interface CommentBoxProps {
  userId: string;
  activityId: string;
}

const CommentBox = ({ userId, activityId }: CommentBoxProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [reply, setReply] = useState<Record<number, string>>({});

  const getComments = async () => {
    try {
      const fetchedComments = await getActivityCommentsRequest(activityId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleReplyChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setReply({ ...reply, [index]: event.target.value });
  };

  const handleAddComment = async () => {
    if (comment.trim() === "") return;

    try {
      const newComment = await addActivityCommentRequest(
        comment,
        userId,
        activityId
      );
      setComments([...comments, newComment]);
      setComment("");
      getComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReply = async (index: number) => {
    if (reply[index]?.trim() === "") return;
    try {
      const newReply = await addReplyCommentRequest(
        reply[index],
        comments[index]._id,
        userId
      );
      const updatedComments = comments.map((comment, i) => {
        if (i === index) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReply({ ...reply, [index]: "" });
      getComments();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        maxHeight: "80vh",
        overflowY: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Comentarios
      </Typography>
      <TextField
        label="Add a comment"
        multiline
        rows={4}
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>
        Agregar comentario
      </Button>
      <List>
        {comments.map((comment, index) => (
          <Fragment key={index}>
            <ListItem alignItems="flex-start">
              <Box key={index} ml={4} mt={2}>
                <Typography variant="subtitle2" color="primary">
                  {comment.author.name}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
            </ListItem>
            <Box ml={4}>
              <TextField
                label="Reply to this comment"
                multiline
                rows={2}
                variant="outlined"
                value={reply[index] || ""}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleReplyChange(event, index)
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleReply(index)}
              >
                Responder
              </Button>
              {comment.replies.map((reply, replyIndex) => (
                <Box key={replyIndex} ml={4} mt={2}>
                  <Typography variant="subtitle2" color="primary">
                    {reply.author.name}
                  </Typography>
                  <Typography variant="body1">{reply.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDate(reply.createdAt)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
export default CommentBox;

import { api } from "@api";
// Environment variables
const { VITE_API_COMMENTS_ACTIVITY, VITE_API_COMMENTS_REPLY } = import.meta.env;

export const getActivityCommentsRequest = async (activityId: string) => {
  const response = await api.get(VITE_API_COMMENTS_ACTIVITY, {
    params: { activityId },
  });
  return response.data;
};

export const addActivityCommentRequest = async (
  content: string,
  userId: string,
  activityId: string
) => {
  const response = await api.post(
    VITE_API_COMMENTS_ACTIVITY,
    { content },
    { params: { userId, activityId } }
  );
  return response.data;
};

export const deleteActivityCommentRequest = async (commentId: string) => {
  const response = await api.delete(VITE_API_COMMENTS_ACTIVITY, {
    params: { commentId },
  });
  return response.data;
};

export const addReplyCommentRequest = async (
  content: string,
  commentId: string,
  userId: string
) => {
  const response = await api.post(
    VITE_API_COMMENTS_REPLY,
    { content },
    { params: { commentId, userId } }
  );
  return response.data;
};

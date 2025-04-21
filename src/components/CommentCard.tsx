import React from 'react';
import { Comment } from '../types';

interface Props {
  comment: Comment;
}

const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      background: '#f9f9f9'
    }}>
      <h3>{comment.name}</h3>
      <p><strong>Email:</strong> {comment.email}</p>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;

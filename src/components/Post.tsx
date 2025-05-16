import React from 'react';

interface PostProps {
  id: number;
  author: string;
  content: string;
  mediaUrl: string;
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Post: React.FC<PostProps> = ({ author, content, mediaUrl, createdAt, onEdit, onDelete }) => {
  return (
    <div className="post">
      <h3>{author}</h3>
      <p>{content}</p>
      {mediaUrl && <img src={mediaUrl} alt="Media" />}
      <span>{new Date(createdAt).toLocaleString()}</span>
      <button className="edit-button" onClick={onEdit}>
        Edit
      </button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Post;
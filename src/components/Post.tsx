import React from 'react';

interface PostProps {
  id: number;
  author: string;
  content: string;
  mediaUrl: string;
  createdAt: string;
  // Optional: if you want to use a custom profile image per post
  profileImageUrl?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Post: React.FC<PostProps> = ({
  author,
  content,
  mediaUrl,
  createdAt,
  onEdit,
  onDelete,
  profileImageUrl, // This is optional
}) => {
 
  const avatar =
    profileImageUrl && profileImageUrl.trim().length > 0
      ? profileImageUrl
      : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"; 

  return (
    <div className="post">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <img
          src={avatar}
          alt="profile"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            marginRight: 10,
            objectFit: 'cover'
          }}
        />
        <h3 style={{ margin: 0 }}>{author}</h3>
      </div>
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

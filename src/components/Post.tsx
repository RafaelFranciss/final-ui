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

const Post: React.FC<PostProps> = ({
  author,
  content,
  mediaUrl,
  createdAt,
  onEdit,
  onDelete,
}) => {
  
  const profileImg = "https://www.pngmart.com/files/23/Profile-PNG-HD.png"; 

  return (
    <div className="post" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, borderBottom: '1px solid #eee' }}>
      <img
        src={profileImg}
        alt="profile"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: 10,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ margin: 0 }}>{author}</h3>
          <span style={{ color: '#999', fontSize: 13 }}>{new Date(createdAt).toLocaleString()}</span>
        </div>
        <p style={{ margin: '7px 0 10px 0' }}>{content}</p>
        {mediaUrl && (
          <img
            src={mediaUrl}
            alt="Media"
            style={{ maxWidth: '100%', borderRadius: 12, marginBottom: 8 }}
          />
        )}
        <div>
          <button className="edit-button" onClick={onEdit}>
            Edit
          </button>
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;

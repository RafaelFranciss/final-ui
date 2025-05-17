import React from 'react';

interface PostProps {
  id: number;
  author: string;
  content: string;
  mediaUrl: string;
  createdAt: string;
  profileImageUrl?: string; // Add this if you want to use a custom image link per post
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
  profileImageUrl, // Use this if provided
}) => {
  return (
    <div className="post" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, borderBottom: '1px solid #eee' }}>
      {/* Profile Picture using image link or fallback */}
      <img
        src={
          profileImageUrl && profileImageUrl.trim()
            ? profileImageUrl
            : "https://tableconvert.com/images/avatar.png" 
        }
        alt="profile"
        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, objectFit: 'cover' }}
      />

      {/* Post Content */}
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

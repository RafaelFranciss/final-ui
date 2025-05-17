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

// Helper to generate a color or image based on author (for demo, static avatar)
const getProfilePic = (author: string) => {
  // You can replace this with a real image URL or use a service like UI Avatars
  // Example with UI Avatars: `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}`
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&size=64`;
};

const Post: React.FC<PostProps> = ({ author, content, mediaUrl, createdAt, onEdit, onDelete }) => {
  return (
    <div className="post" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, borderBottom: '1px solid #eee' }}>
      {/* Profile Picture */}
      <img
        src={getProfilePic(author)}
        alt={`${author} avatar`}
        className="post-profile-pic"
        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
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

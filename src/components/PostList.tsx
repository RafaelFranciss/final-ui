import React, { useState, useRef } from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface Post {
  id: number;
  author: string;
  content: string;
  mediaUrl: string;
  createdAt: string;
  likes?: number;
  comments?: Comment[];
}

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedPost: { author: string; content: string; mediaUrl: string }) => void;
  onLike: (id: number) => void;
  onComment: (id: number, comment: string) => void;
  likedPosts: number[];
}

const GalleryIcon = () => (
  <img
    src="https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-1/16/2072-1024.png"
    alt="gallery"
    style={{ width: 28, height: 28, cursor: 'pointer' }}
  />
);

const profileImg = "https://www.pngmart.com/files/23/Profile-PNG-HD.png";
const commentProfileImg = "https://www.pngmart.com/files/23/Profile-PNG-HD.png";

const PostList: React.FC<PostListProps> = ({
  posts,
  onDelete,
  onEdit,
  onLike,
  onComment,
  likedPosts
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ author: string; content: string; mediaUrl: string }>({
    author: '',
    content: '',
    mediaUrl: '',
  });
  const [editMediaPreview, setEditMediaPreview] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startEdit = (post: Post) => {
    setEditingId(post.id);
    setEditValues({ author: post.author, content: post.content, mediaUrl: post.mediaUrl });
    setEditMediaPreview(post.mediaUrl || null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setEditValues((prev) => ({ ...prev, mediaUrl: url }));
      setEditMediaPreview(url);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      onEdit(editingId, editValues);
      setEditingId(null);
      setEditValues({ author: '', content: '', mediaUrl: '' });
      setEditMediaPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ author: '', content: '', mediaUrl: '' });
    setEditMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCommentInput = (postId: number, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (commentInputs[postId]?.trim()) {
      onComment(postId, commentInputs[postId]);
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="post-list">
      {posts.map((post) =>
        editingId === post.id ? (
          <form key={post.id} className="post-card edit-mode" onSubmit={handleEditSubmit}>
            <input
              className="edit-author"
              name="author"
              value={editValues.author}
              onChange={handleEditChange}
              required
              placeholder="Author"
              readOnly
              style={{ marginBottom: 10 }}
            />
            <textarea
              className="edit-content"
              name="content"
              value={editValues.content}
              onChange={handleEditChange}
              required
              placeholder="What's on your mind?"
              rows={4}
            />
            <div className="media-upload-row">
              <span onClick={handleEditGalleryClick} title="Change image">
                <GalleryIcon />
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleEditFileChange}
              />
              {editMediaPreview && (
                <img src={editMediaPreview} alt="Preview" className="media-preview" />
              )}
            </div>
            <div className="edit-actions">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" onClick={handleEditCancel} className="cancel-btn">Cancel</button>
            </div>
          </form>
        ) : (
          <div key={post.id} className="post-card">
            {/* Profile picture and author name row */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <img
                src={profileImg}
                alt="profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  marginRight: 10,
                  objectFit: 'cover'
                }}
              />
              <h3 style={{ margin: 0 }}>{post.author}</h3>
            </div>
            <p>{post.content}</p>
            {post.mediaUrl && <img src={post.mediaUrl} alt="Post media" />}
            <p>{new Date(post.createdAt).toLocaleString()}</p>
            <div className="post-actions">
              <button
                onClick={() => onLike(post.id)}
                style={{
                  background: likedPosts.includes(post.id) ? "#e6f2ff" : undefined,
                  color: likedPosts.includes(post.id) ? "#1877f2" : undefined,
                  fontWeight: likedPosts.includes(post.id) ? "bold" : undefined,
                }}
              >
                {likedPosts.includes(post.id) ? "💙 Unlike" : "👍 Like"} {post.likes ?? 0}
              </button>
              <button onClick={() => startEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post.id)}>Delete</button>
            </div>
            <div className="comments-section">
              <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="comment-form">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => handleCommentInput(post.id, e.target.value)}
                  className="comment-input"
                />
                <button type="submit" className="comment-btn">Comment</button>
              </form>
              <div className="comments-list">
                {post.comments && post.comments.map((comment) => (
                  <div key={comment.id} className="comment-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <img
                      src={commentProfileImg}
                      alt="profile"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        marginRight: 8,
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <strong>{comment.author}:</strong> {comment.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PostList;

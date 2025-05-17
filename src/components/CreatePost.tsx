import React, { useState, useRef } from 'react';

interface CreatePostProps {
  onCreate: (newPost: { author: string; content: string; mediaUrl: string }) => void;
}

const GalleryIcon = () => (
  <img
    src="https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-1/16/2072-1024.png"
    alt="gallery"
    style={{ width: 28, height: 28, cursor: 'pointer' }}
  />
);

const CreatePost: React.FC<CreatePostProps> = ({ onCreate }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaPreview(url);
    }
  };

  // When the user types or pastes a link, set the mediaPreview as well
  const handleMediaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
    setMediaPreview(e.target.value ? e.target.value : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ author, content, mediaUrl });
    setAuthor('');
    setContent('');
    setMediaUrl('');
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="media-upload-row">
        <span onClick={handleGalleryClick} title="Add image">
          <GalleryIcon />
        </span>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Or paste image link here"
          value={mediaUrl}
          onChange={handleMediaUrlChange}
          style={{ marginLeft: 10, flex: 1 }}
        />
        {mediaPreview && (
          <img src={mediaPreview} alt="Preview" className="media-preview" />
        )}
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;

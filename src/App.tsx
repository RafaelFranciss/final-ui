import React, { useState, useEffect } from 'react';
import './styles/app.css';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

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

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>(() => {
    const stored = localStorage.getItem('likedPosts');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleCreatePost = (newPost: { author: string; content: string; mediaUrl: string }) => {
    fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => setPosts((prev) => [...prev, data]));
  };

  const handleDeletePost = (id: number) => {
    fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' })
      .then(() => setPosts((prev) => prev.filter((post) => post.id !== id)));
  };

  const handleEditPost = (id: number, updatedPost: { author: string; content: string; mediaUrl: string }) => {
    fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((data) =>
        setPosts((prev) =>
          prev.map((post) => (post.id === id ? { ...post, ...data } : post))
        )
      );
  };

  const handleLikePost = (id: number) => {
    if (likedPosts.includes(id)) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, likes: post.likes && post.likes > 0 ? post.likes - 1 : 0 }
            : post
        )
      );
      setLikedPosts((prev) => prev.filter((postId) => postId !== id));
    } else {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, likes: (post.likes ?? 0) + 1 } : post
        )
      );
      setLikedPosts((prev) => [...prev, id]);
    }
    // Optionally notify backend
  };

  const handleCommentPost = (id: number, comment: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                { id: Date.now(), text: comment, author: 'USER' },
              ],
            }
          : post
      )
    );
    // Optionally send to backend
  };

  return (
    <div className="app">
      <Header />
      <CreatePost onCreate={handleCreatePost} />
      <PostList
        posts={posts}
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
        onLike={handleLikePost}
        onComment={handleCommentPost}
        likedPosts={likedPosts}
      />
    </div>
  );
};

export default App;

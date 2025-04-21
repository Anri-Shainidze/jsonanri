import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CommentCard from './components/commentCard';
import { Comment } from './types';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
      );
      setComments((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchComments();
  }, []);

  const loaderRef = useInfiniteScroll({ callback: fetchComments, isLoading });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      <div ref={loaderRef}>
        {isLoading && <p>Loading more comments...</p>}
      </div>
    </div>
  );
};

export default App;


import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useGetPostsQuery } from '../gql/operations.ts';
import type { Post } from '../gql/types.ts';

const LIMIT = 20;

export const PostList = () => {
  // ─── 1. LOCAL STATE ───────────────────────────────────────────────
  const [inputValue, setInputValue] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // ─── 2. APOLLO QUERY ──────────────────────────────────────────────
  const { data, loading, error, fetchMore } = useGetPostsQuery({
    variables: {
      offset: 0,
      limit: LIMIT,
    },
  });

  // Flatten for easier access
  const posts: Post[] = data?.posts.posts ?? [];
  const total = data?.posts.total ?? 0;

  // Has more pages if we haven't fetched all posts yet
  const hasMore = posts.length < total;

  // ─── 3. SCROLL CONTAINER REF ──────────────────────────────────────
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // ─── 4. VIRTUALIZER ───────────────────────────────────────────────
  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 100,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 5,
    gap: 12,
  });

  // ─── 5. INFINITE SCROLL TRIGGER ───────────────────────────────────
  const virtualItems = virtualizer.getVirtualItems();
  useEffect(() => {
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];

    if (lastItem.index >= posts.length - 3 && hasMore && !loading) {
      fetchMore({
        variables: {
          offset: posts.length,
          limit: LIMIT,
        },
      });
    }
  }, [virtualItems, hasMore, loading, posts.length, fetchMore]);

  // ─── 6. SCROLL TO SELECTED ────────────────────────────────────────
  useEffect(() => {
    if (!selectedPostId) return;

    const index = posts.findIndex((p) => p.id === selectedPostId);
    if (index === -1) return;

    virtualizer.scrollToIndex(index, { align: 'center', behavior: 'smooth' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPostId, posts]);

  // ─── 7. SEARCH HANDLER ────────────────────────────────────────────
  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSelectedPostId(trimmed);
  };

  // ─── 8. RENDER ────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ color: 'red', padding: '16px' }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <input
          type="text"
          placeholder="Enter post ID to jump to..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            background: '#f9f9f9',
          }}
        >
          Go
        </button>
        {selectedPostId && (
          <button
            onClick={() => { setSelectedPostId(null); setInputValue(''); }}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              background: '#f9f9f9',
              color: '#666',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Stats bar */}
      <div
        style={{
          marginBottom: '12px',
          fontSize: '14px',
          color: '#666',
        }}
      >
        Showing {posts.length} of {total} posts
        {selectedPostId && (
          <span style={{ marginLeft: '8px', color: '#f59e0b' }}>
            — highlighted: {selectedPostId}
          </span>
        )}
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        style={{
          height: '600px',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      >
        {loading && posts.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: '24px',
            }}
          >
            Loading...
          </div>
        )}

        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const post = posts[virtualItem.index];
            const isSelected = selectedPostId === post.id;

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={(el) => {
                  if (el) virtualizer.measureElement(el);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: `translateY(${virtualItem.start}px)`,
                  padding: '16px',
                  background: isSelected ? '#fffbeb' : '#ffffff',
                  border: isSelected ? '1px solid #f59e0b' : '1px solid #f0f0f0',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <strong style={{ fontSize: '14px' }}>{post.title}</strong>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    #{virtualItem.index + 1}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#555',
                    margin: '0 0 8px 0',
                    lineHeight: '1.5',
                  }}
                >
                  {post.body}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#999',
                  }}
                >
                  <span>{post.author}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span style={{ fontFamily: 'monospace', color: '#bbb' }}>{post.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loading && posts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '16px',
            color: '#666',
            fontSize: '14px',
          }}
        >
          Loading more posts...
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '16px',
            color: '#999',
            fontSize: '14px',
          }}
        >
          All {total} posts loaded
        </div>
      )}
    </div>
  );
};

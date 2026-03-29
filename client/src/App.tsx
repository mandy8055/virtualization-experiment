import { PostList } from './components/post-list.tsx';

function App() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>📋 Virtualized Post List</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        500 posts — virtualized + infinite scroll
      </p>
      <PostList />
    </div>
  );
}

export default App;

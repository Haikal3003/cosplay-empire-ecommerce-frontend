import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <main className="relative w-full h-[100vh] px-6 bg-primary flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}

export default App;

import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <h1>共通のコンポーネントです</h1>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

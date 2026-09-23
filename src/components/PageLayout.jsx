import Footer from './Footer';
import Navbar from './Navbar';

export default function PageLayout({
  children,
  className = '',
  as: Tag = 'div',
}) {
  return (
    <Tag className={className}>
      <Navbar />
      {children}
      <Footer />
    </Tag>
  );
}

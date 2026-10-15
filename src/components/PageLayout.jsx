import Footer from './Footer';
import Navbar from './Navbar';

export default function PageLayout({
  children,
  className = '',
  offsetHeader = true,
  as: Tag = 'div',
}) {
  return (
    <Tag className={`${className}${offsetHeader ? ' pt-24' : ''}`}>
      <Navbar />
      {children}
      <Footer />
    </Tag>
  );
}

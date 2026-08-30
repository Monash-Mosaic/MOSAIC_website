import Footer from './Footer';
import Navbar from './Navbar';

export default function PageLayout({
  children,
  navbarColor = 'dark',
  className = '',
  as: Tag = 'div',
}) {
  return (
    <Tag className={className}>
      <Navbar color={navbarColor} />
      {children}
      <Footer />
    </Tag>
  );
}

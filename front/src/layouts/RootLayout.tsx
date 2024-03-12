import SideBarRoot from './sidebar';

type RootLayoutProps = {
  children: React.ReactNode;
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <SideBarRoot />
      {children}
    </div>
  );
}

export default RootLayout;

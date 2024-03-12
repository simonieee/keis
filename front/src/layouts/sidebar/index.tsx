import { Fragment, useCallback, useState } from 'react';
import Sidebar from './components/Sidebar';
import SidebarHeader from './components/SidebarHeader';

const SideBarRoot = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleOpenSideBar = useCallback((state?: 'on') => {
    setOpenSideBar((prev) => (state === 'on' ? false : !prev));
  }, []);

  return (
    <Fragment>
      <SidebarHeader handleOpenSideBar={handleOpenSideBar} />
      <Sidebar openSideBar={openSideBar} handleOpenSideBar={handleOpenSideBar} />
    </Fragment>
  );
};

export default SideBarRoot;

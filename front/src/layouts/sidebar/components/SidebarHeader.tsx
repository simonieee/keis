import { MenuOpenSideBarIcon } from '@src/assets/svg';
import { DarkModeToggle } from '@src/components';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownUserImage,
  HeaderContainer,
  HeaderLeft,
  HeaderNav,
  HeaderRight,
  HeaderWrapper,
  LogoContainer,
  LogoImage,
  LogoText,
  OpenSidebarButton,
} from './sidebar.header.style';

type SidebarHeaderType = {
  handleOpenSideBar: () => void;
};

const SidebarHeader = ({ handleOpenSideBar }: SidebarHeaderType) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <HeaderNav>
      <HeaderContainer>
        <HeaderWrapper>
          <HeaderLeft>
            <OpenSidebarButton
              onClick={handleOpenSideBar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuOpenSideBarIcon />
            </OpenSidebarButton>
            <LogoContainer href="#" className="">
              <LogoImage src="/src/assets/smartm2m_logo.png" alt="이미지자리" />
              {/* <LogoText>로고</LogoText> */}
            </LogoContainer>
          </HeaderLeft>
          <HeaderRight>
            <DarkModeToggle />
            {/* <Dropdown>
              <div>
                <DropdownButton
                  type="button"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  data-dropdown-toggle="dropdown-user"
                >
                  <DropdownUserImage
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </DropdownButton>
              </div>
              <DropdownMenu ref={dropdownRef} isDropdownOpen={isDropdownOpen} id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p
                    className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </DropdownMenu>
            </Dropdown> */}
          </HeaderRight>
        </HeaderWrapper>
      </HeaderContainer>
    </HeaderNav>
  );
};

export default React.memo(SidebarHeader);

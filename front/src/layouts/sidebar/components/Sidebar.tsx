import ArrowIcon from '@src/assets/svg/ArrowIcon';
import {
  IconBrandProducthunt,
  IconCaretDown,
  IconCaretLeft,
  IconCaretLeftRight,
  IconDashboard,
  IconInbox,
  IconLayoutKanban,
  IconSignLeft,
  IconSignRight,
  IconUser,
  TablerIconsProps,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type MenuItem = {
  title: string;
  Icon: (props: TablerIconsProps) => JSX.Element; // 변경된 유형
  link: string;
  isDropdown: boolean;
  dropdownItems: Array<{ title: string; link: string }>;
};

const menuItems: MenuItem[] = [
  {
    title: '모델 테스트',
    Icon: IconDashboard, // 여기에 실제 SVG 경로 또는 컴포넌트를 넣습니다.
    link: '/',
    isDropdown: false,
    dropdownItems: [],
  },
  {
    title: '모델 및 DB 설정',
    Icon: IconLayoutKanban,
    link: '/settings',
    isDropdown: false,
    dropdownItems: [],
  },
  {
    title: '테스트 결과',
    Icon: IconBrandProducthunt,
    link: '/testresult',
    isDropdown: false,
    dropdownItems: [],
  },
  // {
  //   title: 'E-commerce',
  //   Icon: IconCaretDown,
  //   link: 'e-commerce',
  //   isDropdown: true,
  //   dropdownItems: [
  //     { title: 'Products1', link: '/e-commerce/products1' },
  //     { title: 'Billing1', link: '/e-commerce/billing1' },
  //     { title: 'Invoice1', link: '/e-commerce/invoice1' },
  //   ],
  // },
  // {
  //   title: 'E-commerce2',
  //   Icon: IconCaretLeft,
  //   link: 'e-commerce2',
  //   isDropdown: true,
  //   dropdownItems: [
  //     { title: 'Products2', link: '/e-commerce2/products2' },
  //     { title: 'Billing2', link: '/e-commerce2/billing2' },
  //     { title: 'Invoice2', link: '/e-commerce2/invoice2' },
  //   ],
  // },
  // {
  //   title: 'E-commerce3',
  //   Icon: IconCaretLeftRight,
  //   link: 'e-commerce3',
  //   isDropdown: true,
  //   dropdownItems: [
  //     { title: 'Products3', link: '/e-commerce3/products3' },
  //     { title: 'Billing3', link: '/e-commerce3/billing3' },
  //     { title: 'Invoice3', link: '/e-commerce3/invoice3' },
  //   ],
  // },
  // {
  //   title: 'Kanban',
  //   Icon: IconLayoutKanban,
  //   link: '/kanban',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
  // {
  //   title: 'Inbox',
  //   Icon: IconInbox,
  //   link: '/inbox',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
  // {
  //   title: 'Users',
  //   Icon: IconUser,
  //   link: '/users',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
  // {
  //   title: 'Products',
  //   Icon: IconBrandProducthunt,
  //   link: '/products',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
  // {
  //   title: 'Sign In',
  //   Icon: IconSignLeft,
  //   link: '/signin',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
  // {
  //   title: 'Sign Up',
  //   Icon: IconSignRight,
  //   link: '/signup',
  //   isDropdown: false,
  //   dropdownItems: [],
  // },
];

type SidebarType = {
  openSideBar: boolean;
  handleOpenSideBar: (state?: 'on') => void;
};

const Sidebar = ({ openSideBar, handleOpenSideBar }: SidebarType) => {
  const { pathname } = useLocation();

  const initialDropdownStates = () => {
    const savedStates = localStorage.getItem('openDropdowns');
    return savedStates ? JSON.parse(savedStates) : {};
  };

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>(
    initialDropdownStates
  );
  const isActive = (link: string) => pathname === link;

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleDropdownItemClick = (parentTitle?: string) => {
    setOpenDropdowns(parentTitle ? { [parentTitle]: true } : {});
  };

  const activeClass =
    '[&.active]:bg-gray-500 font-bold [&.active]:dark:bg-gray-500 [&.active]:text-white';

  useEffect(() => {
    localStorage.setItem('openDropdowns', JSON.stringify(openDropdowns));
  }, [openDropdowns]);
  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      const Icon = item.Icon;

      return (
        <li key={item.title}>
          {item.isDropdown ? (
            <button
              type="button"
              onClick={() => toggleDropdown(item.title)}
              className="group flex w-full items-center rounded-lg p-2 text-base transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon className="text-gray-900 dark:text-white" size={'1.3rem'} />
              <span
                className={`ms-3 flex-1 
              ${
                openDropdowns[item.title]
                  ? 'font-bold text-gray-900 dark:text-white'
                  : 'font-normal text-gray-900 dark:text-white'
              }
              whitespace-nowrap text-left rtl:text-right`}
              >
                {item.title}
              </span>
              <ArrowIcon openDropdowns={!openDropdowns[item.title]} />
            </button>
          ) : (
            <NavLink
              to={item.link}
              className={`group flex items-center rounded-lg p-2 
            ${
              isActive(item.link)
                ? 'text-gray-900 dark:text-white '
                : 'font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 '
            }
            ${activeClass}
            `}
              onClick={() => {
                handleOpenSideBar('on');
                handleDropdownItemClick();
              }}
            >
              <Icon size={'1.3rem'} />
              <span className="ms-3">{item.title}</span>
            </NavLink>
          )}
          <AnimatePresence>
            {openDropdowns[item.title] && (
              <motion.ul
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                style={{ overflow: 'hidden' }} // overflow 속성 추가
              >
                {item.dropdownItems.map((dropdownItem, dropdownItemIndex) => (
                  <NavLink
                    key={dropdownItem.link}
                    to={dropdownItem.link}
                    className={`group flex items-center rounded-lg p-4 ${
                      isActive(dropdownItem.link)
                        ? 'bg-gray-900 font-bold text-gray-900 dark:bg-white'
                        : 'font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    } ${activeClass}`}
                    onClick={(e) => {
                      handleOpenSideBar('on');
                      handleDropdownItemClick(item.title);
                    }}
                  >
                    <span className="ms-3">{dropdownItem.title}</span>
                  </NavLink>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      );
    });
  };
  return (
    <aside
      id="logo-sidebar"
      className={`fixed left-0 top-0 z-40 h-screen w-64 pt-16 transition-transform ${
        openSideBar ? 'translate-x-0' : '-translate-x-full'
      } border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="custom-scrollbar h-full overflow-y-auto px-3 py-4">
        <ul className="space-y-2 font-medium">{renderMenuItems()}</ul>
      </div>
    </aside>
  );
};

export default memo(Sidebar);

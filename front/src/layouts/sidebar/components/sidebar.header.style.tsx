import tw, { styled } from 'twin.macro';

export const HeaderNav = tw.nav`
    fixed
    top-0 
    z-50
    w-full
    border-b
    border-gray-200
    bg-white
    dark:border-gray-700
    dark:bg-gray-800
`;

export const HeaderContainer = tw.div`
    px-3
    py-3
    lg:px-5
    lg:pl-3
`;

export const HeaderWrapper = tw.div`
    flex
    items-center
    justify-between
`;

export const HeaderLeft = tw.div`
    flex
    items-center
    justify-start
    rtl:justify-end
`;

export const HeaderRight = tw.div`
    flex
    items-center
`;

export const OpenSidebarButton = tw.button`
    inline-flex
    items-center
    rounded-lg
    p-2
    text-sm
    text-gray-500
    hover:bg-gray-100
    focus:outline-none
    focus:ring-2
    focus:ring-gray-200
    dark:text-gray-400
    dark:hover:bg-gray-700
    dark:focus:ring-gray-600
    sm:hidden
`;

export const LogoContainer = styled.a`
  margin-inline-start: 0.5rem;
  ${tw`flex items-center`};
`;

export const LogoImage = styled.img`
  margin-inline-end: 0.75rem;
  ${tw`h-8`};
`;

export const LogoText = tw.span`
    self-center 
    whitespace-nowrap 
    text-xl 
    font-semibold 
  dark:text-white 
    sm:text-2xl 
`;

export const Dropdown = styled.div`
  margin-inline-start: 0.75rem;
  ${tw`flex items-center`}
`;

export const DropdownButton = tw.button`
    flex
    rounded-full
    bg-gray-800
    text-sm
    focus:ring-4
    focus:ring-gray-300
    dark:focus:ring-gray-600
`;

export const DropdownUserImage = tw.img`
    h-8
    w-8
    rounded-full
`;

export const DropdownMenu = styled.div`
  ${({ isDropdownOpen }: { isDropdownOpen: boolean }) => (isDropdownOpen ? tw`block` : tw`hidden`)}
  ${tw`absolute right-0 top-full mt-2 w-48 rounded-md bg-white py-1 shadow-lg dark:bg-gray-700`}
`;

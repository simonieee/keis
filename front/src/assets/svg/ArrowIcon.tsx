type ArrowIconType = {
  openDropdowns: boolean;
};

const ArrowIcon = ({ openDropdowns }: ArrowIconType) => {
  return (
    <svg
      className={`h-3 w-3 text-white transition-transform duration-300 ${
        openDropdowns ? 'rotate-180 transform' : 'rotate-0 transform'
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill=""
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
};

export default ArrowIcon;

import { ComponentProps } from "react";

const IconFilterDrop = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4.5h18m-16.5 6.75h15m-13.5 6.75h12"
      />
    </svg>
  );
};

export default IconFilterDrop;

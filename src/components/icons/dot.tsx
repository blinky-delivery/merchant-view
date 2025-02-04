import * as React from "react";

export const IconRadixIconsDotFilled = ({
    height = "1em",
    fill = "currentColor",
    focusable = "false",
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        height={height}
        width={height}
        focusable={focusable}
        {...props}
    >
        <circle
            cx="7.5"
            cy="7.5"
            r="7.5"
            fill={fill}
        />
    </svg>
);
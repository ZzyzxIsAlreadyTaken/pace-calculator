import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const base =
  "px-4 py-2 rounded-lg font-semibold border transition-colors focus:outline-none";

const variants = {
  primary: "bg-red-700 text-white border-red-700 hover:bg-orange-500",
  secondary:
    "bg-rose-900 text-yellow-300 border-rose-900 hover:bg-orange-500 hover:text-white",
  danger: "bg-red-600 text-white border-red-600 hover:bg-red-700",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  ...props
}) => (
  <button className={`${base} ${variants[variant]} ${className}`} {...props} />
);

export default Button;

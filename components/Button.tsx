import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}) => {
  const linkOnClick = props.onClick as unknown as
    | React.MouseEventHandler<HTMLAnchorElement>
    | undefined;
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-2xl transition-all duration-100 focus:outline-none focus:ring-4 focus:ring-opacity-50 active:scale-95 active:translate-y-1 text-decoration-none";

  const variants = {
    primary:
      "text-slate-900 bg-brand-yellow border-b-4 border-brand-yellowDark hover:brightness-110 active:border-b-0 focus:ring-brand-yellow",
    secondary:
      "text-primary-900 bg-primary-100 border-b-4 border-primary-300 hover:bg-primary-200 active:border-b-0 focus:ring-primary-200",
    outline:
      "text-slate-600 bg-white border-2 border-slate-200 border-b-4 hover:bg-slate-50 active:border-b-2 focus:ring-slate-200",
    ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200",
  };

  const isInternalHref = Boolean(href && href.startsWith("/"));

  if (href && isInternalHref) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={linkOnClick}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={linkOnClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98, translateY: 4, borderBottomWidth: 0 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, translateY: 4, borderBottomWidth: 0 }}
      {...(props as any)} // Cast to any to avoid minor TS framer-motion conflicts
    >
      {children}
    </motion.button>
  );
};

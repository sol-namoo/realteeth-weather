import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => {
  const classes = [
    'w-full rounded-md border border-gray-200 bg-white px-3 py-2',
    'focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <input className={classes} {...props} />;
};

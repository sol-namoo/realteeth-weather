import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, type = 'button', ...props }: Props) => {
  const classes = [
    'rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition',
    'hover:bg-blue-600 active:bg-blue-700',
    'disabled:cursor-not-allowed disabled:bg-blue-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...props} />;
};

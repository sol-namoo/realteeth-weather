import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className, ...rest }: Props) => {
  const classes = ['rounded-lg border border-gray-200 bg-white p-4 shadow-sm', className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...rest}>{children}</div>;
};

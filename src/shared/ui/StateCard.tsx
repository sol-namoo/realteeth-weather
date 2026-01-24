import type { ReactNode } from 'react';
import { Card } from './Card';

type Props = {
  children: ReactNode;
  className?: string;
};

export const StateCard = ({ children, className }: Props) => {
  const classes = ['flex items-center justify-center text-center md:min-h-96', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Card className={classes}>
      <div className="space-y-1">{children}</div>
    </Card>
  );
};

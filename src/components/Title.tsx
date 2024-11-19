import { Allerta_Stencil } from 'next/font/google';

interface Props {
  title: string;
  className?: string;
}

const allerta = Allerta_Stencil({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const Title = ({ title, className }: Props) => {
  return (
    <div className={`${allerta.className} ${className}`}>
      <h1 className={'antialiased text-4xl font-semibold my-7 capitalize'}>
        {title}
      </h1>
    </div>
  );
};

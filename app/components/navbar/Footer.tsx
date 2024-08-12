import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative w-full px-4 py-8 bg-black text-white flex flex-col lg:flex-row lg:justify-between lg:items-start box-border mt-auto">
    

      <div className="flex flex-col gap-8 lg:w-1/3">
        {/* LOGO & TEXT */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src='/images/traingle.png' alt='logo' width={50} height={50} />
            <h2 className="font-bold text-2xl">WayGrad</h2>
          </div>
          <p className="opacity-70">
            One stop solution.
          </p>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex gap-4">
          <Link href='/'>
            <Image src='/images/linkedin2.png' alt='Linkedin' width={30} height={30} />
          </Link>
          <Link href='/'>
            <Image src='/images/mail2.png' alt='gmail' width={30} height={30} />
          </Link>
          <Link href='/'>
            <Image src='/images/insta2.png' alt='instagram' width={30} height={30} />
          </Link>
        </div>
      </div>

      {/* LINK FOOTER */}
      <div className="flex flex-col gap-8 lg:flex-row lg:w-2/3">
        <FooterCard title='Company' links={['About', 'Career', 'Mobile']} />
        <FooterCard title='Contact' links={['Why WayGrad?', 'Partner with us', 'FAQ’s', 'Blog']} />
        <FooterCard title='Meet Us' links={['+1 551 312 3122', 'info@waygrad.com', '565 49th St Brooklyn, NY 11220']} />
      </div>
    </footer>
  );
};

interface FooterCardProps {
  title: string;
  links: string[];
}

const FooterCard = ({ title, links }: FooterCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">{title}</h3>
      <ul className="flex flex-col gap-2 mt-2">
        {links.map((link, index) => (
          <Link key={index} className="opacity-70" href='/'>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Footer;

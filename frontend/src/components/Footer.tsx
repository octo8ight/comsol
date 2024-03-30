import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/favicon.ico';

export const Footer: FC = () => {
    return (
        <div className="flex">
            <footer className="flex items-center justify-center border-t-2 border-[#141414] bg-black hover:text-white w-screen py-3 text-center" >
                <Image width={60} height={60} className='mx-4' src={logo.src} alt="logo" />
                <span className='logo text-2xl md:text-4xl'>Commune Market</span>
            </footer>
        </div>
    );
};

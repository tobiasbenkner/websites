import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function Logo() {
    return (
        <div>
            <Image width={48} height={48} className="object-contain" src={logo} alt="Logo" />
        </div>
    );
}
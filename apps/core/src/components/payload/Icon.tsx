import React from 'react';
import logo from '@/assets/icon.png';
import Image from 'next/image';

export default function Icon() {
    return (
        <div>
            <Image width={48} height={48} src={logo} alt="" />
        </div>
    );
}
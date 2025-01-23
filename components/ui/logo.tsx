import React from 'react'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
    className?: string,
    showText?: boolean,
    textClassName?: string
}

export const Logo: React.FC<Props> = ({ className, showText = false, textClassName }) => {
    return (
        <div className="flex items-center gap-2">
            <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={100} 
                height={100} 
                className={cn("w-10 h-10 hidden dark:block", className)} 
            />
            <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={100} 
                height={100} 
                className={cn("w-10 h-10 block dark:hidden", className)} 
            />
            {showText && (
                <h3 className={cn("text-sm uppercase whitespace-nowrap pl-3 font-bold ", textClassName)} 
                style={{ transform: "scaleX(1.4)", display: "inline-block" }}
                >
                    Synnax AI 
                </h3>
            )}
        </div>
    )
}

export default Logo
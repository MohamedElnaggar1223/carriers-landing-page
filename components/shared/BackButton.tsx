import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    backPage?: string;
    className?: string;
}

const BackButton = ({
    backPage,
    className = '',
    children,
    ...props
}: BackButtonProps) => {
    const router = useRouter();

    const handleBack = () => {
        if (backPage) {
            router.push(backPage);
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`w-9 h-9 bg-[rgba(250,55,55,1)] absolute top-16 z-10 left-16 rounded-[8px] flex items-center justify-center ${className}`}
            {...props}
        >
            <Image src="/images/back.svg" alt="Back" width={12} height={12} />
        </button>
    );
};

export default BackButton;
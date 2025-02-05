import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BankAccountSkeletonLoader = () => {
    return (
        <>
            <div className='flex items-center justify-between w-full h-20'>
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <Skeleton width={40} height={16} className="mt-5 w-32 h-full" />
            </div>
            <div className='flex items-center justify-between w-full h-20'>
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <div className="mt-4 flex items-center justify-start gap-2">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={16} height={16} />
                </div>
            </div>
            <div className='flex items-center justify-between w-full h-20'>
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />
                <div className="mt-4 flex items-center justify-start gap-2">
                    <Skeleton width={16} height={16} />
                    <Skeleton width={16} height={16} />
                </div>
            </div>
        </>
    );
};

export default BankAccountSkeletonLoader;

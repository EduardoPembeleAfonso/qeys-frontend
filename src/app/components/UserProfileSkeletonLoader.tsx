import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfileSkeletonLoader = () => {
    return (
        <>
            <div className="w-28 h-28 rounded-full">
                <Skeleton circle className="w-full h-full rounded-md" />
            </div>

            <div className="relative -top-8 -right-8 w-8 h-8 p-1 rounded-full border border-secondaryColor">
                <Skeleton circle width={16} height={16} className="w-full h-full rounded-full" />
            </div>

            <Skeleton width={90} height={16} className="mt-5 w-32 h-full" />

            <div className="mt-4 flex items-center justify-start gap-2">
                <Skeleton circle width={14} height={14} />
                <Skeleton width={120} height={16} />
            </div>
            <div className="mt-4 flex items-center justify-start gap-2">
                <Skeleton circle width={14} height={14} />
                <Skeleton width={150} height={16} />
            </div>
        </>
    );
};

export default UserProfileSkeletonLoader;

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PropertiesMapSkeletonLoader = () => {
    return (
        <div className="cursor-pointer flex flex-col items-center justify-center w-[268px] h-[320px] border border-borderColor rounded-[5px]">
            <div className="w-[230px] h-[150px] rounded-[5px]">
                <Skeleton className="w-full h-full rounded-md" />
            </div>

            <div className="flex items-center justify-between w-[230px] mt-[26px]">
                <div className="flex items-center gap-2">
                    <Skeleton circle width={16} height={16} />
                    <Skeleton width={120} height={16} />
                </div>

                <div>
                    <Skeleton width={60} height={16} />
                </div>
            </div>

            <Skeleton width={230} height={16} className="mt-[6px] w-[230px] h-[20px]" />

            <div className="w-[230px] flex flex-row items-center justify-between mt-3">
                <div className="gap-1 flex flex-row items-center">
                    <Skeleton circle width={14} height={14} />
                    <Skeleton width={50} height={16} />
                </div>

                <div className="gap-1 flex flex-row items-center">
                    <Skeleton circle width={14} height={14} />
                    <Skeleton width={50} height={16} />
                </div>

                <div className="gap-1 flex flex-row items-center">
                    <Skeleton circle width={14} height={14} />
                    <Skeleton width={50} height={16} />
                </div>
            </div>
        </div>
    );
};

export default PropertiesMapSkeletonLoader;

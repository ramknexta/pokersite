
import {LoadingSpinner} from "@/components/ui/LoadingSpinner.tsx";

interface LoadingContainerProps {
    fullScreen?: boolean;
    className?: string;
}

export function LoadingContainer({
                                     fullScreen = true,
                                     className
                                 }: LoadingContainerProps) {
    return (
        <div
            className={`
        flex items-center justify-center
        ${fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'w-full h-full min-h-[200px]'}
        ${className}
      `}
        >
            <div className="bg-white/90 p-6 rounded-xl shadow-md border border-gray-200/50">
                <LoadingSpinner size={64} />
            </div>
        </div>
    );
}

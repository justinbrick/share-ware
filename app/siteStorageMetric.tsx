import { humanFileSize } from "./util";

export interface ISiteStorageMetricProps {
    siteName: string;
    size: number;
    totalSize: number;
    className?: string;
}

export default function SiteStorageMetric(props: ISiteStorageMetricProps) {

    const percent = (props.size / props.totalSize) * 100;
    console.log(percent);
    return (
        <div className={`flex flex-row justify-between p-4 text-xl h-24 bg-slate-50 w-full items-center bg-opacity-35 ${props.className ?? ''}`} style={{
            backgroundImage: `linear-gradient(to right, rgb(3 252 44 / var(--tw-bg-opacity)) 0%, rgb(3 252 44 / var(--tw-bg-opacity)) ${percent}%, transparent ${percent}%, transparent 100%)`
        }}>
            <p>{props.siteName}</p>
            <p>{humanFileSize(props.size)}</p>
        </div>
    );

}
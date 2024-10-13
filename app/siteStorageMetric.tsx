import { humanFileSize } from './util';

export interface ISiteStorageMetricProps {
  /**
   * the name of the site
   */
  siteName: string;
  /**
   * the size of the site in bytes
   */
  size: number;
  /**
   * the total size of all sites in bytes
   */
  totalSize: number;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * a visual which shows the size of a site in relation to the total size of all sites
 * @param props site storage metric properties
 * @returns site storage metric component
 */
export default function SiteStorageMetric(props: ISiteStorageMetricProps) {
  const { size, totalSize, siteName, selected, className, onClick } = props;
  const percent = (size / totalSize) * 100;
  const color = selected ? 'bg-stone-50' : 'bg-stone-100';
  return (
    <div
      className={`flex flex-row justify-between p-4 text-xl h-24 ${color} hover:bg-stone-50 w-full items-center bg-opacity-35 hover:bg-opacity-60 border-inherit border-y-2 ${
        className ?? ''
      }`}
      style={{
        backgroundImage: `linear-gradient(to right, rgb(3 252 44 / var(--tw-bg-opacity)) 0%, rgb(3 252 44 / var(--tw-bg-opacity)) ${percent}%, transparent ${percent}%, transparent 100%)`,
      }}
      onClick={onClick}
    >
      <p className="text-sm w-1/2 text-wrap">{siteName}</p>
      <p>{humanFileSize(size)}</p>
    </div>
  );
}

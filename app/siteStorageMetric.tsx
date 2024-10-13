import { useState } from 'react';
import { humanFileSize } from './util';
import * as Graph from '@microsoft/microsoft-graph-types';
import { getAuthFetch } from './auth';

export type SiteStatistic = {
  site: Graph.Site;
  size: number;
  totalSize: number;
};

export interface ISiteStorageMetricProps {
  /**
   * the name of the site
   */
  siteName: string;
  /**
   * the size of the site in bytes
   */
  size: number;
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
  const { size, siteName, selected, className, onClick } = props;
  const [siteStatistics, setSiteStatistics] = useState<SiteStatistic[]>([]);
  const [site, setSite] = useState<Graph.Site>();
  const color = selected ? 'bg-stone-50' : 'bg-stone-100';

  const getSites = async () => {
    const authFetch = getAuthFetch();
    const response = await authFetch.fetch(
      'https://graph.microsoft.com/v1.0/sites?search=*'
    );
    const sites = (await response.json()).value as Graph.Site[];
    const siteStatistics: Pick<SiteStatistic, 'site' | 'size'>[] = [];
    let totalSize = 0;
    for (const site of sites) {
      try {
        const response = await authFetch.fetch(
          `https://graph.microsoft.com/v1.0/sites/${site.id}/drives?$select=quota`
        );
        const drives = (await response.json()).value as Pick<
          Graph.Drive,
          'quota'
        >[];
        let localSize = 0;
        for (const drive of drives) {
          totalSize += drive.quota?.used ?? 0;
          localSize += drive.quota?.used ?? 0;
        }
        siteStatistics.push({ site, size: localSize });
        setSiteStatistics(
          siteStatistics
            .sort((a, b) => b.size - a.size)
            .map((siteStatistic) => {
              return {
                site: siteStatistic.site,
                size: siteStatistic.size,
                totalSize,
              };
            })
        );
      } catch (error) {
        console.error(
          `Error while getting drives for ${site.displayName}`,
          error
        );
      }
    }
  };

  return (
    <div
      className={`flex flex-row justify-between p-4 text-xl h-24 ${color} hover:bg-stone-50 w-full items-center bg-opacity-35 hover:bg-opacity-60 border-inherit border-y-2 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      <p className="text-sm w-1/2 text-wrap">{siteName}</p>
      <p>{humanFileSize(size)}</p>
    </div>
  );
}

import * as Graph from '@microsoft/microsoft-graph-types';
import { useEffect, useState } from 'react';
import { getAuthFetch } from './auth';
import StorageBreakdown from './storageBreakdown';
import SiteStorageMetric from './siteStorageMetric';

export interface ISizeNavigatorProps {
  /**
   * the user, used to verify that the user is signed in
   */
  user?: Graph.User;
}

export type SiteStatistic = {
  site: Graph.Site;
  size: number;
  totalSize: number;
};

export default function SiteSizeNavigator(props: ISizeNavigatorProps) {
  const [siteStatistics, setSiteStatistics] = useState<SiteStatistic[]>([]);
  const [site, setSite] = useState<Graph.Site>();

  useEffect(() => {
    if (!props.user) {
      return;
    }

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

    getSites();
  }, [props.user]);

  if (!props.user) {
    return (
      <main className="flex flex-col items-center p-8">
        <h1>You are not signed in.</h1>
        <h2>
          Before you can proceed, you must sign in on the Entra account you plan
          to check SharePoint statistics on.
        </h2>
      </main>
    );
  }

  return (
    <div className="flex flex-row min-h-20 h-full w-full">
      <div className="flex flex-col items-center overflow-y-scroll w-1/3 border-gray-300 border-opacity-20 border-4 bg-transparent">
        {siteStatistics.map((siteStatistic) => (
          <SiteStorageMetric
            key={siteStatistic.site.id}
            size={siteStatistic.size}
            totalSize={siteStatistic.totalSize}
            siteName={siteStatistic.site.displayName!}
            onClick={() => {
              setSite(siteStatistic.site);
            }}
          />
        ))}
      </div>
      <StorageBreakdown site={site} />
    </div>
  );
}

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

export default function SiteSizeNavigator(props: ISizeNavigatorProps) {
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
      <StorageBreakdown
        displayName={site?.displayName ?? undefined}
        id={site?.id ?? ''}
      />
    </div>
  );
}

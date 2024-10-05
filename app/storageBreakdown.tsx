import * as Graph from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { getAuthFetch } from "./auth";
import { humanFileSize } from "./util";

export interface ISiteStorageBreakdownProps {
  /**
   * the site to get a breakdown for
   */
  site?: Graph.Site;
}

export type StorageBreakdownItem = {
  /**
   * a unique identifier for the item
   */
  id: string;
  /**
   * the name of the item
   */
  name: string;
  /**
   * the size of the item in bytes
   */
  size: number;
  /**
   * the url to the item
   */
  url?: string;
};

export default function StorageBreakdown(props: ISiteStorageBreakdownProps) {
  const { site } = props;
  const [lists, setLists] = useState<Graph.Drive[]>([]);

  useEffect(() => {
    setLists([]);
    if (!site) {
      return;
    }

    const authFetch = getAuthFetch();

    const updateLists = async () => {
      const response = await authFetch.fetch(
        `https://graph.microsoft.com/v1.0/sites/${site.id}/drives?$select=id,name,webUrl,quota`
      );
      const drives = (await response.json()).value as Graph.Drive[];

      setLists(
        drives.sort((a, b) => (a.quota?.used ?? 0) - (b.quota?.used ?? 0))
      );
    };

    updateLists();
  }, [site]);

  if (!site) {
    return <h1>Click on a site to continue.</h1>;
  }
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl p-4 text-left w-full">{site.displayName}</h1>
      <ul className="w-full bg-gray-50">
        {lists.map((drive) => (
          <li key={drive.id} className="shadow-sm hover:bg-gray-100">
            <a href={drive.webUrl!} className="block w-full p-8">
              {drive.name} - {humanFileSize(drive.quota?.used ?? 0, false, 2)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

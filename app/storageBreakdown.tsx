import * as Graph from '@microsoft/microsoft-graph-types';
import { useEffect, useState } from 'react';
import { humanFileSize } from './util';

export interface ISiteStorageBreakdownProps {
  /**
   * the name of the breakdown
   */
  displayName?: string;
  /**
   * the id of the object which storage is being broken down for
   */
  id: string;
  /**
   * the function used to get storage breakdown
   */
  getBreakdown: () => Promise<StorageBreakdownItem[]>;
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
   * the total size of all sites in bytes
   */
  totalSize?: number;
  /**
   * the url to the item
   */
  url?: string;
};

export default function StorageBreakdown(props: ISiteStorageBreakdownProps) {
  const { displayName, getBreakdown, id } = props;
  const [lists, setLists] = useState<StorageBreakdownItem[]>([]);

  useEffect(() => {
    setLists([]);
    if (!displayName) {
      return;
    }

    const updateLists = async () => {
      const breakdown = await getBreakdown();
      setLists(breakdown.sort((a, b) => a.size - b.size));
    };

    updateLists();
  }, [id]);

  if (!displayName) {
    return <h1>Click on a site to continue.</h1>;
  }
  return (
    <div className="flex flex-col items-center w-full">
      {!!displayName && <h1 className="text-2xl p-8">{displayName}</h1>}
      <ul className="w-full bg-gray-50">
        {lists.map((item) => (
          <li key={item.id} className="shadow-sm hover:bg-gray-100">
            <a href={item.url!} className="block w-full p-8">
              {item.name} - {humanFileSize(item.size, false, 2)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

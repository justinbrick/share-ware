'use client';

import * as Graph from '@microsoft/microsoft-graph-types';
import { useEffect, useState } from 'react';
import {
  getUserProfile,
  isAuthorized,
  redirectForAuthorization,
  signOutUser,
} from './auth';
import ProfileBar from './profileBar';
import SiteSizeNavigator from './siteSizeNavigator';

export default function Home() {
  const [user, setUser] = useState<Graph.User>();
  useEffect(() => {
    if (isAuthorized()) {
      getUserProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  const signOut = () => {
    signOutUser();
    setUser(undefined);
  };

  return (
    <main className="flex flex-col items-center">
      <ProfileBar
        user={user}
        signIn={redirectForAuthorization}
        signOut={signOut}
      />
      <SiteSizeNavigator user={user} />
    </main>
  );
}

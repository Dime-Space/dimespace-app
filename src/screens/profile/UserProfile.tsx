import React from 'react';
import { Button } from '@/components/ui/button';
import { ProfileImage } from '@/components/ui/profileimage';

import yuri from '../../assets/images/yuri.png';

const UserProfile = () => {
  return (
    <>
      <ProfileImage name="Yuri Alberto" src={yuri} />
      <img src="../../" alt="Yuri Alberto" />

      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
    </>
  );
};

export default UserProfile;

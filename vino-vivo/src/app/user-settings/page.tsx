import UserSettings from '@/components/user-settings/UserSettings';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import React from 'react';

const Profile = async () => {
    const session = await getServerSession(authOptions);
    console.log(session)
    return session ? (
        <div>
        <UserSettings />
    </div>
    ): (
        <div>{redirect("/")}</div>
    )       
    
};

export default Profile;

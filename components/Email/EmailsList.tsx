"use client";

import { getEmails } from '@/lib/gmail';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export const EmailsList = () => {
  const { data:session } = useSession();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (session) {
      getEmails(session.user?.email).then((data:any)=>setEmails(data));
    }
    console.log(session);
  }, [session]);

  return (
    <div>EmailsList</div>
  )
}

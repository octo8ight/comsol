import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ModuleDetail from "../../views/modules/detail";

export default function detail() {
  const router = useRouter();
  const MoonPayProvider = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
    { ssr: false },
  );

  return (
    <div>
      <MoonPayProvider apiKey='pk_test_123' debug>
        <ModuleDetail id={router.query.id as string} />
      </MoonPayProvider>
    </div>
  )
}

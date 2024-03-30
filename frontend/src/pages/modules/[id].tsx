import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ModuleDetail from "../../views/modules/detail";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const MoonPayProvider = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
    { ssr: false },
  );

  return (
    <div>
      <MoonPayProvider apiKey='pk_test_123' debug>
        <ModuleDetail id={id as string} />
      </MoonPayProvider>
    </div>
  )
}

'use client'
import { useFetch } from '@/app/hooks/useHooks';
import MainBannerCardProject from '@/components/Cards/MainBannerCardProject';
import { LoadingMainBannerCard } from '@/components/Loading';
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const {slug} = useParams();
    const URL_GET_PROJECT_BY_ID =process.env.NEXT_PUBLIC_GET_PROJECTS;
  
    const {data : dataProject, loading : loadingDataProject, error : errorDataProject} = useFetch(`${URL_GET_PROJECT_BY_ID}${slug.trim()}`);
    console.log(dataProject);
    
  return (
    <section
        className='w-full min-h-screen'
    >
      {
        loadingDataProject?
        <LoadingMainBannerCard/> :
        <MainBannerCardProject
          data={dataProject?.projects[0]}
        />
      }
    </section>
  )
}

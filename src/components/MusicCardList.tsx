'use client';

import { SearchResultsType } from '@/utils/types'
import { MusicCard } from './MusicCard'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useNavigationEvent from '@/hooks/useNavigationEvent';
import React from 'react';

type MusicCardListProps = {
  term: string,
  pageNumber: number,
  results: SearchResultsType[],
}

export const MusicCardList = ({ results, term, pageNumber }: MusicCardListProps) => {
  // const [pageNumber, setPageNumber] = useState(1);
  // const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
  const pathname = usePathname();

  const [scroll, setScroll] = React.useState<number | null>(null);

  // Handle the clicking of the link,
  // update state with current scroll amount
  const onClick = () => {
    setScroll(window.scrollY);
  };

  // Hook for running action after a navigation event
  useNavigationEvent(() => {
    // Stops and extra render if the scroll value hasn't been set,
    // doesn't run in scroll is `0` too which is a nice bonus.
    if (scroll) {
      window.scrollTo({
        top: scroll,
        left: 0,
      });
      setScroll(null);
    }
  });

  return (
    <>
      <div data-testid="music-card-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          (results).map((result, index) => <MusicCard key={index} {...result} />)
        }
      </div>
      {/* TODO: hide the button when we reach the result count */}
      <Link
        data-testid="load-more"
        scroll={false}
        onClick={onClick}
        className="mt-4 w-24 h-24 bg-red-600 text-white text-sm font-medium rounded-full flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        href={`${pathname}?term=${encodeURI(term)}&pageNumber=${(pageNumber + 1).toString()}`}
      >
        Load More
      </Link >
    </>

  )
}

import { SearchResultsType } from '@/utils/types'
import Image from 'next/image'

export const MusicCard = (props: SearchResultsType) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4 bg-white">
      <div className="relative h-64 w-full">
        <img
          alt="Track Image"
          src={props.artworkUrl100}
          className='object-cover absolute inset-0 w-full h-full'
        />
      </div>
      <div className="px-6 py-4">
        <h6 className="text-red-900 font-bold text-xl mb-2">{props.trackName}</h6>
        <p className="text-gray-700 text-base">{props.artistName}</p>
        <p className="text-rose-900 text-sm">{props.kind}</p>
      </div>
    </div>
  )
}

'use client';

import useSWR from 'swr';
import Link from "next/link";
import {Root} from "@/@types";
import {useState} from "react";

const query = `query ($page: Int) {
  Page (page: $page, perPage: 20) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (genre_in: "action", startDate_greater: 2020, sort: START_DATE) {
      id
      title {
        native
      }
      externalLinks {
        site
        url
      }
    }
  }
}`;

const fetcher = (query: any) => fetch('https://graphql.anilist.co', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
        'Content-Type': 'application/json',
    },
}).then((res) => res.json())

export default function Home() {
    const [pageIndex, setPageIndex] = useState(0);

    const {data, isLoading} = useSWR<Root>(
        () => {
            return {
                query,
                variables: {
                    page: pageIndex,
                }
            }
        },
        {
            fetcher,
        }
    )

    return (
        <>
            <div className="relative overflow-x-auto h-full rounded-xl dark:bg-gray-800">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {
                        isLoading && (
                            <div className="absolute w-full h-full">
                                <div className="flex justify-center items-center h-full">
                                    <div
                                        className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            </div>
                        )
                    }
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {!isLoading && 'Link'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && (
                        data.data.Page.media.map((anime) => (
                            <tr key={anime.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {anime.title.native}
                                </th>
                                <td className="px-6 py-4">
                                    {anime.externalLinks.map((link, index) => (
                                        <>
                                            {index > 0 && <span className="mx-2">|</span>}
                                            <Link referrerPolicy='no-referrer' target='_blank' key={link.url}
                                                  href={link.url} className="text-purple">{link.site}</Link>
                                        </>
                                    ))}
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex flex-row w-full justify-between py-4 px-2">
                <div className="flex flex-row gap-4">
                    {data && (
                        <>
                            <span>Page {data.data.Page.pageInfo.currentPage} of {data.data.Page.pageInfo.lastPage}</span>
                            <span>Total {data.data.Page.pageInfo.total}</span>
                        </>
                    )}
                </div>
                <div className="flex flex-row gap-4">
                    <button className="bg-purple-500 rounded-xl py-2 px-4 text-white"
                            onClick={() => setPageIndex(pageIndex - 1)}>Previous
                    </button>
                    <button className="bg-purple-500 rounded-xl py-2 px-4 text-white"
                            onClick={() => setPageIndex(pageIndex + 1)}>Next
                    </button>
                </div>
            </div>
        </>
    )
}

import React from 'react'
import { cardPropsType } from './web3eventTypes';
import Link from 'next/link'
import { API_URL } from "../utils/constant";
type Props = {
    card: cardPropsType
}

export const Card: React.FC<Props> = ({ card }) => {
    return (
        <div className="mx-3 mt-6 flex flex-col rounded-lg bg-zinc-900 text-surface p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-twe-ripple-init
                data-twe-ripple-color="light"
            >
                <img
                    className="rounded-t-lg h-64 w-full"
                    src={API_URL + card.imgPath}
                    alt="image"
                />
                <Link href={`/modules/${card._id}`}>
                    <div
                        className="absolute rounded-t-lg bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.55)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    </div>
                </Link>
            </div>
            <div className="p-6 text-surface dark:text-white">
                <h5 className="mb-2 text-xl font-medium leading-tight">{card.name}</h5>
                <p className="mb-4 text-base">
                    {card.price} Sol
                </p>
            </div>
        </div>
    )
}

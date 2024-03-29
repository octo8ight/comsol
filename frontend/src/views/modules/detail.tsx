import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {authState} from '../../lib/authSlice';
import { detailPropsType } from '../../components/web3eventTypes';
import { getModuleDetail, sendModuleOffer, acceptOfferStatus, rejectOfferStatus } from 'actions/module.action';
import { API_URL, OFFER_STATUS } from 'utils/constant';
// import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from 'next/dynamic';

type Props = {
  id : detailPropsType
}

export const ModuleDetail: React.FC<Props> = ({id}) => {

    
    const MoonPayBuyWidget = dynamic(
        () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayBuyWidget),
        { ssr: false },
    );

    // const { publicKey, signTransaction, signMessage, connected } = useWallet();
    const [visible, setVisible] = useState(false);
    const [detail, setDetail] = useState({
        data: {
            name: "",
            price: 0,
            rating: 0,
            review: 0,
            desc: "",
            imgPath: "",
            url: "",
            offer: [],
            _id: ""
        },
        owner: false
    })
    const {isAdmin, auth, token} = useSelector(authState);
    useEffect(() => {
        getModuleDetail(id, token, setDetail);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [offerData, setOfferData] = useState({
        price: 0,
        offer: ""
    })
    const customStyle = {
        content: {
            top: "20%",
            bottom: "41%",
            left: "20%",
            right: "20%"
        }
    }
    const data = [0,0,0,0,0,0,0,0];

    const handleAcceptOfferChange = (data) => {
        acceptOfferStatus({
            offerId: data,
            id: detail.data._id
        }, token, setDetail);
    }

    const handleRejectOfferChange = (data) => {
        rejectOfferStatus({
            offerId: data,
            id: detail.data._id
        }, token, setDetail);
    }

    const handleCreateOffer = () => {
        if (auth) {
            setIsOpen(true);
        }
        else {
            alert("connect wallet!!!");
        }
    }

    const handleBuyNow = async (e) => {
        e.preventDefault();
        if (auth) {
             setVisible(true);
        }
        else {
            // const message = Buffer.from("Welcome to Commune module marketplace!");
            // const signature = await signMessage(message);
            // console.log(signature);
            alert("connect wallet!!!");
        }
    }

    const handleSendOffer = (e) => {
        e.preventDefault();
        if (offerData.offer === "") {
            alert("Offer is required.");
            return;
        }
        sendModuleOffer({
            id: id,
            offer: offerData.offer,
            price: offerData.price,
            token: token
        })
        setIsOpen(false);
    }
    console.log(visible);

    return (
        <div>
            <div className="pt-6">
                <Modal
                    id="mymodal"
                    style={customStyle}
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    ariaHideApp={false}
                >
                    <div className='text-white text-2xl font-black border-neutral-700 border-b-4 pl-2'>Create Offer</div>
                    <form className='mt-5'>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Price</label>
                            <input
                                className="bg-gray-100 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                id="number-input"
                                aria-describedby="helper-text-explanation"
                                min={0}
                                placeholder="100 Sol"
                                value={offerData.price}
                                onChange={e => setOfferData({...offerData, price: Number(e.target.value)})}
                                required
                            />
                        </div>
                        <div className="mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Offer</label>
                            <textarea
                                className="block p-2.5 w-full text-sm text-gray-100 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="message"
                                rows={4}
                                value={offerData.offer}
                                onChange={e => setOfferData({...offerData, offer: e.target.value})}
                                placeholder="Write your thoughts here...">
                            </textarea>
                        </div>
                        <div className='mt-5 text-right'>
                            <button className='bg-blue-700 px-4 py-2 rounded-md mr-5' onClick={handleSendOffer}>Send Offer</button>
                            <button className='bg-blue-700 px-4 py-2 rounded-md' onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <MoonPayBuyWidget
                    variant="overlay"
                    baseCurrencyCode="usd"
                    baseCurrencyAmount="100"
                    defaultCurrencyCode="eth"
                    visible={visible}
                    // onCloseOverlay={() => setVisible(false)}
                    />
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link href="/modules" className="mr-2 text-sm font-medium text-white">Modules</Link>
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-white-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href="#" aria-current="page" className="font-medium text-white hover:text-white-600">{detail.data.name}</a>
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto mt-6 max-w-2xl sm:px-6">
                    <img src={API_URL+detail.data.imgPath} alt="module 1" className="h-full w-full object-cover object-center rounded-3xl" />
                </div>

                <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:py-20">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-white-900 sm:text-3xl">{detail.data.name}</h1>
                    </div>
                    <div className="mt-4 lg:row-span-3 lg:mt-0 text-white">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-white-900">{detail.data.price} Sol</p>

                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <svg className="text-white-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                    <svg className="text-white-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                    <svg className="text-white-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                    <svg className="text-white-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                    <svg className="text-white-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="sr-only">4 out of 5 stars</p>
                                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{detail.data.review} reviews</a>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-around">
                            {detail.owner === false && <button className="mt-10 flex w-1/3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={(e) => handleBuyNow(e)}>Buy Now</button>}
                            {detail.owner === false && <button className="mt-10 flex w-1/3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => handleCreateOffer()}>Create Offer</button>}
                        </div>
                    </div>
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6" dangerouslySetInnerHTML={{__html: detail.data.desc}}>
                        {/* {detail.data.desc} */}
                    </div>
                </div>
                {isAdmin && detail.owner && <div className='px-4 max-w-2xl pb-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-20 block'>
                    <div className='text-2xl font-bold tracking-tight text-white-900 sm:text-3xl'>Offers</div>
                    <table className="max-w-2xl mt-5 lg:grid lg:max-w-7xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-lg">
                            <tr className='flex'>
                                <th scope="col" className="px-6 py-3 w-36 box-content">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 w-96 truncate box-content">
                                    Offer
                                </th>
                                <th scope="col" className="px-6 py-3 w-16 box-content">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 w-24 box-content">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className='max-w-2xl lg:max-w-7xl'>
                            {
                                detail.data.offer.map((item, index) => (
                                    item.user !== undefined && <tr key={"tr_"+index} className="flex bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white w-36 truncate box-content">
                                            {item.user.address}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-96 truncate box-content">
                                            {item.offer}
                                        </td>
                                        <td className="px-6 py-4 w-16 box-content">
                                            {item.price} Sol
                                        </td>
                                        <td className="px-6 py-4 text-right box-content w-24">
                                            {item.status === OFFER_STATUS.Waiting && <div className='flex'>
                                                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer" onClick={() => handleAcceptOfferChange(item._id)}>Accept</div>
                                                &nbsp;/&nbsp;
                                                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer" onClick={() => handleRejectOfferChange(item._id)}>Reject</div>
                                            </div>}
                                            {
                                                item.status === OFFER_STATUS.Accepted && <div>Accepted</div>
                                            }
                                            {
                                                item.status === OFFER_STATUS.Rejected && <div>Rejected</div>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default ModuleDetail;
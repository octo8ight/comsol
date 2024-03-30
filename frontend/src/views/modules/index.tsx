import { Fragment, useState, FC, useRef, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineDown } from "react-icons/ai";
import { Card } from 'components/Card';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {authState} from '../../lib/authSlice';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { addModuleRequest, getModuleList } from 'actions/module.action';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import img1 from '../../assets/intro/1(1).jpg';
import img2 from '../../assets/intro/1 (1).png';
import img3 from '../../assets/intro/1 (1).webp';
import img4 from '../../assets/intro/1 (2).jpg';
import img5 from '../../assets/intro/1 (2).png';
import img6 from '../../assets/intro/1 (2).webp';
import img7 from '../../assets/intro/1 (3).jpg';
import img8 from '../../assets/intro/1 (3).webp';
import img9 from '../../assets/intro/1 (4).jpg';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: false },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  }
]

const cardData = [
  {name: "KOENIG", desc: "this is KOENIG module", imgPath: img1.src, id: "1"},
  {name: "SAP Modules", desc: "this is Sap module", imgPath: img2.src, id: "2"},
  {name: "ICAI", desc: "this is ICAI module", imgPath: img3.src, id: "3"},
  {name: "PYTHON MODULE", desc: "this is python module", imgPath: img4.src, id: "4"},
  {name: "KOENIG", desc: "this is KOENIG module", imgPath: img1.src, id: "5"},
  {name: "SAP Modules", desc: "this is Sap module", imgPath: img2.src, id: "6"},
  {name: "ICAI", desc: "this is ICAI module", imgPath: img3.src, id: "7"},
  {name: "PYTHON MODULE", desc: "this is python module", imgPath: img4.src, id: "8"},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const customStyle = {
  content: {
    top: "13%",
    bottom: "12%",
    left: "20%",
    right: "20%"
  }
}

export const ModulesView: FC = ({ }) => {
  // const [isAdmin, setIsAdmin] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<string>('');
  const [list, setList] = useState([]);

  const {isAdmin, token} = useSelector(authState);

  useEffect(() => {
    getModuleList(setList);
  }, []);

  const [data, setData] = useState({
    name: "",
    url: "",
    desc: "",
    price: 0,
    file: null
  })

  const handleFileUpload = (e) => {
    setData({
      ...data,
      file: e.files[0]
    })
  }

  const handleAddModule = (e) => {
    e.preventDefault();
    if (data.name === "") {
      toast.current.show({severity:'warn', summary: 'Warning', detail:'Module Name is required', life: 3000});
    }
    else if (data.url === "") {
      toast.current.show({severity:'warn', summary: 'Warning', detail:'Module Url is required', life: 3000});
    }
    else if (data.desc === "") {
      toast.current.show({severity:'warn', summary: 'Warning', detail:'Module Description is required', life: 3000});
    }
    else if (data.file === null) {
      toast.current.show({severity:'warn', summary: 'Warning', detail:'Module Image is required', life: 3000});
    }
    else {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('data', JSON.stringify({name: data.name, url: data.url, price: data.price, desc: data.desc}));
      formData.append('token', token);
      addModuleRequest(formData, setList);
      setIsOpen(false);
    }
  }
  
  const toast = useRef(null);

  return (
    <div className="w-full">
      <div>
        {/* Mobile filter dialog */}
        <Modal
          id="mymodal"
          style={customStyle}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Add Module!"
          ariaHideApp={false}
        >
          <Toast className="z-50" ref={toast} />
          <div className='text-white text-2xl font-black border-neutral-700 border-b-4 pl-2'>Add Module</div>
          <form>
            <div className='grid gap-6 md:grid-cols-2 mt-6'>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Module Name *</label>
                <input
                  className="bg-gray-100 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="first_name"
                  placeholder="Module Name"
                  value={data.name}
                  onChange={e => setData({...data, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Module Url *</label>
                <input
                  className="bg-gray-100 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="first_name"
                  placeholder="https://modulename.com"
                  value={data.url}
                  onChange={e => setData({...data, url: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Price *</label>
                <input
                  className="bg-gray-100 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  min={0}
                  value={data.price}
                  onChange={e => setData({...data, price: Number(e.target.value)})}
                  placeholder="100 Sol"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Module Image *</label>

                <FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} onSelect={e => handleFileUpload(e)} />
              </div>
            </div>
            <div className="mt-5">
              <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-dark">Description *</label>
              <Editor value={data.desc} onTextChange={(e: EditorTextChangeEvent) => setData({...data, desc: e.htmlValue})} style={{ height: '320px' }} />
              {/* <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-100 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea> */}
            </div>
            <div className='mt-5 text-right'>
              <button className='bg-blue-700 px-4 py-2 rounded-md mr-5' onClick={handleAddModule}>Add</button>
              <button className='bg-blue-700 px-4 py-2 rounded-md' onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
        <main className="mx-20 px-4 sm:px-6 lg:px-8">
          {isAdmin && <div className="flex items-baseline justify-between pt-24 pb-6">
            <div></div>
            <button className='bg-blue-700 px-4 py-2 rounded-md' onClick={() => setIsOpen(true)}>Add Module</button>
          </div>}
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-white-900">Modules</h1>

            <div className="flex items-center">
              <div
                className="relative flex mx-5 hidden sm:flex"
                data-twe-input-wrapper-init
                data-twe-input-group-ref>
                <input
                  type="search"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-white data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-white-300 dark:autofill:shadow-autofill dark:peer-focus:text-white [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-100"
                  placeholder="Search"
                  aria-label="Search"
                  id="exampleFormControlInput"
                  aria-describedby="basic-addon1" />
                {/* <label
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-white peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-white-400 dark:peer-focus:text-white"
                  >Search
                </label> */}
                <button
                  className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-blue-700 px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  type="button"
                  id="button-addon1"
                  data-twe-ripple-init
                  data-twe-ripple-color="light">
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      // xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </span>
                </button>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group flex items-center justify-center text-sm font-medium text-white-700 hover:text-white-900">
                    Sort&nbsp;
                    {/* <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white-400 group-hover:text-white-500"
                      aria-hidden="true"
                    /> */}
                    <AiOutlineDown />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-100' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-white-400 hover:text-white-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                {/* <FunnelIcon className="h-5 w-5" aria-hidden="true" /> */}
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {
                list.map((item, index) => <Card card={item} key={"card_"+index} />)
              }
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

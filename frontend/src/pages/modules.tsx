import type { NextPage } from "next";
import Head from "next/head";
import { ModulesView } from "../views";
import {useSelector} from 'react-redux';
// import {wrapper, State} from '../lib/store';

const Basics: NextPage = (props) => {
  return (
    <div className="w-full">
      <Head>
        <title>Commune Market</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <ModulesView />
    </div>
  );
};

export default Basics;
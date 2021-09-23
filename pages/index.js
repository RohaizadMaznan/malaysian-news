import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { AiFillGithub, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easing },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Home = ({ detail }) => {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Head>
        <title>Malaysian News - Rohaizad Maznan</title>
      </Head>
      <motion.div variants={stagger}>
        <motion.div variants={fadeInUp} className="page-container">
          <div className={styles.main}>
            <div className="w-28 rounded-full mb-3 shadow-lg">
              <Image
                src={detail.image}
                width="1"
                height="1"
                layout="responsive"
                alt="profile"
              />
            </div>

            <p className="text-lg">Rohaizad Maznan</p>
            <p className="text-sm mb-4">Web designer, UI/UX, Web developer</p>

            <div className="block md:flex md:justify-center space-x-4 cursor-pointer text-xs items-center text-white">
              <Link href="https://github.com/RohaizadMaznan">
                <div className="flex items-center px-7 py-3 bg-gray-900 rounded-md space-x-2 hover:shadow-xl">
                  <AiFillGithub />
                  <div>GitHub</div>
                </div>
              </Link>

              <Link href="https://www.twitter.com/rohaizadmaznan">
                <div className="flex items-center px-7 py-3 bg-blue-700 rounded-md space-x-2 hover:shadow-xl">
                  <AiOutlineTwitter />
                  <div>Twitter</div>
                </div>
              </Link>
              <Link href="https://www.youtube.com/channel/UCDO3IovkAAmxlQF6srdp3vg">
                <div className="flex items-center px-7 py-3 bg-red-700 rounded-md space-x-2 hover:shadow-xl">
                  <AiFillYoutube />
                  <div>Youtube</div>
                </div>
              </Link>
            </div>

            <p className="text-4xl font-bold mt-5 mb-2">
              Next.js Malaysian News App
            </p>

            <p>Your one stop shop for the latest news articles</p>

            <div className="flex justify-center">
              <Link href="/feed/1">
                <motion.div
                  variants={fadeInUp}
                  className="px-10 py-4 bg-blue-600 text-white rounded cursor-pointer mt-5 hover:shadow-xl"
                >
                  Get news
                </motion.div>
              </Link>

              <motion.div
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                variants={fadeInUp}
                className="px-10 py-4 rounded cursor-pointer mt-5"
              >
                Light mode
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/RohaizadMaznan/malaysian-news/employeeOfTheMonth"
  );

  const detail = await apiResponse.json();

  return {
    props: {
      detail: detail,
    },
  };
};

export default Home;

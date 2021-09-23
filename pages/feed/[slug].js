import styles from "../../styles/Feed.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toolbar } from "../../components/toolbar";
import { motion } from "framer-motion";

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

function Feed({ articles, pageNumber }) {
  const router = useRouter();
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>Malaysian News - Rohaizad Maznan</title>
        <meta property="og:image" content={articles[0]?.urlToImage} />
        <meta property="og:description" content={articles[0]?.description} />
        <meta property="og:title" content={articles[0]?.title + " and more!"} />
      </Head>
      <div className="page-container container mx-auto">
        <Toolbar />
        <motion.div variant={stagger} className={styles.main}>
          <motion.div variant={fadeInUp} className="flex-col md:grid md:grid-cols-4 gap-4 cursor-pointer">
            {articles.map((article, index) => (
              <Link href={article.url} passHref>
                <a target="_blank" rel="noreferrer">
                  <div
                    key={index}
                    className="px-2 py-4 bg-gray-100 dark:bg-gray-900 rounded-md group hover:shadow-md"
                  >
                    {article.urlToImage ? (
                      <motion.img
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        trasition={{ delay: 0.2 }}
                        src={article.urlToImage}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    ) : (
                      <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        trasition={{ delay: 0.2 }}
                        className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-md"
                      ></motion.div>
                    )}
                    <motion.div variant={stagger} className="px-5 py-6 flex-col justify-start space-y-4 ">
                      <motion.div variant={fadeInUp}>
                        <p className="text-2xl font-bold">{article.title}</p>
                      </motion.div>
                      <motion.div variant={fadeInUp}>
                        <p className="text-md group-hover:text-[#4120fd] dark:group-hover:text-[#8e7bff]">
                          {article.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </a>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        <div className={styles.paginator}>
          <div
            className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber > 1) {
                // As of the current version of Next.js the default behavior for router.push
                // will leave the scroll where it is, so we have to manually call scrollTo.
                // This however is being worked on and is fixed in canary.
                // Show this in tutorial vid:
                // https://github.com/vercel/next.js/issues/3249
                router
                  .push(`/feed/${pageNumber - 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Previous Page
          </div>

          <div>#{pageNumber}</div>

          <div
            className={pageNumber === 5 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 5) {
                // As of the current version of Next.js the default behavior for router.push
                // will leave the scroll where it is, so we have to manually call scrollTo.
                // This however is being worked on and is fixed in canary.
                // Show this in tutorial vid:
                // https://github.com/vercel/next.js/issues/3249
                router
                  .push(`/feed/${pageNumber + 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Next Page
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const pageNumber = context.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 9) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=my&&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}&pageSize=12&page=${pageNumber}`
  ).then((res) => res.json());

  const { articles } = apiResponse;

  if (!articles) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
}

export default Feed;

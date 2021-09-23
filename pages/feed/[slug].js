import styles from "../../styles/Feed.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toolbar } from "../../components/toolbar";

function Feed({ articles, pageNumber }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta property="og:image" content={articles[0]?.urlToImage} />
        <meta property="og:description" content={articles[0]?.description} />
        <meta property="og:title" content={articles[0]?.title + " and more!"} />
      </Head>
      <div className="page-container container mx-auto">
        <Toolbar />
        <div className={styles.main}>
          <div className="grid grid-cols-4 gap-4 cursor-pointer">
            {articles.map((article, index) => (
              <Link href={article.url} passHref>
                <a target="_blank" rel="noreferrer">
                  <div
                    key={index}
                    className="px-2 py-4 bg-gray-100 rounded-md group hover:shadow-md"
                  >
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-md"></div>
                    )}
                    <div className="px-5 py-6 flex-col justify-start space-y-4 ">
                      <div>
                        <p className="text-2xl font-bold">{article.title}</p>
                      </div>
                      <div>
                        <p className="text-md text-gray-500 group-hover:text-[#4120fd]">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>

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
    </>
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

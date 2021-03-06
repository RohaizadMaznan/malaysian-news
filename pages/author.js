import Head from "next/head";
import styles from "../styles/EOM.module.css";
import { Toolbar } from "../components/toolbar";
import Image from 'next/image'

export const EOM = ({ employee }) => {
  return (
    <>
      <Head>
        <title>Author</title>
        <meta
          name="description"
          content={`This month's employee of the month is ${employee.name}`}
        />

        <meta property="og:image" content={employee.image} />
        <meta property="og:title" content="Employee Of The Month" />
        <meta
          property="og:description"
          content={`This month's employee of the month is ${employee.name}`}
        />

        <meta property="twitter:image" content={employee.image} />
        <meta property="twitter:title" content="Employee Of The Month" />
        <meta
          property="twitter:description"
          content={`This month's employee of the month is ${employee.name}`}
        />
      </Head>

      <div className="page-container">
        <Toolbar />

        <div className={styles.main}>
          <h1>Employee Of The Month</h1>

          <div className={styles.employeeOfTheMonth}>
            <h3>{employee.name}</h3>
            <h6>{employee.position}</h6>
            <img src={employee.image} alt="Picture of the author" />
            <p>{employee.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/RohaizadMaznan/malaysian-news/employeeOfTheMonth"
  );

  const employee = await apiResponse.json();

  return {
    props: {
      employee: employee,
    },
  };
};

export default EOM;

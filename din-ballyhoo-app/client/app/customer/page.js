import Head from "next/head";
import styles from "@/app/customer/CustomerService.module.css";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

export default function CustomerService() {
  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <Head>
          <title>Customer Service - Din Ballyhoo</title>
          <meta
            name="description"
            content="Customer service page for Your Din Ballyhoo"
          />
        </Head>

        <header className={styles.header}>
          <h1>Customer Service</h1>
        </header>

        <section className={styles.contact}>
          <h2>Contact Us</h2>
          <p className={styles.contactInfo}>
            If you have any questions or feedback, please feel free to reach out
            via email at joshendemann@gmail.com. I appreciate your feedback and
            will get back to you as soon as possible. Thank you for your
            support!
          </p>

          <p className={styles.contactInfo}>
            Please note that this website is a project created to showcase web
            development skills and is part of an ongoing learning process in
            coding. It is not intended for commercial purposes at this time.
          </p>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}

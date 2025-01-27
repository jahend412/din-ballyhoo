"use client";

import Header from "@/components/Header";
import "./AboutPage.css";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

export default function AboutPage() {
  return (
    <AuthenticatedLayout>
      <div className="about-container">
        <Header />

        <div className="content">
          <h1 className="title">Biography</h1>
          <p className="text">
            Din Ballyhoo was formed in 2015 as a group inspired to create music.
            Influenced by a variety of genres, the band has been making music
            for the joy of it. Din Ballyhoo is made up of four members: Ben and
            Monica Storey, Gary Swallow, and Josh Endemann. With Josh and Monica
            on vocals and guitar, Ben on Bass, and Gary on drums, the band has
            been able to create a unique sound that they call their own. The
            group have held a great friendship for many years. Ben and Monica
            are married, Monica and Josh are cousins, and Gary, Ben and Monica
            all went to school together.
          </p>
          <p className="text">
            When they started off in 2015, it was their first time experimenting
            with writing songs and performing with each other. They are ready to
            share their music with the world for anyone who is willing to
            listen. Stay tuned for more music, shows, and webcasts from Din
            Ballyhoo, here on their website.
          </p>

          <h2 className="members-title">Members</h2>
          <ul className="members-list">
            <li>Ben Storey - Bass</li>
            <li>Monica Storey - Guitar, Vocals</li>
            <li>Josh Endemann - Guitar, Vocals</li>
            <li>Gary Swallow - Drums, Vocals</li>
          </ul>

          <div className="member">
            <h3 className="member-name">Ben Storey</h3>
            <p className="member-bio">
              Ben Storey is the bassist for Din Ballyhoo. He has been playing
              bass for the past 10 years and has played in Din Ballyhoo since he
              started. He is married to Monica Storey, the guitarist and
              vocalist for Din Ballyhoo. He enjoys playing video games, hanging
              out with his family, and watching movies.
            </p>
          </div>

          <div className="member">
            <h3 className="member-name">Monica Storey</h3>
            <p className="member-bio">
              Monica Storey is the guitarist and vocalist for Din Ballyhoo. She
              has been playing guitar for 15 years and has been singing for 20
              years. She is married to Ben Storey, the bassist for Din Ballyhoo.
              Monica is a teacher and photographer by day and a musician by
              night. She enjoys painting, drawing, activities with her family,
              and working with her students.
            </p>
          </div>

          <div className="member">
            <h3 className="member-name">Josh Endemann</h3>
            <p className="member-bio">
              Josh Endemann is the guitarist and vocalist for Din Ballyhoo. He
              has been playing guitar for 20 years and has been singing for 15
              years. He is cousins with Monica Storey, the guitarist and
              vocalist for Din Ballyhoo. Josh works in construction by day and
              is working towards becoming a web developer. He enjoys coding,
              hanging out with his family, and playing music. He is also the web
              developer for Din Ballyhoo. He also plays with another group up in
              madison that is being called Mad Sun for now, no puns intended.
            </p>
          </div>

          <div className="member">
            <h3 className="member-name">Gary Swallow</h3>
            <p className="member-bio">
              Gary Swallow is the drummer and vocalist for Din Ballyhoo. He has
              been playing drums for 10 years and has been singing for 5 years.
              He is friends with Ben and Monica Storey, and Josh Endemann. Gary
              is a construction worker by day and a musician by night. He enjoys
              playing video games, reading, and watching movies, and visiting
              with his friends.
            </p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

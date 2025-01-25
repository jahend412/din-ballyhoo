import ReactPlayer from "react-player";
import Image from "next/image";
import CommentSection from "@/components/commentSection/CommentSection";
import Header from "@/components/Header";
import styles from "@/app/EntityPageCSS/EntityPage.module.css";
API_URL = process.env.BACKEND_URL;

export default function EntityPage({
  entity,
  entityType,
  activeSection,
  setActiveSection,
  handleTrackClick,
  activeTrack,
  playing,
  handlePlay,
  updateComments,
}) {
  return (
    <div>
      <Header />
      <div className={styles.entityCover}>
        <Image
          src={`${API_URL}/${entity.coverImage}`}
          alt={entity.title}
          width={600}
          height={600}
          priority
        />
      </div>
      <div className={styles.entityInfo}>
        <h1>{entity.title}</h1>
        <p>{entity.description}</p>
        <p>{new Date(entity.releaseDate).toLocaleDateString("en-us")}</p>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeSection === "tracks" ? styles.active : ""}
          onClick={() => setActiveSection("tracks")}
        >
          Tracks
        </button>
        <button
          className={activeSection === "details" ? styles.active : ""}
          onClick={() => setActiveSection("details")}
        >
          Details
        </button>
        <button
          className={activeSection === "comments" ? styles.active : ""}
          onClick={() => setActiveSection("comments")}
        >
          Reviews {entity.comments ? entity.comments.length : 0}
        </button>
      </div>
      {activeSection === "tracks" && (
        <div className={styles.trackList}>
          {entity.tracks.map((track, index) => (
            <div
              key={track.id || index}
              className={`${styles.trackItem} ${
                activeTrack?.url === track.url ? styles.active : ""
              }`}
              onClick={() => handleTrackClick(track)}
            >
              <p>
                {index + 1}. {track.title}
              </p>
            </div>
          ))}
        </div>
      )}
      {activeSection === "details" && (
        <div className={styles.entityDetails}>
          <p>{entity.details}</p>
          <h3>Setlist</h3>
          <p>{entity.setlist}</p>
        </div>
      )}
      {activeSection === "comments" && (
        <CommentSection
          entityType={entityType}
          entityId={entity._id}
          updateComments={updateComments}
        />
      )}
      <div className={styles.trackPlayer}>
        {activeTrack && (
          <ReactPlayer
            url={activeTrack.url}
            controls
            playing={playing}
            width="100%"
            height="50px"
            onStart={handlePlay}
          />
        )}
      </div>
    </div>
  );
}

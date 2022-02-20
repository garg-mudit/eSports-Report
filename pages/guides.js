import { useContext, useEffect, useState } from "react";
import AuthContext from "../stores/authContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          throw Error("You must be logged in to view this content");
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides &&
        guides.map((guide) => (
          <div key={guide.slug} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>{guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit
              amet tellus sem. Ut ut sem et velit egestas rhoncus et ac velit.
              Quisque in cursus turpis. Praesent eu pretium enim. Duis elit
              odio, suscipit eget feugiat quis, viverra vitae arcu. Suspendisse
              tincidunt urna volutpat metus ultricies egestas. Morbi vehicula
              justo id quam pellentesque sollicitudin. Pellentesque rutrum, urna
              sit amet lobortis tincidunt, libero ipsum lobortis elit, a blandit
              arcu massa sit amet ex. Aliquam at convallis orci. Maecenas ut
              tortor posuere, venenatis tortor sit amet, dapibus augue. Ut dui
              ante, ultricies vitae enim tempor, ullamcorper tempus ligula.
            </p>
          </div>
        ))}
    </div>
  );
}

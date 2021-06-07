import "./styles.css";
import { useState, useEffect } from "react";
import Card from "./Card";

const API_KEY = "1af58bd92412b9939736c995674468fa";

const API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&auth_token=72157719413908045-ea8470b9d4c86131&api_sig=7d89598159c2710eefbcb32788852c78`;

const SEARCH_API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}`;

const PHOTO_BASE_URL = `https://live.staticflickr.com`;

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [recentPhotos, setRecentPhotos] = useState([]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApiResponse = (response) => {
    const photos = response.photos || [];
    let photosArr = photos.photo;
    photosArr = photosArr.map(({ id, server, secret, title }) => ({
      title,
      url: `${PHOTO_BASE_URL}/${server}/${id}_${secret}_w.jpg`
    }));
    setRecentPhotos(photosArr);
  };

  // PAGE MOUNT
  useEffect(function () {
    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        handleApiResponse(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(
    function () {
      if (searchText) {
        console.log(searchText);
        const url = `${SEARCH_API_URL}&text=${searchText}&format=json&nojsoncallback=1`;
        fetch(url)
          .then((response) => response.json())
          .then((jsonResponse) => {
            handleApiResponse(jsonResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [searchText]
  );

  const photosContent = recentPhotos.map(({ title, url, id }) => (
    <Card id={id} title={title} url={url} />
  ));

  return (
    <div className="App">
      <header>
        <h1>Flickr Photo App</h1>

        <input
          type="text"
          name="search"
          value={searchText}
          placeholder="Type something to search photos"
          style={{ width: "400px", padding: "10px" }}
          onChange={handleChange}
        />
      </header>
      <hr />
      <div className="photos-container">{photosContent}</div>
    </div>
  );
}

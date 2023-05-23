import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";

import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";
import { TVShowDetail } from "./component/TVShowDetail/TVShowDetail";
import { Logo } from "./component/Logo/Logo";
import logoImg from "./assests/images/logo.png"
//import { TVShowListItem } from "./component/TVShowListItem/TVShowListItem";
import { TVShowList } from "./component/TVShowList/TVShowList";
import { SearchBar } from "./component/SearchBar/SearchBar";

 //TVShowAPI.fetchPopulars();
 

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const[recommendationList,setRecommendationList]=useState([]);

 async function fetchPopulars() {
  try{
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0]);
    }
  }catch(Error){
alert("Something is wrong while fetching the popular tv ")
  }
  }

  async function fetchRecommendations(tvShowId) {
    try{
    const recommendationListResponse= await TVShowAPI.fetchRecommendations(tvShowId);
    if (recommendationListResponse.length > 0) {
      setRecommendationList(recommendationListResponse.slice(0,10));
    }
  }catch(Error){
    alert("Something is wrong while fetching the rcommendation ")
  }
  }
  async function fetchByTitle(title) {
    try{
    const searchResponse= await TVShowAPI.fetchByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }catch(Error){
    alert("Something is wrong while fetching the title ")
  }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
if(currentTVShow){
  fetchRecommendations(currentTVShow.id);
}
  }, [currentTVShow]);


  function updateCurrentTVShow(tvShow){
    setCurrentTVShow(tvShow)
  }

  console.log(recommendationList)

  console.log(currentTVShow);

  return (
    <div
      className={s.main_container}
      style={{
        background:currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "blue",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo img={logoImg} title={"Watowatch"} subtitle={"Find a movie you may like"} />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle}/>
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>{currentTVShow && <TVShowDetail tvshow={currentTVShow}/>}</div>
      <div className={s.recommended_shows}>
      {currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList}/>
      }
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {

const { id} = useParams()
const [author, setAuthor] = useState(null)
const [loading, setLoading] = useState(true)
const [isFollowing, setIsFollowing] = useState(false)
const [followers, setFollowers] = useState(0)

const API_URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?authorId=${id}`;


useEffect(() => {
  const fetchAuthor = async () => {
    try{
      const { data } = await axios.get(
        API_URL
      )
      setAuthor(data)
      setFollowers(parseInt(data.followers))
    }catch (err){
      console.error("Error fetching author:", err)
    }finally{
      setLoading(false)
    }
  }

  fetchAuthor()
}, [id])

const handleFollow = () => {
  if(!isFollowing){
    setFollowers((prev)=> prev + 1)
    setIsFollowing(true)
  }
}


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: author?.banner 
            ? `url(${author.banner}) top`
            : `url(${AuthorBanner})`
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage } alt={author?.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName}
                          <span className="profile_username">@{author?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.wallet}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button onClick={handleFollow} disabled={isFollowing} className="btn-main" style={{ opacity: isFollowing ? 0.7 : 1}}>
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author?.nftCollection} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

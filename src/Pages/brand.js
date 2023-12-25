import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GaugeChart from "react-gauge-chart";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import Data from "../Data/brands.json";
import InfluencerData from "../Data/influencers.json";
import { Button, Modal } from "react-bootstrap";

function Brand() {
  const { id } = useParams();
  const [singleBrandData, setSingleBrandData] = useState(Data[id - 1]);
  const [influencerList, setInfluencerList] = useState([]);
  const [platform, setPlatform] = useState("instagram");

  const [addAnalysisModalShow, setAddAnalysisModalShow] = useState(false);

  useEffect(() => {
    const filteredInfluencers = InfluencerData.filter((influencers) =>
      influencers.category
        .toLowerCase()
        .includes(singleBrandData?.sector.toLowerCase())
    );
    const filteredInfluencersByPlatform = filteredInfluencers.filter(
      (influencers) =>
        influencers.platform.toLowerCase().includes(platform.toLowerCase())
    );

    setInfluencerList(filteredInfluencersByPlatform);
  }, [platform]);

  console.log("data", influencerList);

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = today.getTime() - date.getTime();

    // Convert the time difference to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
  };

  const shortenNumber = (number) => {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (number >= billion) {
      return (number / billion).toFixed(1) + "B";
    } else if (number >= million) {
      return (number / million).toFixed(1) + "M";
    } else if (number >= thousand) {
      return (number / thousand).toFixed(1) + "K";
    }

    return number;
  };

  return (
    <>
      <div className="m-5 d-flex flex-column gap-4 brand-page-wrapper">
        <div className=" kof-card">
          <div className="row">
            <div className="col-md-5">
              <div className="row">
                <div className="col-2">
                  <img src={singleBrandData.brand_logo} className="w-100"></img>
                </div>
                <div className="col-10">
                  <h1 className="mb-1">{singleBrandData.brand_name}</h1>
                  <p>{singleBrandData.sector}</p>
                  <p>{singleBrandData.seasons}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3 d-flex justify-content-center align-items-end gap-3">
              <Link
                to={singleBrandData.social_media_links.linkedin}
                target="_blank"
              >
                <BsLinkedin
                  className="cursor-pointer fs-4"
                  style={{ color: "#0A66C2" }}
                />
              </Link>
              <Link
                to={singleBrandData.social_media_links.twitter}
                target="_blank"
              >
                <BsTwitter
                  className="cursor-pointer fs-4"
                  style={{ color: "#00acee" }}
                />
              </Link>
              <Link
                to={singleBrandData.social_media_links.instagram}
                target="_blank"
                style={{ color: "#E4405F" }}
              >
                <BsInstagram className="cursor-pointer fs-4" />
              </Link>
              <Link
                to={singleBrandData.social_media_links.youtube}
                target="_blank"
                style={{ color: "#CD201F" }}
              >
                <BsYoutube className="cursor-pointer fs-4" />
              </Link>
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-end align-items-center ms-auto ">
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={20}
                percent={singleBrandData.social_presense / 100}
                hideText={true}
                colors={["#FF0000", "#00FF00"]}
                textColor={"#000000"}
              />
              <p>Social Presence</p>
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-end align-items-center ms-auto ">
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={20}
                percent={singleBrandData.sentiment_analysis.postivity / 100}
                hideText={true}
                colors={["#FF0000", "#00FF00"]}
              />
              <p>Market Sentiments</p>
            </div>
          </div>
        </div>

        <div className="kof-card">
          <div className="row">
            <div className="col-md-6">
              <p className="text-bold fs-5">Past Pitch Analysis</p>
            </div>
            <div className="col-md-6 ">
              <button
                type="button"
                className="btn btn-primary btn-sm float-end"
                onClick={() => setAddAnalysisModalShow(true)}
              >
                Add new
              </button>
            </div>
          </div>

          <div className="row ">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                  <th scope="col">Result</th>
                  <th scope="col">Reason</th>
                </tr>
              </thead>
              <tbody>
                {console.log({ singleBrandData })}
                {singleBrandData?.past_analysis?.map((past, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{past.date}</td>
                      <td>
                        <span
                          className={`badge rounded-pill bg-${
                            past.result == 1
                              ? `success`
                              : past.result == -1
                              ? `danger`
                              : `warning`
                          }`}
                        >
                          {past.result == 1
                            ? "Success"
                            : past.result == -1
                            ? "Failure"
                            : "On Going"}
                        </span>
                      </td>
                      <td>{past.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="kof-card">
          <div className="row">
            <p className="text-bold fs-5">
              Competitor Analysis{" "}
              <span className="fs-6 fw-light">(Campaign summary)</span>
            </p>
          </div>
          <div className="row ">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Brand</th>
                  <th scope="col">No. of Creators</th>
                  <th scope="col">Posts</th>
                  <th scope="col">Engagment</th>
                  <th scope="col">Likes</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Video Views</th>
                  <th scope="col">Nano %</th>
                  <th scope="col">Micro %</th>
                  <th scope="col">Macro %</th>
                  <th scope="col">Mega %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">{singleBrandData?.brand_name}</td>
                  <td className="fw-bold">
                    {shortenNumber(singleBrandData?.total_creators)}
                  </td>
                  <td className="fw-bold">
                    {shortenNumber(singleBrandData?.total_posts)}
                  </td>
                  <td className="fw-bold">
                    {shortenNumber(singleBrandData?.total_engagement)}
                  </td>
                  <td className="fw-bold">
                    {shortenNumber(singleBrandData?.total_likes)}
                  </td>
                  <td className="fw-bold">
                    {shortenNumber(singleBrandData?.total_comments)}
                  </td>
                  <td className="fw-bold">
                    {`${shortenNumber(singleBrandData?.total_views)}`}
                  </td>
                  <td className="fw-bold">
                    {`${shortenNumber(singleBrandData?.nano_post)}%`}
                  </td>
                  <td className="fw-bold">
                    {`${shortenNumber(singleBrandData?.micro_post)}%`}
                  </td>
                  <td className="fw-bold">
                    {`${shortenNumber(singleBrandData?.macro_post)}%`}
                  </td>
                  <td className="fw-bold">
                    {`${shortenNumber(singleBrandData?.mega_post)}%`}
                  </td>
                </tr>
                {singleBrandData?.competitors?.map((competitor, index) => {
                  return (
                    <tr>
                      <td>{Data[competitor - 1]?.brand_name}</td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_creators)}
                      </td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_posts)}
                      </td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_engagement)}
                      </td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_likes)}
                      </td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_comments)}
                      </td>
                      <td>
                        {shortenNumber(Data[competitor - 1]?.total_views)}
                      </td>
                      <td>
                        {`${shortenNumber(Data[competitor - 1]?.nano_post)}%`}
                      </td>
                      <td>
                        {`${shortenNumber(Data[competitor - 1]?.micro_post)}%`}
                      </td>
                      <td>
                        {`${shortenNumber(Data[competitor - 1]?.macro_post)}%`}
                      </td>
                      <td>
                        {`${shortenNumber(Data[competitor - 1]?.mega_post)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="kof-card">
          <div className="row">
            <p className="text-bold fs-5">
              Competitor Analysis{" "}
              <span className="fs-6 fw-light">(Top Hashtag Performance)</span>
            </p>
          </div>
          <div className="row ">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Brand</th>
                  <th scope="col">Top Hashtags</th>
                  <th scope="col">No. of Posts</th>
                  <th scope="col">Likes</th>
                  <th scope="col">No. of Creators</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">{singleBrandData?.brand_name}</td>

                  <td className="fw-bold">
                    <ul className="list-unstyled">
                      {singleBrandData?.top_hashtags?.map((hashtags, index) => {
                        return <li>{hashtags}</li>;
                      })}
                    </ul>
                  </td>
                  <td className="fw-bold">
                    <ul className="list-unstyled">
                      {singleBrandData?.no_of_posts?.map((post, index) => {
                        return <li>{post}</li>;
                      })}
                    </ul>
                  </td>
                  <td className="fw-bold">
                    <ul className="list-unstyled">
                      {singleBrandData?.likes?.map((like, index) => {
                        return <li>{like}</li>;
                      })}
                    </ul>
                  </td>
                  <td className="fw-bold">
                    <ul className="list-unstyled">
                      {singleBrandData?.no_of_creators?.map(
                        (creator, index) => {
                          return <li>{creator}</li>;
                        }
                      )}
                    </ul>
                  </td>
                </tr>
                {singleBrandData?.competitors?.map((competitor, index) => {
                  return (
                    <tr>
                      <td>{Data[competitor - 1]?.brand_name}</td>
                      <td className="">
                        <ul className="list-unstyled">
                          {Data[competitor - 1]?.top_hashtags?.map(
                            (hashtags, index) => {
                              return <li>{hashtags}</li>;
                            }
                          )}
                        </ul>
                      </td>
                      <td className="">
                        <ul className="list-unstyled">
                          {Data[competitor - 1]?.no_of_posts?.map(
                            (post, index) => {
                              return <li>{post}</li>;
                            }
                          )}
                        </ul>
                      </td>
                      <td className="">
                        <ul className="list-unstyled">
                          {Data[competitor - 1]?.likes?.map((like, index) => {
                            return <li>{like}</li>;
                          })}
                        </ul>
                      </td>
                      <td className="">
                        <ul className="list-unstyled">
                          {Data[competitor - 1]?.no_of_creators?.map(
                            (creators, index) => {
                              return <li>{creators}</li>;
                            }
                          )}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="kof-card">
          <div className="row">
            <div className="col-md-6">
              <p className="text-bold fs-5">
                Influencers For {singleBrandData?.brand_name}
                <span className="fs-6 fw-light">
                  {" "}
                  ({singleBrandData.sector})
                </span>
              </p>
            </div>
            <div className="col-md-6 ">
              <div
                className="btn-group btn-group-sm float-end"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  checked={platform == "instagram"}
                  onClick={() => setPlatform("instagram")}
                />
                <label className="btn btn-outline-primary" for="btnradio1">
                  instagram
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio3"
                  autocomplete="off"
                  checked={platform == "youtube"}
                  onClick={() => setPlatform("youtube")}
                />
                <label className="btn btn-outline-primary" for="btnradio3">
                  youtube
                </label>
              </div>
            </div>
          </div>

          <div className="my-4">
            {platform == "instagram" ? (
              <div className="row ">
                {singleBrandData?.brand_related_influencers_count?.instagram?.map(
                  (counts, index) => {
                    return (
                      <div className="col d-flex flex-column text-center influencer-count">
                        <p className="fw-bold">{counts.name}</p>
                        <p className="mb-0">{shortenNumber(counts.count)}</p>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="row">
                {singleBrandData?.brand_related_influencers_count?.youtube?.map(
                  (counts, index) => {
                    return (
                      <div className="col d-flex flex-column text-center influencer-count">
                        <p className="fw-bold">{counts.name}</p>
                        <p className="mb-0">{shortenNumber(counts.count)}</p>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>

          <div className="row ">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Followers</th>
                  <th scope="col">Avg. CPV</th>
                  <th scope="col">Engagment</th>
                  <th scope="col">Reach</th>
                  <th scope="col">Video</th>
                </tr>
              </thead>
              <tbody>
                {influencerList?.slice(0, 10).map((Influencers, index) => {
                  return (
                    <tr>
                      <th className="pt-4">{index + 1}</th>
                      <td>
                        <img
                          src={
                            Influencers.profile_picture
                              ? Influencers.profile_picture
                              : "https://as2.ftcdn.net/v2/jpg/03/46/93/61/1000_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
                          }
                          className="profile-pic"
                        ></img>
                      </td>
                      <td className="pt-4">{Influencers.username}</td>
                      <td className="pt-4">{Influencers.category}</td>
                      <td className="pt-4">
                        {shortenNumber(Influencers.follower_count)}
                      </td>
                      <td className="pt-4">
                        {shortenNumber(Influencers.avg_cpv)}
                      </td>
                      <td className="pt-4">
                        {shortenNumber(Influencers.exp_eng)}
                      </td>
                      <td className="pt-4">
                        {shortenNumber(Influencers.exp_reach)}
                      </td>
                      <td className="pt-4">
                        {shortenNumber(Influencers.exp_video)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="kof-card">
          <div className="row">
            <div className="col-md-12">
              <p className="text-bold fs-5">
                {singleBrandData?.brand_name} in News
              </p>
              {singleBrandData?.news?.length > 0 ? (
                <>
                  {singleBrandData?.news?.map((latest_news, index) => {
                    return (
                      <div className="row mb-4">
                        <div className="col-md-1">
                          <img
                            src={
                              latest_news.urlToImage
                                ? latest_news.urlToImage
                                : "https://www.ltmuseum.co.uk/sites/default/files/styles/twitter_card_image/public/2020-06/ltm-placeholder_8_21_1_3_1_0_2_11.png?h=bf654dbc&itok=sWS61MbC"
                            }
                            className="w-100"
                          ></img>
                        </div>
                        <div className="col-md-9 d-flex flex-column">
                          <p className="text-bold mb-0">{latest_news.title}</p>
                          <p className="news-description">
                            {latest_news.description}
                          </p>
                        </div>
                        <div className="col-md-1 d-flex align-items-center">
                          <p className="news-description text-end mb-0">
                            {getDaysAgo(latest_news?.publishedAt)} days ago
                          </p>
                        </div>
                        <div className="col-md-1 d-flex text-end align-items-center">
                          <Link
                            to={latest_news.url}
                            target="_blank"
                            className=" text-decoration-none news-description"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                "No Recent News Availale"
              )}
            </div>
          </div>
        </div>

        <div className="kof-card">
          <div>
            <p className="text-bold fs-5">Contact Persons</p>
          </div>
          <div className="row">
            {singleBrandData?.contact_person
              ?.slice(0, 2)
              .map((person, index) => {
                return (
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={
                            person.profile_picture
                              ? person.profile_picture
                              : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                          }
                          className="contact-person-img"
                        ></img>
                      </div>
                      <div className="col-8 d-flex flex-column justify-content-center">
                        <p className="fs-5 mb-0 fw-bold">{person.name}</p>
                        <p className="mb-0">{person.designation}</p>
                        <p className="mb-1">
                          {person.yrs} yrs of experience with{" "}
                          {singleBrandData.brand_name}
                        </p>
                        <Link to={person.social_media_handles} target="__blank">
                          <BsLinkedin
                            className="cursor-pointer mb-2 fs-5"
                            style={{ color: "#0A66C2" }}
                          />
                        </Link>
                        <div className="d-flex align-items-baseline">
                          <div className="connection">
                            <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
                          </div>
                          <div className="connection connection1">
                            <img
                              title="Rohit Kumar"
                              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                            ></img>
                          </div>
                          <p className="ms-3 mt-2 mutual-connection">
                            2 mutual connection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <AddAnalysis
        show={addAnalysisModalShow}
        onHide={() => setAddAnalysisModalShow(false)}
      />
    </>
  );
}

export default Brand;

function AddAnalysis(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Add Past Pitch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-5">
          <input
            type="Date"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Date"
          ></input>
          <input
            type="text"
            class="form-control my-4"
            id="exampleFormControlInput1"
            placeholder="Result"
          ></input>
          <input
            type="email"
            class="form-control my-4"
            id="exampleFormControlInput1"
            placeholder="Enter Reason"
          ></input>
        </div>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

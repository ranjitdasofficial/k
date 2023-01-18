import axios from "axios";
import React, { useEffect, useState } from "react";
import DriveHeader from "../../Components/layouts/DriveHeader";
import FileItem from "../../Components/layouts/fileItem";
import Video from "../../Components/layouts/video";
import VideoPlayer from "../../Components/layouts/VideoPlayer";
import style from "../../Components/styles/filemanager.module.scss";
import getDrive from "../../lib/getdrive";
import { getQuery } from "../../lib/getquery";

import {motion} from "framer-motion"

const Filemanager = () => {
  const [path, setPath] = useState(["0AB3auOFRmDb9Uk9PVA"]);
  const [id, setId] = useState();

  const { data, refetch, error, isLoading, isFetching } = getQuery(
    path[path.length - 1]
  );
  const handleOnclick = (id) => {
    setPath(path.concat(id));
    // if(id!==null){
    refetch();
    // }
  };
  const handleOnback = () => {
    if (path.length - 1 === 0) {
      return;
    }
    path.pop();
    refetch();
  };

  const handleOnHome = () => {
    if (path.length - 1 === 0) {
      return;
    }
    while (path.length - 1 !== 0) {
      path.pop();
    }
    refetch();
  };

  console.log(isFetching, isLoading);

  //   if(isLoading){
  //     return <h1>Loading....</h1>
  //   }
  const handleOnJump = (index) => {
    while (path.length - 1 !== index) {
      path.pop();
    }
    refetch();
  };

  const playVideo = (id) => {
    setId(id);
  };

  

  return (
    <div className={style.files}>
      <DriveHeader back={handleOnback} length={path.length} />

      {isLoading && <div  className={style.loading}><span> <div className={`spinner-border ${style.loader}`} role="status"></div></span>Loading please wait...If loading continue for 30 sec please refresh the page..</div>}
      {/* <div className={style.path}>
        <span>Path : home/video/drive</span>
      </div> */}

      <div className={style.filesWrapper}>
        
        {data ?
          data.data.map((val, ind) => {
            
            return val.mimeType === "video/x-matroska" || val.mimeType==="video/mp4" ? (
              // <a key={ind} onClick={() => playVideo(val.id)}>
                // {" "}
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}>
                <FileItem val={val} />
                
                </motion.div>
                
              // </a>
            ) : (

              val.mimeType==="application/vnd.google-apps.folder" ?

              <a key={ind} onClick={() => handleOnclick(val.id)}>
                {" "}
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}><FileItem val={val} /></motion.div>
                
              </a>:<motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}><FileItem val={val} /></motion.div>
            );
          }):<h1>No data</h1>}

      </div>

          {data && data.data.length<1 && <span className={style.loading}>No data</span>}

      {/* {id && <div className={style.player}></div>}
      {id && <VideoPlayer id={id} cancel={() => setId("")} />} */}
    </div>
  );
};

export default Filemanager;

import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../util/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [ghettoTrigger, setGhettoTrigger] = useState(true);

  useEffect(() => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => console.log(err))
  }, [ghettoTrigger])

  const ghettoRerender = () => {
    setGhettoTrigger(!ghettoTrigger)
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={ghettoRerender} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

import React, { useState } from "react";
import AlertMessage from "../functions/alert";
import ReactLoading from "react-loading";

export default function StartButton(id) {
  const [btn, setBtn] = useState();

  // useEffect(() => {}, []);

  if (btn === "pressed") {
    return <ReactLoading color={"orange"} className="pressedBtn" />;
  }
  return (
    <button
      onClick={() => {
        start(id);
        setBtn("pressed");
      }}
      className="sliding-button"
    >
      <span>Start</span>
    </button>
  );
}

async function start(id) {
  try {
    const token = sessionStorage.getItem("token");
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/start/${id.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    if (res.statusCode === 406) {
      AlertMessage(res.message, "error");
    } else {
      AlertMessage(res.message, "success");
    }
  } catch (error) {
    console.log(error);
  }
}

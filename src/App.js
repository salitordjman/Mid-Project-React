import "./App.css";
import { useRef } from "react";
import color1 from "./img/color1.jpg";
import color2 from "./img/color2.jpg";
import black1 from "./img/black1.jpg";
import black2 from "./img/black2.jpg";

function App() {
  const imgRef1 = useRef();
  const imgRef2 = useRef();

  return (
    <div className="all">
      <div className="img1">
        <img
          src={black1}
          alt="building"
          ref={imgRef1}
          onMouseOver={() => {
            imgRef1.current.src = color1;
          }}
          onMouseOut={() => {
            imgRef1.current.src = black1;
          }}
        />
      </div>
      <div className="img2">
        <img
          src={black2}
          alt="building1"
          ref={imgRef2}
          onMouseOver={() => {
            imgRef2.current.src = color2;
          }}
          onMouseOut={() => {
            imgRef2.current.src = black2;
          }}
        />
      </div>
    </div>
  );
}

export default App;

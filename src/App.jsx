import "./App.css";
import React from "react";
// import Resizer from "react-image-file-resizer";

function App() {
  let image_js_to_flask;
  let blobb;
  function import_image(event) {
    blobb = event.target.files[0];
    image_js_to_flask = URL.createObjectURL(blobb);

    document.getElementById("blob_image").src = image_js_to_flask;
  }

  function callData() {
    // axios
    //   .request({
    //     url: apiUrl,
    //     responseType: "blob",
    //   })
    //   .then((response) => {
    //     console.log("invoice response:", response);
    //     const data = URL.createObjectURL(response.data);
    //     document.getElementById("blob_image").src = data;
    //   })
    //   .catch((error) => {
    //     console.log("invoice error:", error);
    //   });
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    var formData = new FormData();
    formData.append("image", blobb, "image.jpg");
    fetch("https://stop-sign-server.onrender.com/sendImg", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        document.getElementById("return_image").src = "loading.gif";
        wait(4000).then(() => {
          document.getElementById("return_image").src =
            URL.createObjectURL(blob);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="image--wrapper">
        <img id="stop_sign_mirror"></img>
      </div>

      <h1>Am I ... a stop sign?</h1>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => import_image(e)}
      />
      <button type="submit" onClick={() => callData()}>
        Upload
      </button>
      <p>When uploading, server takes a minute to start up. Free Tier xD</p>
      <img id="blob_image"></img>
      <img id="return_image"></img>
    </>
  );
}

export default App;

import "../styles/Overlay.css"

const Overlay = () => {
  return (
    <>
      <div class="overlay show"></div>
      <div class="spanner show">
        <div class="loader"></div>
        <p>Checking out. Please wait</p>
      </div>
    </>
  )
};

export default Overlay;

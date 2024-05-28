import "./style.scss";

type TitleHeadingProps = {
   image: string;
   title: string;
}

function TitleHeading({image, title}: TitleHeadingProps) {
  return (
    <div className="title__heading"id="home">
      <img src={image} alt={title} />
      <h1>{title}</h1>
    </div>
  )
}
export default TitleHeading
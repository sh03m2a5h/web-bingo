import "./snowflake.scss";

const flakes = new Array(50).fill(0);

const Snowflake = () => {
  return (
    <>
      {flakes.map((_, i) => (
        <div key={i} className="snowflake"></div>
      ))}
    </>
  );
};

export default Snowflake;

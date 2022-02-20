const Hello = (props) => {
  return (
    <div>
      <p>Hellow {props.name} world</p>
    </div>
  );
};

const App = () => {
  const name = "Sai";
  const age = 19;

  return (
    <>
      <Hello name="SaiK" />
      <Hello name={name} />
    </>
  );
};

export default App;
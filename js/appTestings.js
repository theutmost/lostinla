//1 -----------------------
const nameHere = "Laura";

const Hello = props => <h1 className="tc pink">Hello there {nameHere}</h1>;

//2 -----------------------
const Banner = props => (
  <h1 className="tc f1 yellow pa3">
    Hello {props.firstName} {props.surName}
  </h1>
);

//3 -----------------------
const App = () => (
  <div>
    <Title title="Welcome to my site" />
    <Banner firstName="Kyle" surName="James" />
    <Hello />
  </div>
);

//4 -----------------------
const Title = props => <h1 className="tc">{props.title}</h1>;

//RENDER -----------------------
// ReactDOM.render(<Hello name={nameHere} />, document.getElementById('root'));

// ReactDOM.render(
//   <Banner firstName="Ned" surName="Jones" />,
//   document.getElementById("root")
// );

ReactDOM.render(<App />, document.getElementById("root"));

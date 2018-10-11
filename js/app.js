// CLASS Components ------------------------------------
class Title extends React.Component {
  componentDidMount() {
    console.log("component just mounted on the page");
  }
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

// COMPONENTS ------------------------------------

const Highlight = ({ color, children }) => (
  <span className={`relative highlight highlight-${color}`}>
    <span className="relative z-2">{children}</span>
  </span>
);

const Intro = () => (
  <div className="m-auto-ns f4 f3-m f2-l tc w-80-l normal">
    <div className="mb3 mb4-ns">
      <Highlight color="aqua">Lost in Los Angeles</Highlight> is a directory of
      fun places  to see, play in and{" "}
      <Highlight color="blue">explore</Highlight>, in Los Angeles, California.
    </div>
    <div>
      From <Highlight color="yellow">museums</Highlight> to movies, tacos to
      tourist-traps, LA is the gift that keeps on giving. Hella rad!
    </div>
  </div>
);

// the ({className, href, children}) grabs our properties directly,
// it means we don't have to type out props.className, props.href etc.
const NavItem = ({ className, href, children, logo }) => (
  <li className={`mh2-ns f6 f4-l tc ${className}`}>
    <a className="white no-underline" href={href}>
      {logo ? (
        <img src="images/lostinla.jpg" className="cb center logo" />
      ) : (
        children
      )}
    </a>
  </li>
);

const ImageItem = ({ className, link, children, image }) => (
  <a className="white no-underline" href={link}>
    {image ? <img src={`images/${image}`} className="db" /> : children}
  </a>
);

const Nav = () => (
  <nav className="pt3 pt4-ns mb4 mb0-ns">
    <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
      {menu.map(item => <NavItem {...item} />)}
    </ul>
  </nav>
);

const Overlay = ({ title, description, showInfo }) => (
  <div
    className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
    style={{
      //Doing test to see whether our showInfo state is true....
      transform: showInfo ? "none" : "translateY(-100%)"
    }}
  >
    <div>
      <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">
        {title}
      </h1>
      <p className="lh-title lh-copy-ns mv0 black f6 measure-l">
        {description}
      </p>
    </div>
  </div>
);

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    // STATE........
    this.state = {
      fullName: "Write something",
      showInfo: false,
      redirect: false
    };
    // BIND (or setState won't work)........
    (this.updateName = this.updateName.bind(this)),
      (this.toggleInfo = this.toggleInfo.bind(this)),
      (this.closeInfo = this.closeInfo.bind(this));
    this.redirectCheck = this.redirectCheck.bind(this);
  }

  updateName(event) {
    console.log(event.target.value);
    this.setState({
      fullName: event.target.value || "Enter your name"
    });
  }

  // This is our own Method we made up
  toggleInfo() {
    this.setState((prevState, props) => {
      // console.log(prevState.showInfo);
      return { showInfo: !prevState.showInfo };
    });
    console.log("you toggled");
  }

  closeInfo() {
    // Here we use the usual way bc we don't need access to the PREV STATE.
    // We are just force setting it to be false.
    this.setState({
      showInfo: false
    });
  }

  redirectCheck(link) {
    console.log(link);
    // window.location.replace(link.link);
    window.location = link.link;
  }

  render() {
    const { title, description, image, className, link } = this.props;
    const { showInfo } = this.state;
    return (
      <div
        className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${className}`}
        onClick={() => this.redirectCheck({ link })}
        onMouseEnter={this.toggleInfo}
        onMouseLeave={this.closeInfo}
      >
        <div className="relative">
          {/*here we remember to pass down all of our props and state*/}
          <Overlay {...this.props} {...this.state} />
          <ImageItem {...this.props} {...this.state} />
        </div>
      </div>
    );
  }
}

const App = () => (
  <div>
    <div className="min-vh-100 ph4 flex flex-column">
      {/* our navigation component */}
      <Nav />
      <Title />

      {/* our intro text component */}
      <Intro />
    </div>
    <div className="flex flex-wrap container">
      {/* our attractions list component */}
      {attractions.map(thing => <Attraction {...thing} />)}
    </div>
  </div>
);

//4 -----------------------

ReactDOM.render(<App />, document.getElementById("root"));

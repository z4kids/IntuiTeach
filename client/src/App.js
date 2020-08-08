import React from 'react';
import Side from './Side.svg';
import logo from './logo.svg'
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import { ZoomMtg } from "@zoomus/websdk";
import testTool from './tool.js'
//Zoom Client Code
console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.10/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const API_KEY = "8n3-jn4PRn2Y_J7So_n39g";

/**
 * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
 * The below generateSignature should be done server side as not to expose your api secret in public
 * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
 */
const API_SECRET = "dw1bq7tW4f8KgZdCxwG9yo8xBc11clQ20xQT";

testTool = window.testTool;
document.getElementById("display_name").value =
  "Local" +
  ZoomMtg.getJSSDKVersion()[0] +
  testTool.detectOS() +
  "#" +
  testTool.getBrowserInfo();
document.getElementById("meeting_number").value = testTool.getCookie(
  "meeting_number"
);
document.getElementById("meeting_pwd").value = testTool.getCookie(
  "meeting_pwd"
);
if (testTool.getCookie("meeting_lang"))
  document.getElementById("meeting_lang").value = testTool.getCookie(
    "meeting_lang"
  );

document.getElementById("meeting_lang").addEventListener("change", (e) => {
  testTool.setCookie(
    "meeting_lang",
    document.getElementById("meeting_lang").value
  );
  $.i18n.reload(document.getElementById("meeting_lang").value);
  ZoomMtg.reRender({ lang: document.getElementById("meeting_lang").value });
});

// copy zoom invite link to mn, autofill mn and pwd.
document
  .getElementById("meeting_number")
  .addEventListener("input", function (e) {
    let tmpMn = e.target.value.replace(/([^0-9])+/i, "");
    if (tmpMn.match(/([0-9]{9,11})/)) {
      tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
    }
    let tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
    if (tmpPwd) {
      document.getElementById("meeting_pwd").value = tmpPwd[1];
      testTool.setCookie("meeting_pwd", tmpPwd[1]);
    }
    document.getElementById("meeting_number").value = tmpMn;
    testTool.setCookie(
      "meeting_number",
      document.getElementById("meeting_number").value
    );
  });

document.getElementById("clear_all").addEventListener("click", (e) => {
  testTool.deleteAllCookies();
  document.getElementById("display_name").value = "";
  document.getElementById("meeting_number").value = "";
  document.getElementById("meeting_pwd").value = "";
  document.getElementById("meeting_lang").value = "en-US";
  document.getElementById("meeting_role").value = 0;
  window.location.href = "/index.html";
});

document.getElementById("join_meeting").addEventListener("click", (e) => {
  e.preventDefault();

  const meetingConfig = testTool.getMeetingConfig();
  if (!meetingConfig.mn || !meetingConfig.name) {
    alert("Meeting number or username is empty");
    return false;
  }
  testTool.setCookie("meeting_number", meetingConfig.mn);
  testTool.setCookie("meeting_pwd", meetingConfig.pwd);

  const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: meetingConfig.role,
    success: function (res) {
      console.log(res.result);
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = API_KEY;
      const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
      console.log(joinUrl);
      window.open(joinUrl, "_blank");
    },
  });
});

// click copy jon link button
window.copyJoinLink = function (element) {
  const meetingConfig = testTool.getMeetingConfig();
  if (!meetingConfig.mn || !meetingConfig.name) {
    alert("Meeting number or username is empty");
    return false;
  }
  const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: meetingConfig.role,
    success: function (res) {
      console.log(res.result);
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = API_KEY;
      const joinUrl =
        testTool.getCurrentDomain() +
        "/meeting.html?" +
        testTool.serialize(meetingConfig);
      $(element).attr("link", joinUrl);
      const $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).attr("link")).select();
      document.execCommand("copy");
      $temp.remove();
    },
  });
};

// click join iframe buttong
document.getElementById("join_iframe").addEventListener("click", function (e) {
  e.preventDefault();
  const meetingConfig = testTool.getMeetingConfig();
  if (!meetingConfig.mn || !meetingConfig.name) {
    alert("Meeting number or username is empty");
    return false;
  }
  const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: meetingConfig.role,
    success: function (res) {
      console.log(res.result);
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = API_KEY;
      const joinUrl =
        testTool.getCurrentDomain() +
        "/meeting.html?" +
        testTool.serialize(meetingConfig);
      testTool.createZoomNode("websdk-iframe", joinUrl);
    },
  });
});

//Frontend app
function App() {
  
  return (
    <div className="App">
      <Navigation />
      <Main />
      <img src={Side} className='side' />
      <h1 className="header">z4kids</h1>
      <header className="App-header">
      </header>
    </div>

  );


}


const Students = () => (
  <div className="students">
    <img src={Side} className='side' />
  
  </div>
);

const Home = () => (
  <div className="home"></div>
);

const About = () => (
  <div className="about"></div>
)

const Educators = () => (
  <div className="educators"></div>
)
const Navigation = () => (
  <Navbar className = "nav" bg="light" variant="light">
    <Navbar.Brand as = {NavLink} to="/"> <img src={logo} className="logo" /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} className = "navlink" id = "home" to='/'>Home</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/about'>About</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/students'>Students</Nav.Link>
      <Nav.Link as={NavLink} className="navlink" to='/educators'>Educators</Nav.Link>
    </Nav>
  </Navbar>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/students' component={Students}></Route>
    <Route exact path='/educators' component={Educators}></Route>
  </Switch>
);


export default App;

import { useMemo, useState } from "react";

const student = {
  name: "Saurav",
  id: "202537255",
  major: "Computer Engineering",
  university: "Gachon University",
};

function StudentCard({ name, id, major, university }) {
  return (
    <article className="student-card">
      <div className="avatar">{name.charAt(0)}</div>
      <div>
        <p className="eyebrow">STUDENT PROFILE</p>
        <h3>{name}</h3>
        <p className="muted">{major} · {university}</p>
        <span className="id-pill">ID {id}</span>
      </div>
    </article>
  );
}

const questions = [
  {
    q: "What is React mainly used for?",
    options: ["Building user interfaces", "Managing databases", "Writing CSS only"],
    answer: 0,
    explain: "React is a JavaScript library for building user interfaces."
  },
  {
    q: "Which is a valid React function component?",
    options: ["component App() {}", "function App() { return <h1>Hello</h1>; }", "new App = React()"],
    answer: 1,
    explain: "A function component is a JavaScript function that returns JSX."
  },
  {
    q: "How do you read a prop named title inside a component?",
    options: ["state.title", "this.title", "props.title"],
    answer: 2,
    explain: "Props are received by a component and accessed through the props object."
  }
];

function Foundations() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  function choose(questionIndex, optionIndex) {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
    setChecked(false);
  }

  return (
    <section className="panel" id="foundations">
      <div className="section-heading">
        <div><p className="eyebrow">01 / KNOWLEDGE CHECK</p><h2>React foundations</h2></div>
        <span className="count">3 QUESTIONS</span>
      </div>
      <p className="muted">Check your understanding of React, components, and props.</p>
      <div className="quiz-list">
        {questions.map((item, i) => (
          <div className="question" key={item.q}>
            <h3><span className="number">{String(i + 1).padStart(2, "0")}</span>{item.q}</h3>
            <div className="options">
              {item.options.map((option, j) => (
                <button
                  key={option}
                  className={`option ${answers[i] === j ? "selected" : ""} ${checked && j === item.answer ? "correct" : ""} ${checked && answers[i] === j && j !== item.answer ? "wrong" : ""}`}
                  onClick={() => choose(i, j)}
                >{option}</button>
              ))}
            </div>
            {checked && <p className="feedback">{answers[i] === item.answer ? "✓ Correct. " : "Not quite. "}{item.explain}</p>}
          </div>
        ))}
      </div>
      <div className="quiz-footer">
        <button className="button primary" onClick={() => setChecked(true)} disabled={Object.keys(answers).length !== 3}>Check answers</button>
        <button className="button ghost" onClick={() => { setAnswers({}); setChecked(false); }}>Reset</button>
        {checked && <strong className="score">Score: {score}/3</strong>}
      </div>
    </section>
  );
}

function StateLab() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState("#172033");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const colors = ["#172033", "#203b35", "#3d2948", "#49352a"];
  const remaining = useMemo(() => tasks.length, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task.trim() }]);
    setTask("");
  }

  return (
    <section className="panel" id="state">
      <div className="section-heading">
        <div><p className="eyebrow">02 / HANDS-ON PRACTICE</p><h2>State & events lab</h2></div>
        <span className="count">7 EXERCISES</span>
      </div>
      <p className="muted">Try each interaction. Every control below uses React state and event handlers.</p>
      <div className="lab-grid">
        <article className="lab-card">
          <span className="lab-index">EXERCISE 01</span><h3>Counter</h3>
          <div className="counter-value">{count}</div>
          <div className="button-row">
            <button className="button ghost" onClick={() => setCount(count - 1)}>− Decrease</button>
            <button className="button primary" onClick={() => setCount(count + 1)}>+ Increase</button>
            <button className="button ghost" onClick={() => setCount(0)}>Reset</button>
          </div>
        </article>

        <article className="lab-card">
          <span className="lab-index">EXERCISE 02</span><h3>Show / hide text</h3>
          <button className="button primary" onClick={() => setVisible(!visible)}>{visible ? "Hide message" : "Show message"}</button>
          {visible && <p className="sample-message">You're learning React one step at a time. Keep going!</p>}
        </article>

        <article className="lab-card">
          <span className="lab-index">EXERCISE 03</span><h3>Like button</h3>
          <button className={`like-button ${liked ? "is-liked" : ""}`} onClick={() => setLiked(!liked)}>{liked ? "♥ Liked" : "♡ Like"}</button>
          <p className="muted small">{liked ? "Thanks for the like!" : "Tap to like this card."}</p>
        </article>

        <article className="lab-card">
          <span className="lab-index">EXERCISE 04</span><h3>Background changer</h3>
          <div className="color-preview" style={{ background: color }}>Preview</div>
          <div className="swatches">
            {colors.map(c => <button aria-label={`Choose ${c}`} key={c} style={{ background: c }} className={`swatch ${color === c ? "active" : ""}`} onClick={() => setColor(c)} />)}
          </div>
        </article>

        <article className="lab-card">
          <span className="lab-index">EXERCISE 05</span><h3>Live character counter</h3>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type something here..." rows="3" />
          <div className="field-meta"><span>Live input</span><strong>{text.length} characters</strong></div>
        </article>

        <article className="lab-card">
          <span className="lab-index">EXERCISE 06</span><h3>Simple login form</h3>
          {loggedIn ? <div className="success-box">Welcome, {loggedIn}! <button className="text-button" onClick={() => setLoggedIn("")}>Log out</button></div> :
            <form className="stack-form" onSubmit={e => { e.preventDefault(); if (username.trim() && password.trim()) setLoggedIn(username.trim()); }}>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
              <button className="button primary" type="submit">Log in</button>
            </form>}
          <p className="muted small">Demo only — no account or password is saved.</p>
        </article>

        <article className="lab-card todo-card">
          <span className="lab-index">EXERCISE 07</span><h3>Todo list <span className="todo-count">{remaining}</span></h3>
          <form className="todo-form" onSubmit={addTask}>
            <input value={task} onChange={e => setTask(e.target.value)} placeholder="Add a task..." />
            <button className="button primary" type="submit">Add</button>
          </form>
          {tasks.length === 0 ? <p className="muted small">Your task list is empty.</p> :
            <ul className="todo-list">{tasks.map(item => <li key={item.id}><span>{item.text}</span><button className="delete-button" onClick={() => setTasks(tasks.filter(t => t.id !== item.id))}>Delete</button></li>)}</ul>}
        </article>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#"><span className="brand-mark">S</span> SAURAV <span className="brand-muted">/ LAB</span></a>
        <div className="nav-links"><a href="#foundations">Foundations</a><a href="#profile">StudentCard</a><a href="#state">State & Events</a></div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot"></span> WEB PROGRAMMING · WEEK 11</p>
          <h1>Learn React.<br /><span>Build by doing.</span></h1>
          <p className="hero-description">Practice JSX and props, then bring your components to life with seven interactive state and event exercises.</p>
          <div className="hero-actions"><a className="button primary" href="#foundations">Start learning <span>↗</span></a><a className="text-link" href="#state">Explore the lab ↓</a></div>
        </div>
        <div className="hero-card">
          <div className="code-top"><span></span><span></span><span></span><small>App.jsx</small></div>
          <pre><code><span className="code-purple">function</span> <span className="code-blue">App</span>() {"{"}<br />{"  "}<span className="code-purple">return</span> (<br />{"    "}&lt;<span className="code-green">h1</span>&gt;Hello, React!&lt;/<span className="code-green">h1</span>&gt;<br />{"  "});<br />{"}"}</code></pre>
          <div className="code-caption"><span className="live-dot"></span> Your React journey starts here</div>
        </div>
        <div className="hero-bottom"><span>01 — JSX & PROPS</span><span>02 — STATE & EVENTS</span><span>SCROLL TO EXPLORE ↓</span></div>
      </header>

      <div className="content">
        <section className="intro-strip">
          <div><p className="eyebrow">THE LEARNING PATH</p><h2>Small concepts.<br />Real interactions.</h2></div>
          <p className="muted intro-text">Work through the foundations first, then experiment with state. Change the code, click the controls, and observe how React updates the page.</p>
          <div className="stat"><strong>07</strong><span>STATE EXERCISES</span></div>
        </section>

        <Foundations />

        <section className="panel profile-panel" id="profile">
          <div className="section-heading">
            <div><p className="eyebrow">03 / COMPONENT PRACTICE</p><h2>StudentCard</h2></div>
            <span className="count">PROPS IN ACTION</span>
          </div>
          <p className="muted">This reusable component receives student information through props.</p>
          <div className="profile-layout">
            <StudentCard {...student} />
            <div className="prop-code"><span className="code-label">USAGE</span><pre><code>&lt;StudentCard<br />{"  "}name="Saurav"<br />{"  "}id="202537255"<br />{"  "}major="Computer Engineering"<br />{"  "}university="Gachon University"<br />/&gt;</code></pre></div>
          </div>
        </section>

        <StateLab />

        <footer className="footer">
          <div><a className="brand" href="#"><span className="brand-mark">S</span> SAURAV <span className="brand-muted">/ LAB</span></a><p className="muted small">Week 11 · React Practice Lab</p></div>
          <p className="footer-credit">Built with React, JSX & curiosity. <span>© 2026</span></p>
        </footer>
      </div>
    </main>
  );
}

export default App;
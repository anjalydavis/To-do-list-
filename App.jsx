import { useState, useEffect, useRef } from "react";
import "./App.css";

const CATEGORIES = ["All", "Work", "Personal", "Health", "Learning"];

const INITIAL_TODOS = [];

// ── Animated CSS Cat ─────────────────────────────────────────────────────────
function Cat({ dark }) {
  const [blinking, setBlinking] = useState(false);
  const [tailWag,  setTailWag]  = useState(false);

  // Random blink
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
      setTimeout(blink, 2400 + Math.random() * 2000);
    };
    const t = setTimeout(blink, 1200);
    return () => clearTimeout(t);
  }, []);

  // Random tail wag burst
  useEffect(() => {
    const wag = () => {
      setTailWag(true);
      setTimeout(() => setTailWag(false), 1200);
      setTimeout(wag, 3500 + Math.random() * 3000);
    };
    const t = setTimeout(wag, 800);
    return () => clearTimeout(t);
  }, []);

  const fur   = dark ? "#c9a96e" : "#f4c87a";
  const dark1 = dark ? "#8b6240" : "#d4956a";
  const nose  = "#f08080";
  const eye   = dark ? "#1a1a2e" : "#2c1810";

  return (
    <div className="cat-wrap">
      <svg
        className={`cat ${tailWag ? "cat--wag" : ""}`}
        viewBox="0 0 120 100"
        width="120" height="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail */}
        <path
          className={`cat-tail ${tailWag ? "cat-tail--wag" : ""}`}
          d="M 30 72 Q 8 68 10 50 Q 12 35 25 40"
          fill="none" stroke={fur} strokeWidth="7" strokeLinecap="round"
        />

        {/* Body */}
        <ellipse cx="60" cy="72" rx="28" ry="22" fill={fur} />
        {/* Belly */}
        <ellipse cx="60" cy="76" rx="16" ry="14" fill="#fde8b0" opacity="0.6" />

        {/* Head */}
        <circle cx="60" cy="42" r="24" fill={fur} />

        {/* Ears */}
        <polygon points="38,24 32,6 50,20" fill={fur} />
        <polygon points="82,24 88,6 70,20" fill={fur} />
        {/* Inner ears */}
        <polygon points="40,22 35,10 49,20" fill={dark1} opacity="0.5" />
        <polygon points="80,22 85,10 71,20" fill={dark1} opacity="0.5" />

        {/* Stripes on head */}
        <path d="M52 22 Q60 18 68 22" fill="none" stroke={dark1} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <path d="M50 17 Q60 13 70 17" fill="none" stroke={dark1} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

        {/* Eyes */}
        {blinking ? (
          <>
            <path d="M49 42 Q53 39 57 42" fill="none" stroke={eye} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M63 42 Q67 39 71 42" fill="none" stroke={eye} strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="53" cy="42" rx="5" ry="5.5" fill={eye} />
            <ellipse cx="67" cy="42" rx="5" ry="5.5" fill={eye} />
            {/* Eye shine */}
            <circle cx="55" cy="40" r="1.5" fill="white" />
            <circle cx="69" cy="40" r="1.5" fill="white" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="60" cy="50" rx="3" ry="2" fill={nose} />

        {/* Mouth */}
        <path d="M57 52 Q60 55 63 52" fill="none" stroke={dark1} strokeWidth="1.5" strokeLinecap="round" />

        {/* Whiskers left */}
        <line x1="38" y1="49" x2="54" y2="51" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <line x1="36" y1="52" x2="54" y2="52" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <line x1="38" y1="55" x2="54" y2="53" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        {/* Whiskers right */}
        <line x1="82" y1="49" x2="66" y2="51" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <line x1="84" y1="52" x2="66" y2="52" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <line x1="82" y1="55" x2="66" y2="53" stroke={dark1} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

        {/* Paws */}
        <ellipse cx="42" cy="90" rx="9" ry="6" fill={fur} />
        <ellipse cx="78" cy="90" rx="9" ry="6" fill={fur} />
        {/* Paw toes */}
        <circle cx="37" cy="91" r="2.5" fill={dark1} opacity="0.25" />
        <circle cx="42" cy="93" r="2.5" fill={dark1} opacity="0.25" />
        <circle cx="47" cy="91" r="2.5" fill={dark1} opacity="0.25" />
        <circle cx="73" cy="91" r="2.5" fill={dark1} opacity="0.25" />
        <circle cx="78" cy="93" r="2.5" fill={dark1} opacity="0.25" />
        <circle cx="83" cy="91" r="2.5" fill={dark1} opacity="0.25" />
      </svg>

      {/* Floating zzz when dark mode (cat is sleepy) */}
      {dark && (
        <div className="cat-zzz">
          <span style={{ animationDelay: "0s" }}>z</span>
          <span style={{ animationDelay: "0.5s" }}>z</span>
          <span style={{ animationDelay: "1s" }}>Z</span>
        </div>
      )}
    </div>
  );
}

// ── Todo Item ────────────────────────────────────────────────────────────────
function TodoItem({ todo, index, onToggle, onDelete }) {
  const [visible,    setVisible]    = useState(false);
  const [removing,   setRemoving]   = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 55);
    return () => clearTimeout(t);
  }, [index]);

  const handleToggle = () => {
    if (!todo.done) {
      setCompleting(true);
      setTimeout(() => { onToggle(todo.id); setCompleting(false); }, 480);
    } else {
      onToggle(todo.id);
    }
  };

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(todo.id), 400);
  };

  const cls = [
    "todo",
    visible    ? "todo--in"       : "",
    completing ? "todo--complete" : "",
    removing   ? "todo--remove"   : "",
    todo.done  ? "todo--done"     : "",
  ].join(" ");

  return (
    <li className={cls}>
      <button
        className={`todo__check ${todo.done ? "todo__check--checked" : ""}`}
        onClick={handleToggle}
        aria-label="Toggle"
      >
        {todo.done && (
          <svg className="todo__tick" viewBox="0 0 12 10" fill="none">
            <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="todo__body">
        <span className="todo__text">{todo.text}</span>
        <span className="todo__tag">{todo.category}</span>
      </div>

      <button className="todo__delete" onClick={handleDelete} aria-label="Delete">
        <svg viewBox="0 0 10 10" fill="none" width="10" height="10">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" />
        </svg>
      </button>
    </li>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("mytasks");
  return saved ? JSON.parse(saved) : INITIAL_TODOS;
});

  const [input,    setInput]    = useState("");
  const [category, setCategory] = useState("Work");
  const [filter,   setFilter]   = useState("All");
  const [focused,  setFocused]  = useState(false);
  const [dark,     setDark]     = useState(false);
        useEffect(() => {
  localStorage.setItem("mytasks", JSON.stringify(todos));
}, [todos]);

  const inputRef = useRef();

  const filtered  = todos.filter(t => filter === "All" || t.category === filter);
  const doneCount = todos.filter(t => t.done).length;
  const progress  = todos.length ? (doneCount / todos.length) * 100 : 0;

  const handleAdd = () => {
    if (!input.trim()) { inputRef.current?.focus(); return; }
    setTodos(prev => [
      { id: Date.now(), text: input.trim(), category, done: false },
      ...prev,
    ]);
    setInput("");
  };

  const toggle    = id => setTodos(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove    = id => setTodos(p => p.filter(t => t.id !== id));
  const clearDone = ()  => setTodos(p => p.filter(t => !t.done));

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className={`app ${dark ? "app--dark" : ""}`}>

      {/* ── Gradient blobs ── */}
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />

      <div className="app__inner">

        {/* ── Cat ── */}
        <div className="cat-section">
          <Cat dark={dark} />
          <p className="cat-name">{dark ? "Napping…" : "Let's get things done!"}</p>
        </div>

        {/* ── Header ── */}
        <header className="header">
          <div className="header__meta">
            <p className="header__date">{today}</p>
            <h1 className="header__title">To-do-list</h1>
          </div>

          <div className="header__actions">
            {/* Dark mode toggle */}
            <button
              className={`dark-toggle ${dark ? "dark-toggle--on" : ""}`}
              onClick={() => setDark(d => !d)}
              aria-label="Toggle dark mode"
            >
              <span className="dark-toggle__track">
                <span className="dark-toggle__thumb">
                  {dark ? "🌙" : "☀️"}
                </span>
              </span>
            </button>

            {/* Ring progress */}
            <div className="header__stat">
              <svg className="header__ring" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none"
                  stroke="currentColor" strokeWidth="2.5" className="ring-track" />
                <circle cx="18" cy="18" r="15" fill="none"
                  stroke="#0071e3" strokeWidth="2.5"
                  strokeDasharray={`${progress * 0.942} 94.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                  style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                />
              </svg>
              <span className="header__stat-label">{doneCount}/{todos.length}</span>
            </div>
          </div>
        </header>

        {/* ── Input ── */}
        <div className={`input-wrap ${focused ? "input-wrap--focused" : ""}`}>
          <svg className="input-icon" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Add a task"
          />
          <select
            className="input-category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.filter(c => c !== "All").map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="input-add" onClick={handleAdd}>
            <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter ${filter === cat ? "filter--active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── List ── */}
        <ul className="list">
          {filtered.length === 0 && (
            <li className="empty">
              <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" opacity="0.3" />
              </svg>
              <span>No tasks here</span>
            </li>
          )}
          {filtered.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={i}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </ul>

        {/* ── Footer ── */}
        {doneCount > 0 && (
          <footer className="foot">
            <span className="foot__label">{doneCount} completed</span>
            <button className="foot__clear" onClick={clearDone}>Clear</button>
          </footer>
        )}
      </div>
    </div>
  );
}
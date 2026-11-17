// The Colorado blue columbine, drawn flat. Five long blue sepals, five white
// petals between them, a yellow middle. It is the flower in the logo.
const turns = [0, 72, 144, 216, 288];

export function Columbine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`columbine ${className}`.trim()}
      viewBox="-50 -50 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {turns.map((t) => (
        <path
          key={`s${t}`}
          className="sepal"
          transform={`rotate(${t})`}
          d="M0 -5 C 12 -16 10 -34 0 -49 C -10 -34 -12 -16 0 -5 Z"
        />
      ))}
      {turns.map((t) => (
        <path
          key={`p${t}`}
          className="petal"
          transform={`rotate(${t + 36})`}
          d="M0 -3 C 9 -7 12 -22 0 -28 C -12 -22 -9 -7 0 -3 Z"
        />
      ))}
      <circle className="eye" r="6.5" />
    </svg>
  );
}

/**
 * Hover roll: the label slides up out of a mask while a copy rolls in
 * from below. Put `roll-host` on the hoverable ancestor.
 */
export default function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll__line">{children}</span>
      <span className="roll__line roll__line--alt" aria-hidden="true">{children}</span>
    </span>
  );
}

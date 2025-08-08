export default function Footer() {
  return (
    <footer className="container">
      <p>
        Boost focus with our <strong>productivity calendar tool</strong> and export schedules using a
        <strong> time management .ics converter</strong>.
      </p>
      <p className="muted">© {new Date().getFullYear()} Timeblocker</p>
    </footer>
  );
}

